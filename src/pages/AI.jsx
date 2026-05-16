import { ChevronLeft, ChevronRight, SendHorizontal, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneTop from "../components/PhoneTop";
import { getRecommendedBenefits, makeAiReply } from "../utils/recommendation";
import {
  clearChatHistory,
  getChatHistory,
  getGov24Data,
  getProfile,
  saveChatHistory,
} from "../utils/storage";
import { API_BASE_URL, askAi, pingServer } from "../utils/api";

const BOTTOM_NAV_HEIGHT = 70;
const INPUT_BAR_HEIGHT = 66;

const SUGGESTED_QUESTIONS = [
  "내가 받을 수 있는 지원금 알려줘",
  "월세 지원 받을 수 있어?",
  "장학금 추천해줘",
  "취업 지원 혜택은?",
  "필요한 서류 뭐야?",
];

export default function AI() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const profile = getProfile();
  const gov24Data = getGov24Data();
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);
  const [serverStatus, setServerStatus] = useState({ ok: null, hasKey: null });

  const greeting = gov24Data.connected
    ? "정부24에서 확인한 서류와 프로필을 함께 보고 있어요.\n궁금한 혜택이나 필요한 서류를 물어보세요."
    : "프로필 기반으로 혜택을 추천해드릴게요.\n정부24 연동을 하면 필요한 서류까지 함께 확인할 수 있어요.";

  const [messages, setMessages] = useState(() => {
    const saved = getChatHistory();
    if (saved.length > 0) return saved;
    return [{ role: "ai", type: "text", text: greeting }];
  });

  // 첫 진입 시 (저장된 대화가 없을 때) 추천 카드를 인사 옆에 자동 노출
  const initialRecommendations = useMemo(
    () => getRecommendedBenefits(profile, gov24Data, "").filter((b) => b.score > 0).slice(0, 3),
    [],
  );
  const showSuggestionChips =
    messages.length === 1 && messages[0].type === "text"; // 인사 메시지만 있을 때

  useEffect(() => {
    pingServer().then((s) => setServerStatus(s));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    saveChatHistory(messages);
  }, [messages]);

  const sendQuestionWith = async (raw) => {
    if (!raw?.trim() || sending) return;
    const currentQuestion = raw.trim();
    setQuestion("");
    const nextMessages = [...messages, { role: "user", type: "text", text: currentQuestion }];
    setMessages(nextMessages);
    setSending(true);

    const recommended = getRecommendedBenefits(profile, gov24Data, currentQuestion).filter((b) => b.score > 0);

    // 키 없으면 OpenAI 호출 스킵 → 로컬 추천만 사용 (깔끔)
    if (useLocalOnly) {
      const localReply = makeAiReply(currentQuestion, profile, gov24Data);
      setMessages((prev) => {
        const added = [...prev, { role: "ai", type: "text", text: localReply }];
        if (recommended.length > 0) {
          added.push({ role: "ai", type: "benefits", items: recommended.slice(0, 3) });
        }
        return added;
      });
      setSending(false);
      return;
    }

    try {
      const aiReply = await askAi({
        question: currentQuestion,
        profile,
        gov24: gov24Data,
        history: nextMessages.filter((m) => m.type !== "benefits"),
      });
      const finalReply = aiReply?.trim() || makeAiReply(currentQuestion, profile, gov24Data);
      setMessages((prev) => {
        const added = [...prev, { role: "ai", type: "text", text: finalReply }];
        if (recommended.length > 0) {
          added.push({ role: "ai", type: "benefits", items: recommended.slice(0, 3) });
        }
        return added;
      });
    } catch (error) {
      // 네트워크/서버 오류여도 사용자에게 ⚠️ 안 보이게, 그냥 로컬 추천으로 응답
      const fallback = makeAiReply(currentQuestion, profile, gov24Data);
      setMessages((prev) => {
        const added = [...prev, { role: "ai", type: "text", text: fallback }];
        if (recommended.length > 0) {
          added.push({ role: "ai", type: "benefits", items: recommended.slice(0, 3) });
        }
        return added;
      });
    } finally {
      setSending(false);
    }
  };

  const sendQuestion = () => sendQuestionWith(question);

  const resetChat = () => {
    clearChatHistory();
    setMessages([{ role: "ai", type: "text", text: greeting }]);
  };

  const statusBanner = (() => {
    if (serverStatus.ok === null) return null;
    if (serverStatus.ok && serverStatus.hasKey) {
      return { bg: "#e8f6ee", color: "#15803d", text: "● AI 추천 · 실시간 GPT 응답" };
    }
    // 키가 없거나 서버 미가동 → 로컬 추천 모드 (긍정적 톤)
    return { bg: "#eef4ff", color: "#1d4ed8", text: "● AI 추천 모드 · 프로필 기반 추천" };
  })();
  // 키 없을 땐 askAi 호출 자체를 스킵해서 ⚠️ 에러 메시지가 채팅에 안 뜨도록
  const useLocalOnly = serverStatus.ok === false || serverStatus.hasKey === false;

  return (
    <main
      style={{
        position: "absolute",
        inset: 0,
        background: "#f6f8fc",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <PhoneTop />

      <div className="topbar" style={{ padding: "0 18px", flexShrink: 0, height: 44 }}>
        <button className="icon-button" onClick={() => navigate("/")} type="button">
          <ChevronLeft size={26} />
        </button>
        <h1 className="topbar-title">AI 추천 상담</h1>
        <button
          className="icon-button"
          onClick={resetChat}
          type="button"
          aria-label="대화 초기화"
          title="대화 초기화"
          style={{ justifySelf: "end" }}
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* 상태 배지 한 줄 (정부24 + 서버) */}
      <div
        style={{
          margin: "4px 18px 0",
          display: "flex",
          gap: 6,
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            padding: "5px 10px",
            borderRadius: 999,
            background: gov24Data.connected ? "#d8f8ef" : "#eef1f7",
            color: gov24Data.connected ? "#0f766e" : "#5b6478",
            fontSize: 10,
            fontWeight: 900,
          }}
        >
          {gov24Data.connected ? "● 정부24 연동" : "● 정부24 미연동"}
        </span>
        {statusBanner && (
          <span
            style={{
              padding: "5px 10px",
              borderRadius: 999,
              background: statusBanner.bg,
              color: statusBanner.color,
              fontSize: 10,
              fontWeight: 900,
            }}
          >
            {statusBanner.text}
          </span>
        )}
      </div>

      {/* 채팅 영역 */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          padding: `12px 16px calc(${INPUT_BAR_HEIGHT}px + env(safe-area-inset-bottom))`,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {messages.map((msg, index) => {
          if (msg.type === "benefits") {
            return (
              <BenefitCarousel
                key={`benefits-${index}`}
                items={msg.items}
                onSelect={(id) => navigate(`/detail/${id}`)}
              />
            );
          }
          return (
            <div
              key={`${msg.role}-${index}`}
              style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
            >
              <div
                style={{
                  maxWidth: "82%",
                  padding: "12px 14px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.role === "user" ? "#5b8cff" : "#fff",
                  color: msg.role === "user" ? "#fff" : "#1f2a44",
                  fontSize: 13,
                  lineHeight: 1.55,
                  whiteSpace: "pre-line",
                  fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* 첫 진입 화면을 풍성하게: 초기 추천 카드 + 추천 질문 칩 */}
        {showSuggestionChips && initialRecommendations.length > 0 && (
          <BenefitCarousel
            items={initialRecommendations}
            onSelect={(id) => navigate(`/detail/${id}`)}
            title="나에게 맞을 수 있는 지원금"
          />
        )}
        {showSuggestionChips && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "#7b8199", marginLeft: 4 }}>
              이렇게 물어보세요
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendQuestionWith(q)}
                  style={{
                    border: "1px solid #d6dded",
                    background: "#fff",
                    color: "#1f2a44",
                    padding: "8px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {sending && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "16px 16px 16px 4px",
                background: "#fff",
                color: "#8f9ab1",
                fontSize: 13,
                fontWeight: 800,
                boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
              }}
            >
              답변을 작성하고 있어요...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 바: BottomNav 바로 위에 딱 붙게 */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
          padding: "10px 16px",
          background: "#f6f8fc",
          borderTop: "1px solid #e6ebf3",
          display: "flex",
          gap: 10,
          zIndex: 60,
        }}
      >
        <input
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendQuestion();
          }}
          placeholder="예: 나한테 맞는 장학금 있어?"
          style={{
            flex: 1,
            height: 46,
            borderRadius: 12,
            border: "1px solid #e1e7f1",
            background: "#fff",
            padding: "0 14px",
            fontSize: 14,
            outline: "none",
          }}
          value={question}
          disabled={sending}
        />
        <button
          onClick={sendQuestion}
          disabled={sending || !question.trim()}
          style={{
            width: 48,
            height: 46,
            border: 0,
            borderRadius: 12,
            background: "linear-gradient(135deg,#5b8cff,#63e6be)",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            opacity: sending || !question.trim() ? 0.5 : 1,
          }}
          type="button"
        >
          <SendHorizontal size={21} />
        </button>
      </div>
    </main>
  );
}

