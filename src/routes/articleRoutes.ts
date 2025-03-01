import express from "express";
import { getArticles, createArticle, updateArticle, deleteArticle } from "../controllers/articleController";

const router = express.Router();

router.get("/", getArticles);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
