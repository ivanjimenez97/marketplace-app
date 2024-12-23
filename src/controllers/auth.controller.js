import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const newAccount = req.body;

    // Log to see the request body and newAccount
    console.log("Request body:", req.body);
    console.log("newAccount:", newAccount);
    
    const { email, password } = newAccount;

    const recordExists = await User.findOne({ where: { email: email } });

    if (recordExists) {
      return res.status(409).json({ message: "This Account already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    //Update the newAccount object with the hashed password
    const updatedAccount = { ...newAccount, password: passwordHash };

    // Create the new account with the updated password
    const record = await User.create(updatedAccount);

    res.status(201).json({
      data: record,
      message: "Record created successfully.",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "An error occurred while trying to create the record.",
      error: error.message || error.toString(), // Provide detailed error message
      stack: error.stack, // Include the stack trace for debugging
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ where: { email: email } });

    if (!userFound) {
      return res.status(404).json({ message: "User not Found." });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials." });
    }

    const token = await createAccessToken({ id: userFound.id });

    res.cookie("token", token);

    res.json({
      user: userFound,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const { id } = req.user.id;
    const userFound = await User.findByPk(id);

    if (!userFound) {
      return res.status(404).json({ message: "User not Found." });
    }

    //res.send(req.user);
    res.json({
      user: userFound,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.query.token;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const { id } = user.id;

    const userFound = await User.findByPk(id);

    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound.id,
      email: userFound.email,
      user: userFound,
    });
  });
};