function BenefitCarousel({ items, onSelect, title = "지금 받을 수 있는 지원금 추천" }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "#5b8cff",
          fontSize: 11,
          fontWeight: 900,
          marginLeft: 4,
        }}
      >
        <Sparkles size={14} />
        {title}
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          margin: "0 -16px",
          padding: "0 16px 4px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((b) => (
          <button
            key={b.id}
            onClick={() => onSelect(b.id)}
            type="button"
            style={{
              flex: "0 0 220px",
              textAlign: "left",
              padding: 14,
              borderRadius: 16,
              border: 0,
              background: "#fff",
              boxShadow: "0 6px 16px rgba(15,23,42,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              className={`badge ${b.status}`}
              style={{ alignSelf: "flex-start", fontSize: 10, padding: "3px 8px", borderRadius: 999 }}
            >
              {b.deadline}
            </span>
            <h4 style={{ margin: 0, fontSize: 14, fontWeight: 900, color: "#1f2a44", lineHeight: 1.3 }}>{b.title}</h4>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#7b8199", lineHeight: 1.4 }}>{b.desc}</p>
            <p style={{ margin: "4px 0 0", fontSize: 10, fontWeight: 800, color: "#a8b2c8" }}>신청 기간 {b.date}</p>
            <div
              style={{
                marginTop: 6,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                color: "#5b8cff",
                fontSize: 11,
                fontWeight: 900,
              }}
            >
              자세히 보기 <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
