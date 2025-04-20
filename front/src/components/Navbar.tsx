import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useState } from "react";
import { useCart } from "../context/CartContext";


type NavbarProps = {
  search: string;
  setSearch: (s: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
};

export default function Navbar({ search, setSearch }: NavbarProps) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false); // Will connect to auth context later
  const { cart } = useCart();
  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  // Navigation links
  const navLinks = [
    { to: "/", label: "Home", exact: true },
    { to: "/products", label: "Products" },
    { to: "/ai-suggest", label: "AI Suggest" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-3 px-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <StorefrontIcon className="text-blue-600" fontSize="large" />
          <Link to="/" className="text-2xl font-bold text-blue-700 tracking-tight">AI Shop</Link>
        </div>
        {/* Nav Links */}
        <div className="flex gap-4 items-center">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-base font-medium px-3 py-2 rounded transition-colors duration-150 ${location.pathname === link.to ? "text-blue-700 bg-blue-100" : "text-gray-700 hover:bg-gray-100"}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {/* Search, Cart, Profile/Auth */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="pl-8 pr-3 py-1.5 text-sm rounded-md border border-gray-300 w-40 h-9 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />
        </div>
        <Link to="/cart">
          <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-blue-50">
            <ShoppingCartIcon className="text-gray-700" fontSize="medium" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
          </Button>
        </Link>
        {isLoggedIn ? (
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50">
              <AccountCircleIcon className="text-gray-700" fontSize="medium" />
            </Button>
          </Link>
        ) : (
          <div className="flex gap-2">
            <Link to="/auth">
              <Button variant="ghost" className="flex items-center gap-1">
                <LoginIcon className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
    {/* Mobile Navbar */}
    <div className="flex md:hidden items-center justify-between w-full min-h-[56px]">
      <div className="flex items-center gap-2">
        <StorefrontIcon className="text-blue-600" fontSize="medium" />
        <Link to="/" className="text-lg font-bold text-blue-700 tracking-tight">AI Shop</Link>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/cart">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <ShoppingCartIcon className="text-gray-700" fontSize="small" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </Button>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </Button>
      </div>
    </div>
    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4 mt-1 rounded shadow">
        <div className="flex flex-col gap-2">
          {navLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              className={`text-base font-medium px-3 py-2 rounded-md ${location.pathname === link.to ? "text-blue-700 bg-blue-50" : "text-gray-700"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="relative my-2">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-8 pr-3 py-1.5 text-sm rounded-md border border-gray-300 w-full h-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />
          </div>
          {!isLoggedIn && (
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">Sign In</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-center bg-blue-600 hover:bg-blue-700">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    )}
  </nav>
  );
}
