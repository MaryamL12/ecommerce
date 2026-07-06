import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getPriceInfo } from "../data/products";
import QuantityStepper from "./QuantityStepper";
import CartToast from "./CartToast";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(false);

  const { onSale, original, sale } = getPriceInfo(product);

  function handleAdd() {
    addToCart(onSale ? { ...product, price: sale } : product, qty);
    setToast(true);
    setQty(1);
  }

  return (
    <>
      {toast && <CartToast product={product} onClose={() => setToast(false)} />}
      <div className="product-card h-100 d-flex flex-column">
        <Link to={`/product/${product.id}`} className="product-card-link" aria-label={product.name} />
        <img className="product-img" src={product.image} alt={product.name} loading="lazy" />
        <div className="product-body d-flex flex-column flex-fill gap-2">
          <div className="product-group">{product.subcategory}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-price">
            {onSale
              ? <><span className="price-sale">${sale.toFixed(2)}</span><span className="price-original">${original.toFixed(2)}</span></>
              : <>${original.toFixed(2)}</>}
          </div>
          <div className="product-actions d-flex flex-column">
            <QuantityStepper value={qty} onChange={setQty} fullWidth />
            <button className="btn-add-cart" onClick={handleAdd}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}