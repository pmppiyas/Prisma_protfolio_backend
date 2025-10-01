import { Prisma } from "@prisma/client";
import { validSortFields } from "../constant/index.js";

export const queryBuilder = ({
  search,
  isFeatured,
  author,
  tags,
  sortBy,
  sortOrder,
}: {
  search?: string;
  isFeatured?: boolean;
  author?: string;
  tags?: string[];
  sortBy?: string;
  sortOrder?: string;
}) => {
  const filters: Prisma.BlogsWhereInput[] = [];

  if (search) {
    filters.push({
      OR: [
        { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { content: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ],
    });
  }

  if (typeof isFeatured === "boolean") {
    filters.push({ isFeatured });
  }

  if (author) {
    filters.push({
      author: { contains: author, mode: Prisma.QueryMode.insensitive },
    });
  }

  if (tags && tags.length > 0) {
    filters.push({ tags: { hasSome: tags } });
  }

  const where: Prisma.BlogsWhereInput =
    filters.length > 0 ? { AND: filters } : {};

  const sortField = validSortFields.includes(sortBy || "")
    ? sortBy ?? "createdAt"
    : "createdAt";
  const sortDirection: Prisma.SortOrder = sortOrder === "desc" ? "desc" : "asc";

  const orderBy: Prisma.BlogsOrderByWithRelationInput = {
    [sortField]: sortDirection,
  };

  return { where, orderBy };
};
