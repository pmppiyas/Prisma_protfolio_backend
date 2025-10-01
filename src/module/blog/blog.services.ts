import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db.js";

const createBlog = async (blogData: Prisma.BlogsCreateInput) => {
  const newBlog = await prisma.blogs.create({
    data: blogData,
  });

  return newBlog;
};

const getAllBlogs = async () => {
  const blogs = await prisma.blogs.findMany();
  return blogs;
};

const getByBlogId = async (id: number) => {
  const blog = await prisma.blogs.findUnique({
    where: {
      id,
    },
  });
  return blog;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getByBlogId,
};
