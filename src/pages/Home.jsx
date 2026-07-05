import { Link } from "react-router-dom";
import products, { categoryMenu, currentSale } from "../data/products";
import ProductCard from "../components/ProductCard";

const categoryImages = {
  Trees:   "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&fit=crop",
  Flowers: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700&fit=crop",
  Food:    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&fit=crop",
  Seeds:   "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=700&fit=crop",
};

export default function Home() {
  const featured = products.slice(0, 8);
  const dealItems = products.filter(
    p => p.category === currentSale.category && p.subcategory === currentSale.subcategory
  ).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="pn-wrap">
          <p className="hero-eyebrow">Grown with care, delivered with love</p>
          <h1>Plants for every space,<br /><em>every season.</em></h1>
          <p>At PlantNature, we believe any space can become a little garden. Browse trees, flowers, food plants, and seeds — hand-picked for all skill levels.</p>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/shop" className="btn-cta d-inline-block">Shop All Plants →</Link>
          </div>
        </div>
      </section>

      <section className="deal-spotlight">
        <div className="pn-wrap">
          <div className="deal-spotlight-header text-center">
            <span className="home-sale-tag d-inline-block">Limited-Time Deal</span>
            <h2>{currentSale.percentOff}% off {currentSale.subcategory}!</h2>
            <p>Grab yours before they're gone.</p>
          </div>
          <div className="row row-cols-2 row-cols-md-4 g-4">
            {dealItems.map(p => (
              <div key={p.id} className="col"><ProductCard product={p} /></div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to={`/shop/${currentSale.category}/${encodeURIComponent(currentSale.subcategory)}`} className="btn-cta d-inline-block">
              Shop {currentSale.subcategory} →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5 section-bg-cream">
        <div className="pn-wrap">
          <h2 className="section-heading text-center">What are you looking for?</h2>
          <span className="heading-line center d-block" />
          <p className="text-center mb-4 text-muted-gn lead-text">
            Each category has smart filters to find exactly the right plant.
          </p>
          <div className="row row-cols-1 row-cols-sm-2 g-4">
            {Object.keys(categoryMenu).map(cat => (
              <div key={cat} className="col">
                <Link to={`/shop/${cat}`} className="cat-card d-block">
                  <div className="cat-card-image position-relative d-flex align-items-end" style={{ backgroundImage: `url(${categoryImages[cat]})` }}>
                    <div className="cat-card-image-overlay">
                      <div className="cat-card-title">{cat}</div>
                      <div className="cat-card-count">{categoryMenu[cat].length} subcategories</div>
                    </div>
                  </div>
                  <div className="cat-card-subs d-flex flex-wrap">
                    {categoryMenu[cat].map(sub => (
                      <Link key={sub} to={`/shop/${cat}/${encodeURIComponent(sub)}`}
                        className="cat-sub-pill d-inline-block"
                        onClick={e => e.stopPropagation()}>
                        {sub}
                      </Link>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 section-bg-white">
        <div className="pn-wrap">
          <h2 className="section-heading">Featured Plants</h2>
          <span className="heading-line d-block" />
          <p className="mb-4 text-muted-gn lead-text">
            Hand-picked favourites, each with the growing details you need right on the product page.
          </p>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
            {featured.map(p => (
              <div key={p.id} className="col"><ProductCard product={p} /></div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/shop" className="btn-outline-sage d-inline-block">Browse All Plants</Link>
          </div>
        </div>
      </section>

      <section className="py-5 section-bg-cream">
        <div className="pn-wrap row g-4 align-items-center">
          <div className="col-12 col-md-6">
            <h2 className="section-heading">About PlantNature</h2>
            <span className="heading-line d-block" />
            <p className="text-muted-gn home-about-text">
              We started PlantNature because we wanted plant shopping to feel simple, not overwhelming.
              Every tree, flower, food plant, and seed packet comes with the growing details that matter —
              light needs, season, and type — plus filters that help you narrow things down fast.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <div className="row row-cols-3 g-3 text-center">
              <div className="col">
                <div className="home-feature-icon">🔍</div>
                <div className="fw-bold text-forest-gn home-feature-label">Easy to Filter</div>
              </div>
              <div className="col">
                <div className="home-feature-icon">📋</div>
                <div className="fw-bold text-forest-gn home-feature-label">Growing Details Included</div>
              </div>
              <div className="col">
                <div className="home-feature-icon">🛒</div>
                <div className="fw-bold text-forest-gn home-feature-label">Simple Checkout</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="engage-section text-center">
        <div className="pn-wrap">
          <h3>Did you enjoy your visit?</h3>
          <p>We'd love to hear what you think. Your feedback helps us make PlantNature better for every plant lover who stops by. It only takes a minute.</p>
          <Link to="/feedback" className="btn-cta d-inline-block">Share Your Thoughts</Link>
        </div>
      </section>
    </>
  );
}
