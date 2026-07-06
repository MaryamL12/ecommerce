import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import SaleBanner from "./components/SaleBanner";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CheckoutInformation from "./pages/CheckoutInformation";
import CheckoutPayment from "./pages/CheckoutPayment";
import CheckoutConfirmation from "./pages/CheckoutConfirmation";
import Feedback from "./pages/Feedback";
import SearchResults from "./pages/SearchResults";
import FAQ from "./pages/FAQ";

function ShopPage() {
  const location = useLocation();
  return <Shop key={location.pathname} />;
}

function SearchPage() {
  const location = useLocation();
  return <SearchResults key={location.search} />;
}

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="d-flex flex-column min-vh-100">
          <div className="sticky-top">
            <SaleBanner />
            <Header />
          </div>
          <main className="flex-fill">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:category" element={<ShopPage />} />
              <Route path="/shop/:category/:subcategory" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/information" element={<CheckoutInformation />} />
              <Route path="/checkout/payment" element={<CheckoutPayment />} />
              <Route path="/checkout/confirmation" element={<CheckoutConfirmation />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
