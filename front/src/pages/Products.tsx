import React from "react";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";

// Product type (should match backend schema)
type Product = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number | string;
  category: string;
  stock_quantity: number;
};

type ProductsProps = {
  search: string;
  setSearch: (s: string) => void;
};

export default function Products({ search, setSearch }: ProductsProps) {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { cart, addToCart, removeFromCart } = useCart();

  React.useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then(async res => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to load products');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  // Filter products by search
  const filteredProducts = products.filter(product => {
    const q = search.toLowerCase();
    return (
      product.title.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-2 sm:px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All Products</h1>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search products by title, description, or category..."
        className="mb-8 w-full max-w-lg px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
      />
      {loading ? (
        <div className="text-center text-blue-600">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
            {filteredProducts.map(product => (
              <div key={product.id} className="flex flex-col h-full bg-white rounded-lg shadow p-4 justify-between">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-3"
                  onError={e => (e.currentTarget.src = 'https://via.placeholder.com/200?text=No+Image')}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
                    <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-700 font-bold">${Number(product.price).toFixed(2)}</span>
                      <span className="text-xs text-gray-400">{product.stock_quantity} in stock</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    {cart[product.id] ? (
                      <>
                        <Button size="sm" variant="secondary" onClick={() => removeFromCart(product.id)}>-</Button>
                        <span>{cart[product.id].qty}</span>
                        <Button size="sm" onClick={() => addToCart({
                          id: product.id,
                          title: product.title,
                          image: product.image,
                          price: Number(product.price)
                        })}>+</Button>
                      </>
                    ) : (
                      <Button size="sm" className="w-full" onClick={() => addToCart({
                        id: product.id,
                        title: product.title,
                        image: product.image,
                        price: Number(product.price)
                      })}>
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

