import { Link } from "react-router";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";

// Home 是落地页：介绍项目 + 展示几件精选商品作为"橱窗"，
// 不响应搜索——搜索和完整目录浏览都发生在 Store 页。
const FEATURED_COUNT = 4;

const Home = () => {
  const { data: products = [], isLoading, isError } = useProducts({});
  const featured = products.slice(0, FEATURED_COUNT);

  return (
    <div className="p-6">
      <div className="max-w-2xl mb-10">
        <div className="text-4xl tracking-wide font-semibold text-blue-400 mb-3">
          Welcome to the Store
        </div>
        <p className="text-gray-600 leading-relaxed mb-5">
          A small shopping cart demo — browse products, add them to your
          cart, and check out the total in the drawer on the right.
        </p>
        <Link
          to="/store"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-400 transition-all duration-100"
        >
          Browse the store →
        </Link>
      </div>

      <div className="text-xl font-semibold text-gray-700 mb-3">
        Featured products
      </div>
      <ProductGrid
        products={featured}
        isLoading={isLoading}
        isError={isError}
        search=""
      />
    </div>
  );
};

export default Home;
