import { Link } from "react-router";
import type { Product } from "../api/products";
import { useShoppingContext } from "../hooks/useAppContext";

interface Props {
  item: Product;
}

const Card = ({ item }: Props) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart, cartItems } =
    useShoppingContext();

  const quantity = cartItems.find((i) => i.id === item.id)?.quantity || 0;

  return (
    <div className="flex flex-col justify-evenly items-center bg-white rounded-xl shadow-md p-3">
      {/* 图片/标题/价格可点击进详情页；加购按钮独立在外面，
          避免把 <button> 嵌进 <Link> 渲染出的 <a> 里（无效 HTML，点击行为也会冲突） */}
      <Link to={`/products/${item.id}`} className="flex flex-col items-center w-full">
        <img
          className="h-40 object-contain"
          src={item.images[0]}
          alt={item.title}
        />
        <div className="flex justify-between items-center w-full px-3">
          <span className="text-xl hover:underline">{item.title}</span>
          <span className="text-gray-400">${item.price}</span>
        </div>
      </Link>

      {quantity === 0 ? (
        <button
          className="bg-blue-500 p-3 text-white rounded-xl cursor-pointer hover:bg-blue-400 transition-all duration-100 w-[90%]"
          onClick={() => increaseQuantity(item.id)}
        >
          + Add to Cart
        </button>
      ) : (
        <div className="flex flex-col gap-2.5 justify-center items-center">
          <div className="flex justify-center items-baseline gap-1.5">
            <button
              className="bg-blue-500 p-2 w-8 text-white rounded-xl cursor-pointer hover:bg-blue-400 transition-all duration-100 "
              onClick={() => decreaseQuantity(item.id)}
            >
              -
            </button>
            <span className="text-xl">{quantity}</span>
            <span className="text-gray-500">in cart</span>
            <button
              className="bg-blue-500 p-2 w-8 text-white rounded-xl cursor-pointer hover:bg-blue-400 transition-all duration-100 "
              onClick={() => increaseQuantity(item.id)}
            >
              +
            </button>
          </div>

          <button
            className="bg-red-600 text-white rounded-xl hover:bg-red-500 transition-all duration-100 py-2 w-[80%]"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
