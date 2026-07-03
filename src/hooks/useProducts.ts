import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

interface Params {
  search?: string;
  category?: string;
}

/**
 * search / category 任一变化时 queryKey 跟着变化，React Query 自动重新请求；
 * 相同参数再次挂载组件时会先用缓存展示，不会重复发请求（60s 内）。
 */
export function useProducts({ search = "", category = "" }: Params) {
  return useQuery({
    queryKey: ["products", search, category],
    queryFn: () => fetchProducts({ search, category }),
    staleTime: 1000 * 60, // 1 分钟内认为数据仍新鲜，不重新请求
  });
}
