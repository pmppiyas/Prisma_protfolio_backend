export interface QueryParams {
  page: number;
  limit: number;
  search?: string;
  author?: string;
  isFeatured?: boolean;
  tags?: string[];
  sortBy?: string;
  sortOrder?: string;
}
