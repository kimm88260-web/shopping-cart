import { useQueries } from "@tanstack/react-query";
import { fetchProductById, type Product } from "../api/products";
import type { CartItem } from "../context/ShoppingCartContext";

/**
 * 原来的写法：cartItems 任何变化（哪怕只加了一件新商品）都会把购物车里
 * 全部商品重新 fetch 一遍——这是不必要的重复请求。
 *
 * 这里改用 useQueries：每个商品 id 是独立的一条 query，queryKey 是 ["product", id]。
 * React Query 会自动跳过已经缓存过的 id，只请求真正新增的那个商品。
 * 购物车翻页、移除商品等场景下网络请求量明显更少。
 */
export function useCartProductDetails(cartItems: CartItem[]) {
  const results = useQueries({
    queries: cartItems.map((item) => ({
      queryKey: ["product", item.id],
      queryFn: () => fetchProductById(item.id),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const products: Product[] = results
    .map((r) => r.data)
    .filter((p): p is Product => Boolean(p));

  const isLoading = results.some((r) => r.isLoading);

  return { products, isLoading };
}
