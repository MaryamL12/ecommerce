import { Link } from "react-router-dom";
import { categoryMenu } from "../data/products";
export default function Footer() {
  return (
    <footer className="pn-footer">
      <div className="pn-wrap">
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">
          <div className="col">
            <span className="footer-brand d-block">PlantNature 🌿</span>
            <p className="footer-tagline">Bringing greenery home, one plant at a time. Hand-picked for every skill level.</p>
          </div>
          {Object.keys(categoryMenu).map(cat => (
            <div key={cat} className="col">
              <span className="footer-col-title d-block">{cat}</span>
              {categoryMenu[cat].map(sub => (
                <Link key={sub} to={`/shop/${cat}/${encodeURIComponent(sub)}`} className="footer-link d-block">{sub}</Link>
              ))}
            </div>
          ))}
          <div className="col">
            <span className="footer-col-title d-block">Store</span>
            <Link to="/shop" className="footer-link d-block">Shop All</Link>
            <Link to="/cart" className="footer-link d-block">Cart</Link>
            <Link to="/feedback" className="footer-link d-block">Feedback</Link>
            <Link to="/faq" className="footer-link d-block">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
