import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutSteps from "../components/CheckoutSteps";
import Breadcrumb from "../components/Breadcrumb";
import QuantityStepper from "../components/QuantityStepper";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  return (
    <div className="pn-wrap pb-5">
      <Breadcrumb items={[{ label:"Cart", to:"/cart" }]} />
      <h2 className="section-heading">Your Cart</h2>
      <span className="heading-line d-block" />
      <CheckoutSteps currentStep={1} />
      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <p className="mb-4 text-muted-gn empty-state-text">Your cart is empty.</p>
          <Link to="/shop" className="btn-sage d-inline-block">Start Shopping</Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Plant</th><th>Price</th><th>Qty</th><th className="text-end">Subtotal</th><th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img src={item.image} alt={item.name} className="cart-img" onError={e => { e.target.style.display="none"; }} />
                        <div>
                          <Link to={`/product/${item.id}`} className="fw-semibold text-forest-gn cart-text-sm">{item.name}</Link>
                          <div className="text-muted-gn cart-item-sub">{item.subcategory}</div>
                        </div>
                      </div>
                    </td>
                    <td className="cart-text-sm">${item.price.toFixed(2)}</td>
                    <td><QuantityStepper value={item.quantity} onChange={qty => updateQuantity(item.id, qty)} /></td>
                    <td className="fw-bold text-end text-sage-gn">${(item.price*item.quantity).toFixed(2)}</td>
                    <td className="text-end">
                      <button onClick={() => removeFromCart(item.id)} className="border-0 bg-transparent cart-remove-btn">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-12 col-lg-4 summary-box">
            <h5>Order Summary</h5>
            <div className="summary-row d-flex justify-content-between"><span className="label">Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
            <div className="summary-row d-flex justify-content-between"><span className="label">Shipping</span><span className="text-accent-gn">Free</span></div>
            <div className="summary-total d-flex justify-content-between"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
            <button className="btn-cta d-inline-block w-100 mt-3 text-center checkout-cta-btn"
              onClick={() => navigate("/checkout/information")}>
              Proceed to Checkout →
            </button>
            <Link to="/shop" className="continue-shopping-link d-block text-center">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
