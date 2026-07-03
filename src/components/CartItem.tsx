import type { CartItem } from "../context/ShoppingCartContext";
import type { Product } from "../api/products";
import { useShoppingContext } from "../hooks/useAppContext";

interface Props {
  item: CartItem;
  sItem: Product;
}

const CartItems = ({ item, sItem }: Props) => {
  const { removeFromCart } = useShoppingContext();

  return (
    <div className="bg-white rounded-xl shadow-sm flex justify-between items-center p-3">
      <div className="flex items-center">
        <img className="w-[30%]" src={sItem.images[0]} alt={sItem.title} />
        <div className="text-gray-400 text-[0.8rem] tracking-wide">
          <div>
            <span>{sItem.title}</span>
            {item.quantity > 1 && (
              <span className="text-[0.7rem]"> x{item.quantity}</span>
            )}
          </div>
          <div>${sItem.price}</div>
        </div>
      </div>

      <div className="text-[0.9rem] text-gray-600 flex items-center gap-1.5">
        <div>${(sItem.price * item.quantity).toFixed(2)}</div>
        <button
          className="border border-gray-400 text-gray-500 rounded-[3px] px-2 py-1 cursor-pointer hover:text-gray-400 transition-all duration-100"
          onClick={() => removeFromCart(item.id)}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default CartItems;
