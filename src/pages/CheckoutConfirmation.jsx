import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

export default function CheckoutConfirmation() {
  return (
    <div className="pn-wrap pb-5">
      <CheckoutSteps currentStep={4} />
      <div className="text-center py-5">
        <div className="mb-3 confirmation-icon">🌱</div>
        <h2 className="section-heading text-center">Your order is confirmed!</h2>
        <span className="heading-line center d-block" />
        <p className="mb-5 mx-auto text-muted-gn confirmation-message">We've sent a confirmation email. Your plants will be carefully packed and shipped within 2–3 business days.</p>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <Link to="/shop" className="btn-sage d-inline-block">Continue Shopping</Link>
          <Link to="/feedback" className="btn-outline-sage d-inline-block">Leave Feedback</Link>
        </div>
      </div>
    </div>
  );
}
