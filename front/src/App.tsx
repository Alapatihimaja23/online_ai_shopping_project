import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import AISuggest from "./pages/AISuggest";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { AuthModal } from "./components/AuthModal";
import { useAuth } from "./auth/useAuth";
import { useEffect } from "react";



export default function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { jwt } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(!jwt);

  // Show AuthModal on mount if not signed in
  useEffect(() => {
    if (!jwt) setShowAuthModal(true);
    else setShowAuthModal(false);
  }, [jwt]);

  // Handler to open AuthModal from Navbar
  const handleOpenAuthModal = () => setShowAuthModal(true);

  // Protect AI Suggest route
  const ProtectedAISuggest = () => {
    if (!jwt) {
      setShowAuthModal(true);
      return null;
    }
    return <AISuggest />;
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar search={search} setSearch={setSearch} onAuthClick={handleOpenAuthModal} />
        <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
        <Routes>
          {/* Remove direct /auth and /signup links from Navbar, handled by modal */}          <Route path="/" element={<Home selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products" element={<Products search={search} setSearch={setSearch} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai-suggest" element={<ProtectedAISuggest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
