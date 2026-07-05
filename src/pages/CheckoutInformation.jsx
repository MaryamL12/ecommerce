import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutSteps from "../components/CheckoutSteps";
import Breadcrumb from "../components/Breadcrumb";
import EmptyCartNotice from "../components/EmptyCartNotice";

export default function CheckoutInformation() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", address:"", city:"", province:"ON", postalCode:"" });
  const h = e => setForm({ ...form, [e.target.name]: e.target.value });
  if (!cartItems.length) return <EmptyCartNotice />;
  return (
    <div className="pn-wrap pb-5">
      <Breadcrumb items={[{label:"Cart",to:"/cart"},{label:"Information",to:"#"}]} />
      <h2 className="section-heading">Shipping Information</h2>
      <span className="heading-line d-block" />
      <CheckoutSteps currentStep={2} />
      <div className="mx-auto checkout-form-wrap">
        <form onSubmit={e => { e.preventDefault(); navigate("/checkout/payment"); }}>
          <div className="row g-3">
            <div className="col-6 form-group"><label className="pn-label d-block">First Name</label><input className="pn-input" name="firstName" required pattern="[A-Za-z .'\-]+" title="Please enter a name (letters only)" value={form.firstName} onChange={h} placeholder="Jane" /></div>
            <div className="col-6 form-group"><label className="pn-label d-block">Last Name</label><input className="pn-input" name="lastName" required pattern="[A-Za-z .'\-]+" title="Please enter a name (letters only)" value={form.lastName} onChange={h} placeholder="Smith" /></div>
          </div>
          <div className="form-group"><label className="pn-label d-block">Email</label><input className="pn-input" type="email" name="email" required value={form.email} onChange={h} placeholder="jane@example.com" /></div>
          <div className="form-group"><label className="pn-label d-block">Street Address</label><input className="pn-input" name="address" required value={form.address} onChange={h} placeholder="123 Garden Lane" /></div>
          <div className="row g-3">
            <div className="col-6 form-group"><label className="pn-label d-block">City</label><input className="pn-input" name="city" required value={form.city} onChange={h} placeholder="Ottawa" /></div>
            <div className="col-3 form-group"><label className="pn-label d-block">Province</label><select className="pn-select" name="province" value={form.province} onChange={h}>{["AB","BC","MB","NB","NL","NS","ON","PE","QC","SK"].map(p=><option key={p}>{p}</option>)}</select></div>
            <div className="col-3 form-group"><label className="pn-label d-block">Postal Code</label><input className="pn-input" name="postalCode" required maxLength={7} pattern="[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d" title="Format: A1A 1A1" value={form.postalCode} onChange={h} placeholder="K1N 6N5" /></div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn-outline-sage d-inline-block" onClick={() => navigate("/cart")}>← Back</button>
            <button type="submit" className="btn-sage d-inline-block">Continue to Payment →</button>
          </div>
        </form>
      </div>
    </div>
  );
}
