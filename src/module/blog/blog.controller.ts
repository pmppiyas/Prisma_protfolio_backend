import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync.js";
import sendResponse from "../../utils/sendResponse.js";
import { BlogServices } from "./blog.services.js";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const create = await BlogServices.createBlog(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Post create successfully",
      data: create,
    });
  }
);

const getAllBlogs = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blogs = await BlogServices.getAllBlogs();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All blogs retrieved successfully",
      data: blogs,
    });
  }
);

const getByBlogId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blog = await BlogServices.getByBlogId(Number(req.params.id));

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "This blog retrieved successfully",
      data: blog,
    });
  }
);

const updateBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const update = await BlogServices.updateBlog(
      Number(req.params.id),
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "This blog updated successfully",
      data: update,
    });
  }
);

export const BlogController = {
  createPost,
  getAllBlogs,
  getByBlogId,
  updateBlog,
};
