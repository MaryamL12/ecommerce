import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products, { getPriceInfo, categoryIcons } from "../data/products";
import { useCart } from "../context/CartContext";
import Breadcrumb from "../components/Breadcrumb";
import QuantityStepper from "../components/QuantityStepper";
import CartToast from "../components/CartToast";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  if (!product) return (
    <div className="pn-wrap text-center py-5">
      <h3>Plant not found</h3>
      <Link to="/shop" className="btn-sage d-inline-block mt-3">Back to Shop</Link>
    </div>
  );

  const { onSale, original, sale } = getPriceInfo(product);

  function handleAdd() { addToCart(onSale ? { ...product, price: sale } : product, qty); setToast(true); }

  const crumbs = [
    { label: product.category, to: `/shop/${product.category}` },
    { label: product.subcategory, to: `/shop/${product.category}/${encodeURIComponent(product.subcategory)}` },
    { label: product.name, to: "#" },
  ];

  const facts = [
    { label:"Light Needs", value: product.light },
    product.season       && { label:"Season",        value: product.season },
    product.type         && { label:"Tree Type",      value: product.type },
    product.color        && { label:"Colour",         value: product.color },
    product.placement    && { label:"Placement",      value: product.placement },
    product.bloom        && { label:"Bloom Season",   value: product.bloom },
    product.foodType     && { label:"Food Type",      value: product.foodType },
    product.seedType     && { label:"Seed Type",      value: product.seedType },
    product.germination  && { label:"Germination",    value: product.germination },
    product.potSize      && { label:"Size",           value: product.potSize },
    product.matureHeight && { label:"Mature Height",  value: product.matureHeight },
    product.seedCount    && { label:"Amount",         value: product.seedCount },
  ].filter(Boolean);

  return (
    <div className="pn-wrap pb-5">
      {toast && <CartToast product={product} onClose={() => setToast(false)} />}
      <Breadcrumb items={crumbs} />
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          {!imgErr
            ? <img className="detail-img" src={product.image} alt={product.name} onError={() => setImgErr(true)} />
            : <div className="detail-img-fallback d-flex align-items-center justify-content-center">{categoryIcons[product.category]}</div>
          }
        </div>
        <div className="col-12 col-lg-6">
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-price-wrap">
            {onSale ? (
              <>
                <span className="detail-price">${sale.toFixed(2)}</span>
                <span className="detail-price-original">${original.toFixed(2)}</span>
              </>
            ) : (
              <span className="detail-price">${original.toFixed(2)}</span>
            )}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-facts">
            {facts.map(f => (
              <div key={f.label} className="detail-fact d-flex justify-content-between">
                <span className="label">{f.label}</span>
                <span className="value">{f.value}</span>
              </div>
            ))}
          </div>
          <div className="detail-actions d-flex align-items-center flex-wrap gap-3">
            <QuantityStepper value={qty} onChange={setQty} />
            <button className="btn-add-cart-lg" onClick={handleAdd}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
