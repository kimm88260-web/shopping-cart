import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/products";
import { useShoppingContext } from "../hooks/useAppContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  // queryKey 故意跟 useCartProductDetails 里用的 ["product", id] 一致：
  // 如果这个商品之前已经在购物车抽屉里被查询过，这里会直接命中缓存，不用重新请求。
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id as string),
    enabled: Boolean(id),
  });

  const { cartItems, increaseQuantity, decreaseQuantity } =
    useShoppingContext();
  const quantity = product
    ? cartItems.find((i) => i.id === product.id)?.quantity ?? 0
    : 0;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="h-80 max-w-3xl rounded-xl bg-white/60 animate-pulse" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="p-6">
        <p className="text-gray-500 mb-4">
          Couldn't load this product. It may not exist.
        </p>
        <Link to="/store" className="text-blue-500 underline">
          ← Back to store
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl ">
      <Link to="/store" className="text-blue-500 underline text-sm ">
        ← Back to store
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mt-4 bg-white rounded-xl shadow-md p-6">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full md:w-72 h-72 object-contain"
        />

        <div className="flex-1">
          <div className="text-sm text-gray-400 uppercase tracking-wide mb-1">
            {product.category}
          </div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <div className="text-xl text-gray-700 mb-4">${product.price}</div>
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {quantity === 0 ? (
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-400 transition-all duration-100"
              onClick={() => increaseQuantity(product.id)}
            >
              + Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                className="bg-blue-500 p-2 w-9 h-9 text-white rounded-xl hover:bg-blue-400 transition-all duration-100"
                onClick={() => decreaseQuantity(product.id)}
              >
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <span className="text-gray-500">in cart</span>
              <button
                className="bg-blue-500 p-2 w-9 h-9 text-white rounded-xl hover:bg-blue-400 transition-all duration-100"
                onClick={() => increaseQuantity(product.id)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
