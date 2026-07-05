const STEPS = ["Cart", "Information", "Payment", "Confirmation"];

export default function CheckoutSteps({ currentStep }) {
  return (
    <div className="checkout-steps d-flex align-items-start">
      {STEPS.map((step, i) => {
        const n = i + 1;
        const done = n < currentStep;
        const active = n === currentStep;

        let circleClass = "s-todo";
        if (done) circleClass = "s-done";
        else if (active) circleClass = "s-active";

        let labelClass = "";
        if (done) labelClass = "done";
        else if (active) labelClass = "active";

        return (
          <div key={step} className="step-wrap d-flex align-items-start flex-fill">
            <div className="step-item text-center">
              <div className={`step-circle d-flex align-items-center justify-content-center ${circleClass}`}>{done ? "✓" : n}</div>
              <div className={`step-label ${labelClass}`}>{step}</div>
            </div>
            {i < STEPS.length - 1 && <div className={`step-connector ${done ? "done" : ""}`} />}
          </div>
        );
      })}
    </div>
  );
}
