import { Button } from "../components/ui/button";
import ProductCard from "../components/ProductCard";
import DevicesIcon from '@mui/icons-material/Devices';
import WatchIcon from '@mui/icons-material/Watch';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import HomeIcon from '@mui/icons-material/Home';

export default function Home() {
  // Sample products based on database schema
  const featuredProducts = [
    {
      id: "1",
      title: "Premium Noise-Cancelling Headphones",
      description: "Experience crystal-clear audio with our premium noise-cancelling technology.",
      price: 149.99,
      category: "Electronics",
      stock_quantity: 25,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
    },
    {
      id: "2",
      title: "Smart Watch Series X",
      description: "Track your fitness, receive notifications, and more with our latest smartwatch.",
      price: 299.99,
      category: "Wearables",
      stock_quantity: 12,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
    },
    {
      id: "3",
      title: "Ultra-Slim Laptop Pro",
      description: "Powerful performance in an ultra-slim design. Perfect for professionals.",
      price: 1299.99,
      category: "Computers",
      stock_quantity: 8,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
    },
    {
      id: "4",
      title: "Wireless Charging Pad",
      description: "Fast wireless charging for all your compatible devices.",
      price: 49.99,
      category: "Accessories",
      stock_quantity: 30,
      image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300"
    }
  ];

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
          <Button size="lg" className="text-base px-6 py-2 shadow-md bg-blue-600 hover:bg-blue-700 transition-colors mx-auto">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full py-8 px-2 sm:px-4 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-3xl mx-auto">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col items-center justify-center cursor-pointer min-w-[110px] min-h-[110px]">
              <span className="mb-2 flex items-center justify-center">
                {category.icon}
              </span>
              <h3 className="text-sm font-semibold text-gray-800 text-center">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-8 px-2 sm:px-4 flex flex-col items-center">
        <div className="flex flex-col md:flex-row md:justify-between items-center w-full max-w-6xl mb-4 gap-4 px-2 sm:px-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left">Featured Products</h2>
          <Button variant="outline" size="sm" className="hidden md:block text-sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-fullmax-w-6xl mx-auto">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-4 text-center md:hidden">
          <Button variant="outline" size="sm" className="text-sm">View All Products</Button>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="w-full py-6 px-2 sm:px-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 md:p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Get AI-Powered Recommendations</h2>
              <p className="mb-4 max-w-xl text-sm md:text-base">Our advanced AI analyzes your preferences to suggest products you'll love. Try it now!</p>
              <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100 text-sm">Get Recommendations</Button>
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
