import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products, { facetsPerCategory, categoryMenu, subcategoryFacetMap } from "../data/products";
import ProductCard from "../components/ProductCard";
import FacetFilters from "../components/FacetFilters";
import Breadcrumb from "../components/Breadcrumb";

const shopAllFacetConfig = {
  category: { label: "Category", kind: "multi", options: Object.keys(categoryMenu) },
  light: { label: "Light Needs", kind: "multi", options: ["Full Sun", "Partial Shade", "Full Shade"] },
};

function buildEmptyFilters(facetConfig) {
  const filters = {};
  for (const key in facetConfig) {
    filters[key] = facetConfig[key].kind === "multi" ? [] : null;
  }
  return filters;
}

function buildInitialFilters(facetConfig, category, subcategory) {
  const filters = buildEmptyFilters(facetConfig);
  const presetsForCategory = subcategoryFacetMap[category];
  const preset = presetsForCategory ? presetsForCategory[subcategory] : null;
  if (!preset) return filters;

  for (const key in preset) {
    if (!facetConfig[key]) continue;
    const value = preset[key];
    filters[key] = facetConfig[key].kind === "multi" ? [value] : value;
  }
  return filters;
}

function keepOptionsThatExist(facetConfig, productsInScope) {
  const trimmedConfig = {};
  for (const key in facetConfig) {
    const valuesPresent = new Set(productsInScope.map(p => p[key]));
    const options = facetConfig[key].options.filter(opt => valuesPresent.has(opt));
    if (options.length > 1) {
      trimmedConfig[key] = { ...facetConfig[key], options };
    }
  }
  return trimmedConfig;
}

export default function Shop() {
  const { category, subcategory } = useParams();
  const decodedSubcategory = subcategory ? decodeURIComponent(subcategory) : null;

  const productsInScope = products.filter(product => {
    if (category && product.category !== category) return false;
    if (decodedSubcategory && product.subcategory !== decodedSubcategory) return false;
    return true;
  });

  const baseFacetConfig = category ? facetsPerCategory[category] : shopAllFacetConfig;
  const facetConfig = keepOptionsThatExist(baseFacetConfig, productsInScope);

  const [filters, setFilters] = useState(() => buildInitialFilters(facetConfig, category, decodedSubcategory));
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setFilters(buildInitialFilters(facetConfig, category, decodedSubcategory));
    setPriceMin(0);
    setPriceMax(100);
  }, [category, decodedSubcategory]);

  function toggleMultiFilter(key, option) {
    setFilters(prev => {
      const selected = prev[key] || [];
      const isSelected = selected.includes(option);
      return {
        ...prev,
        [key]: isSelected ? selected.filter(v => v !== option) : [...selected, option],
      };
    });
  }

  function setRadioFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  function clearAllFilters() {
    setFilters(buildEmptyFilters(facetConfig));
    setPriceMin(0);
    setPriceMax(100);
  }

  let filtered = productsInScope.filter(product => {
    if (product.price < priceMin || product.price > priceMax) return false;

    for (const key in facetConfig) {
      const config = facetConfig[key];
      const selected = filters[key];
      if (config.kind === "multi" && selected.length > 0 && !selected.includes(product[key])) return false;
      if (config.kind === "radio" && selected && product[key] !== selected) return false;
    }
    return true;
  });

  if (sortBy === "price-asc")  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "name")       filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const crumbs = [];
  if (category) crumbs.push({ label: category, to: `/shop/${category}` });
  if (decodedSubcategory) crumbs.push({ label: decodedSubcategory, to: `/shop/${category}/${subcategory}` });
  if (!category) crumbs.push({ label: "Shop All", to: "/shop" });

  const title = decodedSubcategory || category || "Shop All Plants";

  return (
    <div className="pn-wrap shop-page-wrap pb-5">
      <Breadcrumb items={crumbs} />

      <div className="shop-topbar">
        <h2 className="section-heading text-center">{title}</h2>
      </div>

      <FacetFilters
        facetConfig={facetConfig}
        filters={filters}
        onToggleMulti={toggleMultiFilter}
        onSetRadio={setRadioFilter}
        priceMin={priceMin}
        priceMax={priceMax}
        onMin={setPriceMin}
        onMax={setPriceMax}
        onClear={clearAllFilters}
        resultCount={filtered.length}
        sortBy={sortBy}
        onSort={setSortBy}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-5 text-muted-gn">
          <p className="mb-3 empty-state-text">No plants match your filters.</p>
          <button className="btn-outline-sage d-inline-block" onClick={clearAllFilters}>Clear all filters</button>
        </div>
      ) : (
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filtered.map(p => (
            <div key={p.id} className="col"><ProductCard product={p} /></div>
          ))}
        </div>
      )}
    </div>
  );
}
