import express from "express";
import {
  getIncomingLinks,
  getOutgoingLinks,
  getTopLinkedPages,
} from "../controllers/linkController.js";

const router = express.Router();

router.post("/incoming-links", getIncomingLinks);
router.post("/outgoing-links", getOutgoingLinks);
router.post("/top-linked-pages", getTopLinkedPages);

export default router;
