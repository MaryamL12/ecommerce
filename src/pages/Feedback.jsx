import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";

const STAR_LABELS = ["","Poor","Fair","Good","Great","Excellent!"];

export default function Feedback() {
  const [done, setDone]           = useState(false);
  const [rating, setRating]       = useState(0);
  const [visited, setVisited]     = useState("");
  const [comment, setComment]     = useState("");
  const [recommend, setRecommend] = useState("");

  const canSubmit = rating > 0 && visited !== "" && comment.trim() !== "" && recommend !== "";

  return (
    <div className="pn-wrap pb-5">
      <Breadcrumb items={[{ label:"Feedback", to:"/feedback" }]} />
      <div className="mx-auto feedback-wrap">
        {done ? (
          <div className="pn-card text-center feedback-done-card">
            <div className="mb-3 feedback-done-icon">💚</div>
            <h2 className="section-heading text-center">Thank you so much!</h2>
            <span className="heading-line center d-block" />
            <p className="text-muted-gn lead-text">
              We really appreciate you taking the time. Every response helps PlantNature grow — just like the plants we ship to your door. 🌿
            </p>
          </div>
        ) : (
          <div className="pn-card">
            <h2 className="section-heading">How was your visit?</h2>
            <span className="heading-line d-block" />
            <p className="mb-4 text-muted-gn lead-text">
              Got a minute? We'd love to hear what you thought of PlantNature. Your honest feedback — good or not so good — helps us make this a better place for every plant lover. 🌱
            </p>

            <form onSubmit={e => { e.preventDefault(); if (canSubmit) setDone(true); }}>
              <div className="form-group">
                <label className="pn-label d-block">Overall experience <span className="text-sage-gn">*</span></label>
                <div className="d-flex gap-1 my-2">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" className={`star-btn ${s<=rating?"filled":""}`}
                      onClick={() => setRating(s)} aria-label={`${s} star`}>★</button>
                  ))}
                </div>
                {rating > 0 && <small className="text-muted-gn">{STAR_LABELS[rating]}</small>}
              </div>

              <div className="form-group">
                <label className="pn-label d-block">What brought you here today? <span className="text-sage-gn">*</span></label>
                {["Just browsing","Looking for a specific plant","I made a purchase","Checking out deals"].map(opt => (
                  <label key={opt} className="d-flex align-items-center gap-2 mb-2 feedback-radio-label">
                    <input type="radio" name="visited" value={opt} checked={visited===opt} onChange={() => setVisited(opt)}
                      className="feedback-radio-input" />
                    {opt}
                  </label>
                ))}
              </div>

              <div className="form-group">
                <label className="pn-label d-block">Anything you'd like to share? <span className="text-sage-gn">*</span></label>
                <textarea className="pn-input" rows={4} value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="What worked? What could be better?" />
              </div>

              <div className="form-group">
                <label className="pn-label d-block">Would you recommend PlantNature to a friend? <span className="text-sage-gn">*</span></label>
                <div className="pill-group d-flex flex-wrap mt-2">
                  {["Definitely!","Probably","Not sure","Probably not"].map(opt => (
                    <button key={opt} type="button" className={`pill ${recommend===opt ? "on" : ""}`} onClick={() => setRecommend(opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {!canSubmit && (
                <p className="mb-3 feedback-hint-text">
                  Please answer all questions before submitting.
                </p>
              )}

              <button type="submit" className="btn-sage d-inline-block w-100 feedback-submit-btn" disabled={!canSubmit}>
                Send My Feedback 🌿
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
