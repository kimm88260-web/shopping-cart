import { createContext, useState } from "react";
import type { ReactNode } from "react";

// 原来这个 context 叫 UserContext，但实际存的是"商品搜索关键词"，
// 跟"用户"没有任何关系，容易让读代码的人（包括面试官）困惑，改名为 SearchContext。
//
// 另外原来的 handleFetchData 手写 fetch 逻辑被删掉了：
// 搜索现在只负责"记录用户输入了什么"，真正的请求交给 useProducts()（React Query）去做，
// 职责更单一：Context 管状态，Query 管数据获取。

export interface SearchContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | null>(null);

type Props = {
  children: ReactNode;
};

const SearchProvider = ({ children }: Props) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
