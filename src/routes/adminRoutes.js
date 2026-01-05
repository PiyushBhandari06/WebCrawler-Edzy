import express from "express";
import { deleteCrawledData } from "../controllers/adminController.js";
// basically just delete route is here, still i named it adminRoutes.js for future admin related routes.

const router = express.Router();

router.post("/delete", deleteCrawledData);

export default router;
