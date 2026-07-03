import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/products";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10, // 分类列表基本不变，缓存久一点没问题
  });
}
