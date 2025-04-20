import React from "react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import DevicesIcon from '@mui/icons-material/Devices';
import WatchIcon from '@mui/icons-material/Watch';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import HomeIcon from '@mui/icons-material/Home';

type HomeProps = {
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
};

export default function Home({ selectedCategory, setSelectedCategory }: HomeProps) {
  // Products state fetched from backend
  type Product = {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number | string;
    category: string;
    stock_quantity: number;
  };
  const [products, setProducts] = React.useState<Product[]>([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Helper for error state
  const [error, setError] = React.useState<string>("");
  // selectedCategory and setSelectedCategory are received as props from App
  
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
  
  // Fetch 4 diverse products by default
  React.useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${apiBaseURL}/products?limit=4`)
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
  }, [apiBaseURL]);

  // AI Suggestion state
  const [aiSuggestion, setAiSuggestion] = React.useState<string>("");
  const [aiRecommended, setAiRecommended] = React.useState<Product|null>(null);
  const [aiLoading, setAiLoading] = React.useState(false);
  const handleAISuggest = async () => {
    setAiLoading(true);
    setAiSuggestion("");
    setAiRecommended(null);
    try {
      const res = await fetch(`${apiBaseURL}/products/ai_suggest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Suggest a product for me" })
      });
      if (!res.ok) throw new Error("AI suggestion failed");
      const data = await res.json();
      setAiSuggestion(data.suggestion || "");
      setAiRecommended(data.recommended ? { ...data.recommended, price: Number(data.recommended.price) } : null);
    } catch {
      setAiSuggestion("Could not get AI suggestion");
      setAiRecommended(null);
    }
    setAiLoading(false);
  };  

  // Search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setSelectedCategory("");
    setLoading(true);
    setError("");
    fetch(`${apiBaseURL}/products?q=${encodeURIComponent(value)}`)
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
  };

  // Category click handler
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearch("");
    setLoading(true);
    setError("");
    fetch(`${apiBaseURL}/products?category=${encodeURIComponent(category)}&limit=4`)
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
  };

  // Categories based on database schema

  const categories = [
    { name: "Electronics", icon: <DevicesIcon fontSize="large" className="text-blue-500" /> },
    { name: "Wearables", icon: <WatchIcon fontSize="large" className="text-purple-500" /> },
    { name: "Computers", icon: <LaptopMacIcon fontSize="large" className="text-green-500" /> },
    { name: "Accessories", icon: <HeadphonesIcon fontSize="large" className="text-pink-500" /> },
    { name: "Smart Home", icon: <HomeIcon fontSize="large" className="text-yellow-500" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8">
        <input
          type="text"
          placeholder="Search products by title..."
          value={search}
          onChange={handleSearch}
          className="w-full p-2 mb-6 border rounded shadow"
        />
        {loading ? (
          <div className="text-center py-10 text-lg">Loading products...</div>
        ) : error ? (
          <div className="text-center py-10 text-lg text-red-600">{error === 'No products found.' ? (
            <div>
              <img src="https://placehold.co/300x300/eee/888?text=Out+of+Stock" alt="Out of Stock" className="mx-auto mb-4 rounded" style={{maxWidth:180}} />
              <div>Oops, we are out of stock!</div>
            </div>
          ) : error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...{...product, price: Number(product.price)}} />
            ))}
          </div>
        )}

        {/* AI Suggestion and Recommendation moved below */}
        <div className="flex flex-col items-center mt-8">
          <Button onClick={handleAISuggest} disabled={aiLoading}>
            {aiLoading ? "Thinking..." : "✨ AI Suggest"}
          </Button>
        </div>
        {(aiSuggestion || aiRecommended) && (
          <div className="flex flex-col items-center mt-4">
            {aiSuggestion && (
              <div className="mt-4 text-center max-w-xl">
                <div className="font-semibold text-lg mb-2">AI Suggestion:</div>
                <div className="bg-gray-100 rounded p-3">{aiSuggestion}</div>
              </div>
            )}
            {aiRecommended && (
              <div className="mt-4">
                <div className="font-semibold">Recommended Product:</div>
                <ProductCard {...{...aiRecommended, price: Number(aiRecommended.price)}} />
              </div>
            )}
          </div>
        )}

      </div>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-100 to-purple-200 py-10 flex flex-col items-center justify-center text-center overflow-hidden min-h-[350px] px-0">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200" 
            alt="Shopping" 
            className="w-full h-full object-cover opacity-20 pointer-events-none" 
            style={{ maxHeight: '350px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-blue-100/60" />
        </div>
        <div className="relative z-10 w-full px-2 sm:px-4 py-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-3 drop-shadow-sm text-center">
            Welcome to the AI Shopping Platform
          </h1>
          <p className="text-base md:text-lg text-blue-800 mb-5 max-w-xl mx-auto text-center">
            Discover premium products and get personalized AI-powered recommendations tailored just for you!
          </p>
          <Button size="lg" className="text-base px-6 py-2 shadow-md bg-blue-600 hover:bg-blue-700 transition-colors mx-auto" onClick={() => alert('AI integration is in progress. We\'ll keep in touch!')}>
            Shop Now
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full py-8 px-2 sm:px-4 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-3xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col items-center justify-center cursor-pointer min-w-[110px] min-h-[110px] border-2 ${selectedCategory === category.name ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="mb-2 flex items-center justify-center">
                {category.icon}
              </span>
              <h3 className="text-sm font-semibold text-gray-800 text-center">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>


      {/* AI Recommendations */}
      <section className="w-full py-6 px-2 sm:px-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 md:p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Get AI-Powered Recommendations</h2>
              <p className="mb-4 max-w-xl text-sm md:text-base">Our advanced AI analyzes your preferences to suggest products you'll love. Try it now!</p>
              <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100 text-sm" onClick={() => alert('AI integration is in progress. We\'ll keep in touch!')}>Get Recommendations</Button>
            </div>
            <div className="w-full md:w-1/4 flex-shrink-0">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/8637/8637114.png" 
                alt="AI Recommendations" 
                className="w-full max-w-[120px] mx-auto" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
