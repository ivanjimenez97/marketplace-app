import { Op } from "sequelize";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

const MarketplaceController = {
  index: async (req, res) => {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const searchKeyword = req.query.search || "";
    const minPrice = parseFloat(req.query.minPrice) || 0;
    const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_VALUE;

    try {
      // Base where clause
      const whereClause = {
        ...(searchKeyword && {
          [Op.or]: [
            { name: { [Op.like]: `%${searchKeyword}%` } },
            { sku: { [Op.like]: `%${searchKeyword}%` } },
          ],
        }),
        price: { [Op.between]: [minPrice, maxPrice] },
      };

      // Fetch total records and paginated products
      const totalRecords = await Product.count({ where: whereClause });
      const products = await Product.findAll({
        where: whereClause,
        include: {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName"], // Include the user details
        },
        offset: (page - 1) * limit,
        limit: limit,
        order: [["name", "ASC"]], // Sort by name
      });

      // Generate pagination links
      const totalPages = Math.ceil(totalRecords / limit);

      const generatePageLink = (pageNum) =>
        pageNum <= 0 || pageNum > totalPages
          ? null
          : `/marketplace?page=${pageNum}&limit=${limit}`;

      const links = [
        { label: "&laquo; Previous", url: generatePageLink(page - 1) },
        ...Array.from({ length: totalPages }, (_, i) => ({
          label: (i + 1).toString(),
          url: generatePageLink(i + 1),
          active: i + 1 === page,
        })),
        { label: "Next &raquo;", url: generatePageLink(page + 1) },
      ];

      res.status(200).json({
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
      res.status(500).json({ message: "Failed to fetch products.", error });
    }
  },
};

export default MarketplaceController;
