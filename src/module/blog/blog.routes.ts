import { Router } from "express";
import { BlogController } from "./blog.controller.js";
const router = Router();

router.post("/create", BlogController.createPost);

export const BlogRoutes = router;
