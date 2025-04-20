import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";

type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  stock_quantity: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({ ...product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const cartQty = cart[product.id]?.qty || 0;
  // Placeholder product data based on database schema
  const prod = product || {
    title: "Premium Headphones",
    description: "High-quality noise-cancelling headphones with superior sound.",
    price: 149.99,
    category: "Electronics",
    stock_quantity: 25,
    // Using a reliable image that won't 404
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
  };

  return (
    <Card className="w-full h-full bg-white rounded-md shadow-sm hover:shadow transition-all duration-200 overflow-hidden flex flex-col">
      <div className="relative pt-[75%] w-full overflow-hidden bg-gray-50">
        <img 
          src={prod.image || "https://placehold.co/300x300/e2e8f0/1e293b?text=No+Image"} 
          alt={prod.title} 
          className="absolute inset-0 w-full h-full object-contain p-2 transition-transform hover:scale-102 duration-200" 
        />
        {prod.stock_quantity && prod.stock_quantity < 5 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">Low Stock</span>
        )}
      </div>
      
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-start gap-1">
          <CardTitle className="text-sm font-medium line-clamp-2">{prod.title}</CardTitle>
          {prod.category && (
            <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">{prod.category}</span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-3 pt-1 flex-grow flex flex-col justify-between">
        <p className="text-gray-500 text-xs mb-2 line-clamp-2">{prod.description}</p>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-base">₹{Number(prod.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            {prod.stock_quantity !== undefined && (
              <span className="text-[10px] text-gray-500">{prod.stock_quantity} in stock</span>
            )}
          </div>
          {cartQty === 0 ? (
            <Button
              size="sm"
              className="w-full text-xs bg-blue-600 hover:bg-blue-700 py-1"
              onClick={() => {
                addToCart({
                  id: prod.id,
                  title: prod.title,
                  image: prod.image,
                  price: Number(prod.price)
                });
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={() => removeFromCart(prod.id)}>-</Button>
              <span className="font-medium text-base px-2">{cartQty}</span>
              <Button size="sm" variant="outline" onClick={() => addToCart({
                id: prod.id,
                title: prod.title,
                image: prod.image,
                price: Number(prod.price)
              })}>+</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
