import { Router } from "express";
import { BlogRoutes } from "../module/blog/blog.routes.js";
const router = Router();

const moduleRoutes = [
  {
    path: "/blog",
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
