import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { categoryMenu } from "../data/products";

export default function Header() {
  const { cartCount } = useCart();
  const [openCat, setOpenCat] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const parts = location.pathname.split("/");
  const onShop = parts[1] === "shop";
  const activeCat = onShop && parts[2] ? decodeURIComponent(parts[2]) : "";
  const activeSub = onShop && parts[3] ? decodeURIComponent(parts[3]) : "";

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <nav className="pn-nav">
      <div className="pn-nav-inner d-flex align-items-center">
        <Link to="/" className="pn-brand">PlantNature 🌿</Link>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <div className="d-flex align-items-center">
            {Object.keys(categoryMenu).map(cat => (
              <div key={cat} className="pn-dropdown position-relative"
                onMouseEnter={() => setOpenCat(cat)}
                onMouseLeave={() => setOpenCat(null)}>
                <Link to={`/shop/${cat}`} className={`pn-nav-link d-flex align-items-center gap-1 ${activeCat === cat ? "is-active" : ""}`}>
                  {cat}
                  <svg width="9" height="5" viewBox="0 0 9 5" fill="none">
                    <path d="M1 1l3.5 3L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </Link>
                {openCat === cat && (
                  <div className="pn-dropdown-menu">
                    <Link to={`/shop/${cat}`} className={`pn-dd-item d-block ${activeCat === cat && !activeSub ? "is-selected" : ""}`}>All {cat}</Link>
                    <hr className="pn-dd-divider" />
                    {categoryMenu[cat].map(sub => (
                      <Link key={sub} to={`/shop/${cat}/${encodeURIComponent(sub)}`} className={`pn-dd-item d-block ${activeCat === cat && activeSub === sub ? "is-selected" : ""}`}>{sub}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/shop" className={`pn-nav-link d-flex align-items-center ${location.pathname === "/shop" ? "is-active" : ""}`}>Shop All</Link>
            <Link to="/feedback" className={`pn-nav-link d-flex align-items-center ${location.pathname === "/feedback" ? "is-active" : ""}`}>Feedback</Link>
          </div>

          <form className="pn-search d-flex align-items-center" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search plants..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button type="submit" aria-label="Search" className="d-flex align-items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </button>
          </form>

          <Link to="/cart" className="pn-cart-btn d-flex align-items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Cart
            {cartCount > 0 && <span className="pn-cart-count d-flex align-items-center justify-content-center">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
