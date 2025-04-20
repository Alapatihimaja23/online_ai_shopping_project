import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart } = useCart();
  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 sm:py-12 px-2 sm:px-0">
      <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" className="w-16 h-16 mb-4" />
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Your Cart</h1>
      <div className="w-full max-w-xs sm:max-w-xl bg-white rounded-xl shadow p-4 sm:p-6 mb-6 sm:mb-8">
        {items.length === 0 ? (
          <div className="text-center text-gray-400">Your cart is empty.</div>
        ) : (
          <>
            <ul className="divide-y">
              {items.map(item => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-gray-500">Qty: {item.qty}</div>
                  </div>
                  <div className="font-bold text-blue-700 text-center min-w-[70px]">
                    <span className="inline-block align-middle text-lg">₹</span>{item.price.toLocaleString("en-IN")}
                    <div className="text-xs text-gray-400">Subtotal: ₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col items-center">
              <div className="font-bold text-xl text-blue-800 mb-2">Total: <span className="align-middle text-2xl">₹</span>{total.toLocaleString("en-IN")}</div>
              <Button onClick={() => alert('payment gateway integration is in progress. We\'ll keep in touch!')}size="lg" className="px-8 py-3 text-lg w-full">Checkout</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
