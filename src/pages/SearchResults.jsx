import { Link, useSearchParams } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const results = query
    ? products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="pn-wrap pt-3 pb-5">
      <h2 className="section-heading">
        {query ? `Search results for "${query}"` : "Search"}
      </h2>
      <p className="mb-4 text-muted-gn">
        {results.length} plant{results.length !== 1 ? "s" : ""} found
      </p>

      {results.length === 0 ? (
        <p className="text-muted-gn">
          No plants matched your search. Try a different word, or <Link to="/shop">browse the full shop</Link>.
        </p>
      ) : (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {results.map(p => (
            <div key={p.id} className="col"><ProductCard product={p} /></div>
          ))}
        </div>
      )}
    </div>
  );
}
