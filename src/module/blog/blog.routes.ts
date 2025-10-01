import { Router } from "express";
import { BlogController } from "./blog.controller.js";
const router = Router();

router.post("/create", BlogController.createPost);
router.get("/", BlogController.getAllBlogs);

export const BlogRoutes = router;
