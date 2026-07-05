import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutSteps from "../components/CheckoutSteps";
import Breadcrumb from "../components/Breadcrumb";
import EmptyCartNotice from "../components/EmptyCartNotice";

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ firstName:"", lastName:"", cardNumber:"", expiry:"", cvv:"" });
  const h = e => setForm({ ...form, [e.target.name]: e.target.value });
  if (!cartItems.length) return <EmptyCartNotice />;
  return (
    <div className="pn-wrap pb-5">
      <Breadcrumb items={[{label:"Cart",to:"/cart"},{label:"Information",to:"/checkout/information"},{label:"Payment",to:"#"}]} />
      <h2 className="section-heading">Payment</h2>
      <span className="heading-line d-block" />
      <CheckoutSteps currentStep={3} />
      <div className="mx-auto checkout-form-wrap">
        <form onSubmit={e => { e.preventDefault(); clearCart(); navigate("/checkout/confirmation"); }}>
          <div className="row g-3">
            <div className="col-6 form-group"><label className="pn-label d-block">First Name</label><input className="pn-input" name="firstName" required pattern="[A-Za-z .'\-]+" title="Please enter a name (letters only)" value={form.firstName} onChange={h} placeholder="Jane" /></div>
            <div className="col-6 form-group"><label className="pn-label d-block">Last Name</label><input className="pn-input" name="lastName" required pattern="[A-Za-z .'\-]+" title="Please enter a name (letters only)" value={form.lastName} onChange={h} placeholder="Smith" /></div>
          </div>
          <div className="form-group"><label className="pn-label d-block">Card Number</label><input className="pn-input" name="cardNumber" required inputMode="numeric" maxLength={16} pattern="[0-9]{16}" title="Enter the 16 digits on your card" value={form.cardNumber} onChange={h} placeholder="1234567890123456" /></div>
          <div className="row g-3">
            <div className="col-6 form-group"><label className="pn-label d-block">Expiry (MM/YY)</label><input className="pn-input" name="expiry" required maxLength={5} pattern="(0[1-9]|1[0-2])/[0-9]{2}" title="Format: MM/YY" value={form.expiry} onChange={h} placeholder="MM/YY" /></div>
            <div className="col-6 form-group"><label className="pn-label d-block">CVV</label><input className="pn-input" name="cvv" required inputMode="numeric" maxLength={3} pattern="[0-9]{3}" title="3 digits" value={form.cvv} onChange={h} placeholder="123" /></div>
          </div>
          <div className="d-flex justify-content-between mb-4 payment-total-box">
            <span className="fw-semibold text-forest-gn">Total</span>
            <span className="fw-bold text-sage-gn payment-total-amount">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn-outline-sage d-inline-block" onClick={() => navigate("/checkout/information")}>← Back</button>
            <button type="submit" className="btn-sage d-inline-block place-order-btn">Place Order →</button>
          </div>
        </form>
      </div>
    </div>
  );
}
