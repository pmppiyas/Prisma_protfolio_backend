import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db.js";

const createBlog = async (blogData: Prisma.BlogsCreateInput) => {
  const newBlog = await prisma.blogs.create({
    data: blogData,
  });

  return newBlog;
};

export const BlogServices = {
  createBlog,
};
