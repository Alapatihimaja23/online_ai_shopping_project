import { Link, useLocation, useNavigate } from "react-router-dom";
import{ useRef, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { useCart } from "../context/CartContext";
import { useAuth } from "../auth/useAuth";
import { useCurrentUser } from "../auth/useCurrentUser";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import type { User } from "firebase/auth";

function ProfileDropdown({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem('jwt');
    window.location.href = "/auth";
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className={`flex items-center gap-1 text-blue-700 hover:text-blue-900 focus:outline-none border-2 rounded-lg px-1 py-1 ${open ? "border-blue-400" : "border-transparent"}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Profile"
      >
        {user && user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Avatar"
            className="w-12 h-12 rounded-full border border-blue-300 shadow-sm object-cover"
          />
        ) : (
          <AccountCircleIcon fontSize="large" />
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
          <button
            className="block w-full px-4 py-3 text-left text-lg text-gray-800 hover:bg-gray-100"
            onClick={() => { setOpen(false); navigate('/profile'); }}
          >
            Profile
          </button>
          <button
            className="block w-full px-4 py-3 text-left text-lg font-bold text-gray-800 hover:bg-gray-100"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

type NavbarProps = {
  search: string;
  setSearch: (s: string) => void;
  onAuthClick?: () => void;
};

export default function Navbar({ search, setSearch, onAuthClick }: NavbarProps) {
  const { user } = useCurrentUser();
  const location = useLocation();
  const { cart } = useCart();
  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const { jwt } = useAuth();
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
      <div className="flex items-center gap-5">
        <div className="relative">
          <input
            type="text"
            className="pl-8 pr-3 py-1.5 text-sm rounded-md border border-gray-300 w-40 h-9 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..." />
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" fontSize="small" />
        </div>
        <Link to="/cart" className="relative">
          <ShoppingCartIcon className="text-gray-600" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{cartCount}</span>
          )}
        </Link>
        {/* Auth/Profile Button */}
        {jwt ? (
          <ProfileDropdown user={user} />
        ) : (
          <button onClick={onAuthClick} className="flex items-center gap-1 text-gray-700 hover:text-blue-700">
            <LoginIcon fontSize="large" />
            <span className="hidden sm:inline text-base font-medium">Sign In</span>
          </button>
        )}
      </div>
    </div>
  </nav>
  );
}