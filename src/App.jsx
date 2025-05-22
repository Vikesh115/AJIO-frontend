import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProductDetail from './components/product/ProdutDetail';
import CartPage from './components/cart/CartPage';
import WishlistPage from './components/wishlist/WishlistPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './pages/NotFound';
import Footer from './components/common/Footer';
import { fetchProducts, fetchCategories } from './store/productSlice';
import { fetchCart, setGuestCart } from './store/cartSlice';
import { fetchWishlist, setGuestWishlist } from './store/wishlistSlice';

const App = () => {
  const [dataReady, setDataReady] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchCart());
      dispatch(fetchWishlist()).finally(() => setDataReady(true));
    } else {
      const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      const guestWishlist = JSON.parse(localStorage.getItem('guest_wishlist') || '[]');

      dispatch(setGuestCart(guestCart));
      dispatch(setGuestWishlist(guestWishlist));
      setDataReady(true);
    }
  }, [dispatch, token]);

  const shouldShowHeader = !['/login', '/register'].includes(location.pathname);
  const shouldShowFooter = !['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowHeader && dataReady && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            // element={token ? <Dashboard /> : <Navigate to="/login" />}
            element={<Dashboard />}
          />
          <Route
            path="/product/:id"
            // element={token ? <ProductDetail /> : <Navigate to="/login" />}
            element={<ProductDetail />}
          />
          <Route
            path="/cart"
            element={token ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/wishlist"
            element={token ? <WishlistPage /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default App;