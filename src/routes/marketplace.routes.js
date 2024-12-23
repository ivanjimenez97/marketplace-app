import { Router } from "express";

const router = Router();

import MarketplaceController from "../controllers/marketplace.controller.js";

//Get All Records
router.get("/marketplace", MarketplaceController.index);

export default router;
