import { Link } from "react-router-dom";
import { currentSale } from "../data/products";

export default function SaleBanner() {
  return (
    <Link to={`/shop/${currentSale.category}/${encodeURIComponent(currentSale.subcategory)}`} className="sale-banner d-block text-center">
      {currentSale.message} Shop the sale now →
    </Link>
  );
}
