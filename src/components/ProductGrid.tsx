import type { Product } from "../api/products";
import Card from "./Card";

interface Props {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  search: string;
}

const ProductGrid = ({ products, isLoading, isError, search }: Props) => {
  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-xl bg-white/60 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-gray-500">
        商品加载失败，请稍后重试。
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        {search
          ? `没有找到匹配 "${search}" 的商品，换个关键词试试？`
          : "暂时没有商品。"}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
};

export default ProductGrid;
