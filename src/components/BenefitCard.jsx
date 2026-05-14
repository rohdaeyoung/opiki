import { Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyBenefit, hasAppliedBenefit, isLoggedIn } from "../utils/storage";

export default function BenefitCard({ item, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const [applied, setApplied] = useState(hasAppliedBenefit(item.id));

  const handleApply = (event) => {
    event.stopPropagation();

    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    applyBenefit(item.id);
    setApplied(true);
  };

  return (
    <div
      className={`benefit-card ${item.status === "orange" ? "orange-date" : ""}`}
      onClick={() => navigate(`/detail/${item.id}`)}
      role="button"
      tabIndex={0}
    >
      <span className={`badge ${item.status}`}>{item.deadline}</span>
      <span>
        <h3 className="benefit-title">{item.title}</h3>
        <p className="benefit-desc">{item.desc}</p>
        <p className="benefit-date-label">신청 기간</p>
        <p className="benefit-date">{item.date}</p>
      </span>
      <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
        <button
          className={`star-button ${isFavorite ? "active" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(item.id);
          }}
          type="button"
        >
          <Star size={21} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        <button
          onClick={handleApply}
          style={{
            minWidth: 42,
            height: 24,
            border: 0,
            borderRadius: 6,
            background: applied ? "#e9edf6" : "#65ddc6",
            color: applied ? "#8f9ab1" : "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 900,
          }}
          type="button"
        >
          {applied ? "완료" : "신청"}
        </button>
      </span>
    </div>
  );
}
