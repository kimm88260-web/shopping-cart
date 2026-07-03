import { useState } from "react";
import { useSearchContext } from "../hooks/useAppContext";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import ProductGrid from "../components/ProductGrid";

// Store 是真正的商品浏览页：响应 Navbar 的搜索，也支持按分类筛选。
// 分类状态是 Store 页内部的，没有必要放进全局 Context——只有这一个页面用得到。
const Store = () => {
  const { search } = useSearchContext();
  const { data: categories = [] } = useCategories();
  const [category, setCategory] = useState("all");

  // 有搜索词时，dummyjson 不支持"搜索+分类"组合查询，
  // 所以搜索优先：有搜索词就忽略分类筛选，并且提示用户。
  const { data: products = [], isLoading, isError } = useProducts({
    search,
    category,
  });

  const isSearchOverridingCategory = Boolean(search) && category !== "all";

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="text-3xl tracking-wide font-semibold text-blue-400">
          {search ? `Search results for "${search}"` : "Full Catalog"}
        </div>

        <select
          className="border border-gray-300 rounded-xl p-2 bg-white text-gray-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {isSearchOverridingCategory && (
        <p className="text-sm text-gray-400 mb-4">
          Showing search results — clear the search box to filter by category
          instead.
        </p>
      )}

      <ProductGrid
        products={products}
        isLoading={isLoading}
        isError={isError}
        search={search}
      />
    </div>
  );
};

export default Store;
