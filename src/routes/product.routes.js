import { Router } from "express";

const router = Router();

import ProductController from "../controllers/product.controller.js";

//Get All Records
router.get("/products", ProductController.index);

// Creating a new Record
router.post("/products", ProductController.store);

//Get an Specific Record
router.get("/products/:id", ProductController.show);

//Update a Record
router.patch("/products/:id", ProductController.update);

//Delete a Record
router.delete("/products/:id", ProductController.destroy);

export default router;
