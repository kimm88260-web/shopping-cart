import { useContext } from "react";
import { SearchContext, type SearchContextType } from "../context/SearchContext";
import {
  ShoppingCartContext,
  type SContextType,
} from "../context/ShoppingCartContext";

export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export const useShoppingContext = (): SContextType => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingContext must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

// 注意：原来的 useCartContext（对应 CartProducts context）已经删除。
// 购物车里商品的详情数据现在通过 useCartProductDetails()（React Query）获取，
// 不再需要一个额外的 Context 来存"购物车商品详情"这份可以被缓存管理的服务端数据。
// 用 Context 存服务端数据是这个项目原来的一个设计问题：
// Context 适合客户端状态（搜索词、购物车 id+数量），不适合需要缓存/重新验证的服务端数据。
