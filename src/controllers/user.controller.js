import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { Op } from "sequelize";
import { Role } from "../models/role.model.js";

const UserController = {
  index: async (req, res) => {
    console.log(req.query.search);
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const searchKeyword = req.query.search || "";
    try {
      const whereClause = searchKeyword
        ? {
            [Op.or]: [
              {
                firstName: {
                  [Op.like]: `%${searchKeyword}%`,
                },
              },
              {
                lastName: {
                  [Op.like]: `%${searchKeyword}%`,
                },
              },
              {
                email: {
                  [Op.like]: `%${searchKeyword}%`,
                },
              },
            ],
          }
        : {};

      const totalRecords = await User.count({ where: whereClause });

      const users = await User.findAll({
        where: whereClause,
        offset: (page - 1) * limit,
        limit: limit,
      });

      // Generate pagination links
      const totalPages = Math.ceil(totalRecords / limit);

      const generatePageLink = (pageNum) => {
        return pageNum <= 0 || pageNum > totalPages
          ? null
          : `/users?page=${pageNum}&limit=${limit}`;
      };

      const links = [
        {
          label: "&laquo; Previous",
          url: generatePageLink(page - 1),
        },
        ...Array.from({ length: totalPages }, (_, i) => ({
          label: (i + 1).toString(),
          url: generatePageLink(i + 1),
          active: i + 1 === page,
        })),
        { label: "Next &raquo;", url: generatePageLink(page + 1) },
      ];

      res.json({
        records: users,
        meta: {
          total: totalRecords,
          current_page: page,
          last_page: Math.ceil(totalRecords / limit),
          per_page: limit,
          from: (page - 1) * limit + 1,
          to: Math.min(page * limit, totalRecords),
          links,
        },
        status: 201,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An Error occured when trying to get the data.",
        error: error,
      });
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;

      const record = await User.findByPk(id);

      if (!record) {
        return res.status(404).json({ message: "Record not Found." });
      }

      const roles = await Role.findAll();

      res.json({
        record: record,
        roles: roles,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An Error occurred when trying to get the record.",
        error: error,
      });
    }
  },

  store: async (req, res) => {
    // Logic to create a new User
    try {
      const { firstName, lastName, email, password, phone, roleId } = req.body;

      const passwordHash = await bcrypt.hash(password, 10);

      const record = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: passwordHash,
        phone: phone,
        roleId: roleId,
      });

      res.status(201).json({
        data: record,
        message: "Record created successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "An Error occured when trying to create the record.",
        error: error,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;

      const { firstName, lastName, email, password, phone, roleId } = req.body;

      const passwordHash = await bcrypt.hash(password, 10);

      const record = await User.findByPk(id);
      if (!record) {
        return res.status(404).json({ message: "Record not Found." });
      }

      if (!password) {
        await record.update({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          roleId: roleId,
        });
      } else {
        await record.update({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: passwordHash,
          phone: phone,
          roleId: roleId,
        });
      }

      res.json({
        record: record,
        message: "Record updated successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "An Error occurred when trying to update the record.",
        error: error,
      });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const record = await User.findByPk(id);

      if (!record) {
        return res.status(404).json({ message: "Record not Found." });
      }

      await record.destroy();

      res.json({
        message: "Record deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred when trying to delete the record.",
        error: error,
      });
    }
  },
};

export default UserController;
