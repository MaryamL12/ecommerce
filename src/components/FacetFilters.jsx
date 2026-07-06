function PriceRange({ priceMin, priceMax, onMin, onMax }) {
  return (
    <div className="price-range-wrap d-flex align-items-center gap-2">
      <span>$</span>
      <input
        className="price-input"
        type="number"
        min={0}
        value={priceMin}
        onChange={e => onMin(Number(e.target.value))}
      />
      <span className="price-sep">to</span>
      <span>$</span>
      <input
        className="price-input"
        type="number"
        min={0}
        value={priceMax}
        onChange={e => onMax(Number(e.target.value))}
      />
    </div>
  );
}

export default function FacetFilters({
  facetConfig, filters, onToggleMulti, onSetRadio,
  priceMin, priceMax, onMin, onMax, onClear, resultCount,
  sortBy, onSort,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-toprow d-flex align-items-center justify-content-between flex-wrap gap-2">
        <span className="filter-toprow-label">Filter — {resultCount} result{resultCount !== 1 ? "s" : ""}</span>
        <div className="d-flex align-items-center gap-3">
          <select className="sort-select" value={sortBy} onChange={e => onSort(e.target.value)}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name A → Z</option>
          </select>
          <button className="filter-clear" onClick={onClear}>Clear all</button>
        </div>
      </div>

      <p className="filter-help-tip">
        Tip: pick more than one option in a category to see plants that match any of them. Combine categories (like Colour and Light Needs) to narrow things down further.
      </p>

      <div className="filter-row d-flex flex-wrap align-items-start">
        <div>
          <div className="filter-group-label">Price Range</div>
          <PriceRange priceMin={priceMin} priceMax={priceMax} onMin={onMin} onMax={onMax} />
        </div>

        {Object.entries(facetConfig).map(([key, config]) => (
          <div key={key}>
            <div className="filter-group-label">{config.label}</div>

            {config.kind === "multi" && (
              <div className="pill-group d-flex flex-wrap">
                {config.options.map(option => (
                  <button
                    key={option}
                    className={`pill ${filters[key].includes(option) ? "on" : ""}`}
                    onClick={() => onToggleMulti(key, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {config.kind === "radio" && (
              <div className="seg-group d-flex">
                <div className="seg-option d-flex">
                  <input type="radio" id={`${key}-any`} name={key} checked={!filters[key]} onChange={() => onSetRadio(key, null)} className="d-none" />
                  <label htmlFor={`${key}-any`}>Any</label>
                </div>
                {config.options.map(option => (
                  <div key={option} className="seg-option d-flex">
                    <input type="radio" id={`${key}-${option}`} name={key} checked={filters[key] === option} onChange={() => onSetRadio(key, option)} className="d-none" />
                    <label htmlFor={`${key}-${option}`}>{option}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}