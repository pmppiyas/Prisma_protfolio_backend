import { Router } from "express";
import { BlogController } from "./blog.controller.js";
const router = Router();

router.post("/create", BlogController.createPost);
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getByBlogId);
router.patch("/update/:id", BlogController.updateBlog);

export const BlogRoutes = router;
