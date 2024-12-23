import { Router } from "express";

const router = Router();

import UserController from "../controllers/user.controller.js";

//Get All Records
router.get("/users", UserController.index);

// Creating a new Record
router.post("/users", UserController.store);

//Get an Specific Record
router.get("/users/:id", UserController.show);

//Update a Record
router.patch("/users/:id", UserController.update);

//Delete a Record
router.delete("/users/:id", UserController.destroy);

export default router;
