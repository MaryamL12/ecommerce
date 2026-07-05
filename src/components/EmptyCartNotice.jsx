import { Link } from "react-router-dom";

export default function EmptyCartNotice() {
  return (
    <div className="pn-wrap text-center py-5">
      <p className="text-muted-gn">Your cart is empty.</p>
      <Link to="/shop" className="btn-sage d-inline-block mt-3">Shop Now</Link>
    </div>
  );
}
