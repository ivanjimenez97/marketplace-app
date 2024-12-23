import { Router } from "express";

import {
  getRoles,
  createRole,
  getRole,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";

const router = Router();

//Get All Records
router.get("/roles", getRoles);

// Creating a new Record
router.post("/roles", createRole);

//Get an Specific Record
router.get("/roles/:id", getRole);

//Update a Record
router.patch("/roles/:id", updateRole);

//Delete a Record
router.delete("/roles/:id", deleteRole);

export default router;
