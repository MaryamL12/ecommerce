import { useState } from "react";

const faqs = [
  {
    q: "How does the filter search work?",
    a: "Pick as many options as you like within one category (like Colour) to see plants matching any of them. Turn on options in more than one category (like Colour and Light Needs) to narrow things down further. You can clear everything at once with the Clear all button in the filter bar.",
  },
  {
    q: "Do I need an account to buy something?",
    a: "No. You can browse, add items to your cart, and check out without signing up or logging in.",
  },
  {
    q: "Can I change my order after I place it?",
    a: "Not yet, once you reach the confirmation screen the order is final. Before that, you can freely change quantities or remove items from your cart at any point in Cart, Information, or Payment.",
  },
  {
    q: "How do I leave feedback?",
    a: "Open Feedback from the menu or the footer at any time. It only takes a minute: a star rating, why you visited, an optional comment, and whether you'd recommend us.",
  },
  {
    q: "What do the growing details on each plant mean?",
    a: "Things like Light Needs, Bloom Season, and Mature Height describe how that specific plant grows, so you can tell at a glance whether it fits your space before buying.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="pn-wrap py-5" style={{ maxWidth: 760 }}>
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <p className="faq-intro">
        Quick answers to the questions we hear most. Can't find what you need? Let us know through the Feedback page.
      </p>

      <div className="faq-list">
        {faqs.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q} className="faq-item">
              <button
                className="faq-question d-flex align-items-center justify-content-between"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
              >
                <span>{item.q}</span>
                <span className="faq-toggle">{open ? "−" : "+"}</span>
              </button>
              {open && <p className="faq-answer">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}