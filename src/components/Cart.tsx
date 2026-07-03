import { useShoppingContext } from "../hooks/useAppContext";
import { useCartProductDetails } from "../hooks/useCartProductDetails";
import CartItems from "./CartItem";

const Cart = () => {
  const { closeCart, isOpen, cartItems } = useShoppingContext();
  const { products, isLoading } = useCartProductDetails(cartItems);

  const totalPrice = cartItems.reduce((sum, cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    if (!product) return sum;
    return sum + product.price * cartItem.quantity;
  }, 0);

  return (
    <>
      {/* 遮罩 */}
      <div
        onClick={() => closeCart()}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />

      {/* 侧边抽屉 */}
      <div
        className={`fixed top-0 right-0 h-full w-90 bg-gray-100 shadow-lg 
        transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        p-5 flex flex-col`}
      >
        <div className="text-2xl font-semibold mb-7">Cart</div>

        <div className="flex flex-col gap-5 flex-1 overflow-y-auto">
          {cartItems.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              Your cart is empty.
            </p>
          )}

          {isLoading &&
            cartItems.length > 0 &&
            products.length === 0 && (
              <p className="text-gray-400 text-center mt-10">Loading...</p>
            )}

          {cartItems.map((item) => {
            const sItem = products.find((i) => i.id === item.id);
            if (!sItem) return null; // 还没加载出来就先不渲染这一条，避免渲染 undefined 字段
            return <CartItems item={item} key={item.id} sItem={sItem} />;
          })}
        </div>

        <div className="text-[1.2rem] font-semibold text-gray-800 mt-7 tracking-wide text-right">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default Cart;
