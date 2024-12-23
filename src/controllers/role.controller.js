import { Role } from "../models/role.model.js";

//Module Pattern
export const getRoles = async (req, res) => {
  try {
    const records = await Role.findAll();
    res.json(records);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An Error occured when trying to get the data." });
  }
};

// Factory Pattern
export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    
    const record = await Role.create({
      name: name
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
};

//Module Pattern
export const getRole = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(`SELECT * FROM roles WHERE id = ${id};`);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Record not Found." });
    }

    res.json({
      data: rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "An Error occurred when trying to get the record.",
    });
  }
};

//Module Pattern
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;

    const { name } = req.body;

    const [result] = await pool.query(
      `UPDATE roles SET name = IFNULL(?, name) WHERE id = ?;`,
      [name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not Found." });
    }

    const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [id]);

    res.json({
      data: rows[0],
      message: "Record updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An Error occurred when trying to update the record.",
    });
  }
};

//Module Pattern
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(`DELETE FROM roles WHERE id = ${id};`);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Record not Found." });
    }

    res.json({
      message: "Record deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred when trying to delete the record.",
      error: error,
    });
  }
};
