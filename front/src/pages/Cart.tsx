import { Button } from "../components/ui/button";

export default function Cart() {
  // Placeholder cart items
  const items = [
    {
      id: 1,
      name: "Sample Product",
      image: "https://images.unsplash.com/photo-1513708927688-890fe1a2e18b?auto=format&fit=crop&w=400&q=80",
      price: 99.99,
      qty: 1
    }
  ];
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 sm:py-12 px-2 sm:px-0">
      <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart" className="w-16 h-16 mb-4" />
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Your Cart</h1>
      <div className="w-full max-w-xs sm:max-w-xl bg-white rounded-xl shadow p-4 sm:p-6 mb-6 sm:mb-8">
        {items.length === 0 ? (
          <div className="text-center text-gray-400">Your cart is empty.</div>
        ) : (
          <ul className="divide-y">
            {items.map(item => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-500">Qty: {item.qty}</div>
                </div>
                <div className="font-bold text-blue-700">${item.price}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button size="lg" className="px-8 py-3 text-lg">Checkout</Button>
    </div>
  );
}
