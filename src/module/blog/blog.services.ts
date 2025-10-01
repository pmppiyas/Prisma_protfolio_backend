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
  const result = await prisma.$transaction(async (tx) => {
    const blog = await tx.blogs.findUnique({
      where: { id },
    });

    await tx.blogs.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return blog;
  });
  return result;
};

const updateBlog = async (id: number, payload: Prisma.BlogsUpdateInput) => {
  const result = await prisma.$transaction(async (tx) => {
    const update = tx.blogs.update({
      where: {
        id,
      },
      data: payload,
    });
    return update;
  });
  return result;
};

const deletePost = async (id: number) => {
  await prisma.blogs.delete({
    where: {
      id,
    },
  });
  return null;
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getByBlogId,
  updateBlog,
  deletePost,
};
