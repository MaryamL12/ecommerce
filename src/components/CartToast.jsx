import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function CartToast({ product, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="cart-toast position-fixed">
      <div className="cart-toast-header d-flex justify-content-between align-items-start">
        <div className="cart-toast-title">✓ Added to cart!</div>
        <button onClick={onClose} className="cart-toast-close">✕</button>
      </div>
      <div className="cart-toast-name">{product.name}</div>
      <Link to="/cart" className="cart-toast-btn d-inline-block w-100 text-center" onClick={onClose}>View Cart →</Link>
    </div>
  );
}
