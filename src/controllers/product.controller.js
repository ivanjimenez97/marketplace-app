import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Op } from "sequelize";

const ProductController = {
  index: async (req, res) => {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const searchKeyword = req.query.search || "";

    const { userId, roleId } = req.query;

    // Base whereClause for search functionality
    let whereClause = {};

    if (searchKeyword) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { name: { [Op.like]: `%${searchKeyword}%` } },
          { sku: { [Op.like]: `%${searchKeyword}%` } },
        ],
      };
    }

    try {
      let products;
      let totalRecords;

      if (parseInt(roleId) === 2) {
        // Seller role: Filter products by the user's ID
        whereClause = { ...whereClause, userId: parseInt(userId) };

        totalRecords = await Product.count({ where: whereClause });

        products = await Product.findAll({
          where: whereClause,
          offset: (page - 1) * limit,
          limit: limit,
          order: [
            ["id", "ASC"],
          ],
        });
      } else if (parseInt(roleId) === 1) {
        // Admin role: Include seller information
        totalRecords = await Product.count({ where: whereClause });

        products = await Product.findAll({
          where: whereClause,
          include: {
            model: User,
            as: "user",
            attributes: ["id", "firstName", "lastName"],
          },
          offset: (page - 1) * limit,
          limit: limit,order: [
            ["id", "ASC"],
          ],
        });
      } else {
        return res.status(403).json({
          message: "You are not authorized to access this resource.",
        });
      }

      // Generate pagination links
      const totalPages = Math.ceil(totalRecords / limit);

      const generatePageLink = (pageNum) =>
        pageNum <= 0 || pageNum > totalPages
          ? null
          : `/products?page=${pageNum}&limit=${limit}`;

      const links = [
        { label: "&laquo; Previous", url: generatePageLink(page - 1) },
        ...Array.from({ length: totalPages }, (_, i) => ({
          label: (i + 1).toString(),
          url: generatePageLink(i + 1),
          active: i + 1 === page,
        })),
        { label: "Next &raquo;", url: generatePageLink(page + 1) },
      ];

      res.json({
        records: products,
        meta: {
          total: totalRecords,
          current_page: page,
          last_page: totalPages,
          per_page: limit,
          from: (page - 1) * limit + 1,
          to: Math.min(page * limit, totalRecords),
          links,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch products.", error });
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
        include: {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      res.json({ record: product });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to fetch product.", error });
    }
  },

  store: async (req, res) => {
    try {
      const { name, sku, quantity, price, userId } = req.body;

      const product = await Product.create({
        name,
        sku,
        quantity,
        price,
        userId,
      });

      res.status(201).json({
        data: product,
        message: "Product created successfully.",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create product.", error });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, sku, quantity, price, roleId } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      await product.update({
        name,
        sku,
        quantity,
        price,
        roleId,
      });

      res.status(200).json({
        record: product,
        message: "Product updated successfully.",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to update product.", error });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      await product.destroy();

      res.json({ message: "Product deleted successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete product.", error });
    }
  },
};

export default ProductController;
