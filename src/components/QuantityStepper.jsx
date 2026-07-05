export default function QuantityStepper({ value, onChange, min = 1, max = 99, fullWidth = false }) {
  return (
    <div className={`qty-stepper d-flex align-items-stretch${fullWidth ? " qty-stepper-full" : ""}`}>
      <button className="qty-btn d-flex align-items-center justify-content-center" onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <span className="qty-val d-flex align-items-center justify-content-center">{value}</span>
      <button className="qty-btn d-flex align-items-center justify-content-center" onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}
