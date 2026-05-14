import { CheckCircle2, ChevronLeft, Share2, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhoneTop from "../components/PhoneTop";
import benefits from "../data/benefits";
import { applyBenefit, hasAppliedBenefit, getFavoriteIds, toggleFavoriteId } from "../utils/storage";

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useMemo(() => benefits.find((benefit) => benefit.id === id) || benefits[0], [id]);
  const [summary, setSummary] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(getFavoriteIds());
  const [applied, setApplied] = useState(hasAppliedBenefit(item.id));
  const [showApplied, setShowApplied] = useState(false);
  const isFavorite = favoriteIds.includes(item.id);

  return (
    <main className="screen" style={{ paddingBottom: 150 }}>
      <PhoneTop />
      <div className="topbar">
        <button className="icon-button" onClick={() => navigate(-1)} type="button">
          <ChevronLeft size={26} />
        </button>
        <h1 className="topbar-title">혜택 상세</h1>
        <button
          onClick={() => setSummary((value) => !value)}
          style={{
            justifySelf: "end",
            width: 60,
            height: 34,
            border: 0,
            borderRadius: 999,
            background: "#5b8cff",
            color: "#fff",
            fontSize: 10,
            fontWeight: 900,
          }}
          type="button"
        >
          {summary ? "요약" : "상세"}
        </button>
      </div>

      <article className="detail-card">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h2 className="detail-title">{item.title}</h2>
            <p className="detail-subtitle">{item.desc}</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className={`star-button ${isFavorite ? "active" : ""}`} onClick={() => setFavoriteIds(toggleFavoriteId(item.id))} type="button">
              <Star fill={isFavorite ? "currentColor" : "none"} size={24} />
            </button>
            <button className="star-button" type="button">
              <Share2 size={23} />
            </button>
          </div>
        </div>

        <span className={`badge ${item.status}`}>{item.deadline}</span>
        <div className="tag-row">
          {item.tags.map((tag) => (
            <span className="small-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <p className="benefit-date-label">신청 기간</p>
        <p className="benefit-date" style={{ fontSize: 12 }}>
          {item.date}
        </p>
        <div className="divider" />

        {summary ? (
          <>
            <h3 className="detail-section-title">지원내용</h3>
            <p className="detail-copy">{item.support}</p>
            <h3 className="detail-section-title" style={{ marginTop: 18 }}>
              지원 규모(명)
            </h3>
            <p className="detail-copy">270명 선착순</p>
            <h3 className="detail-section-title" style={{ marginTop: 18 }}>
              신청자격
            </h3>
            <p className="detail-copy">{item.qualification.join("\n")}</p>
          </>
        ) : (
          <>
            <h3 className="detail-section-title">정책번호</h3>
            <p className="detail-copy">{item.policyNo}</p>
            <h3 className="detail-section-title" style={{ marginTop: 18 }}>
              정책분야
            </h3>
            <p className="detail-copy">{item.agency}</p>
            <h3 className="detail-section-title" style={{ marginTop: 18 }}>
              지원내용
            </h3>
            <p className="detail-copy">{item.support}</p>
            <p className="detail-copy" style={{ marginTop: 12 }}>
              {item.detail}
            </p>
            <h3 className="detail-section-title" style={{ marginTop: 18 }}>
              사업 운영 기간
            </h3>
            <p className="detail-copy">2026년 1월 1일 - 2026년 12월 31일</p>
          </>
        )}
      </article>

      <div className="detail-fixed-action">
        <button
          className={applied ? "primary-button" : "mint-button"}
          onClick={() => {
            applyBenefit(item.id);
            setApplied(true);
            setShowApplied(true);
          }}
          type="button"
        >
          {applied ? "신청 완료" : "신청하기"}
          {applied ? <CheckCircle2 size={14} style={{ verticalAlign: "middle", marginLeft: 4 }} /> : null}
        </button>
      </div>

      {showApplied && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 className="modal-title">
              신청이 완료되었어요
              <br />
              마감 알림도 함께 등록했어요.
            </h2>
            <p className="modal-text">{item.title} 신청 내역은 기록과 캘린더에서 확인할 수 있습니다.</p>
            <div className="modal-actions" style={{ gridTemplateColumns: "1fr" }}>
              <button onClick={() => setShowApplied(false)} type="button">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
