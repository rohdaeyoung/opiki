import { ChevronLeft, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneTop from "../components/PhoneTop";
import { makeAiReply } from "../utils/recommendation";
import { getGov24Data, getProfile } from "../utils/storage";

export default function AI() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const profile = getProfile();
  const gov24Data = getGov24Data();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: gov24Data.connected
        ? "정부24에서 확인한 서류와 프로필을 함께 보고 있어요.\n궁금한 혜택이나 필요한 서류를 물어보세요."
        : "프로필 기반으로 혜택을 추천해드릴게요.\n정부24 연동을 하면 필요한 서류까지 함께 확인할 수 있어요.",
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendQuestion = () => {
    if (!question.trim()) return;

    const currentQuestion = question.trim();
    setQuestion("");
    setMessages((prev) => [...prev, { role: "user", text: currentQuestion }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: makeAiReply(currentQuestion, profile, gov24Data),
        },
      ]);
    }, 350);
  };

  return (
    <main
      style={{
        width: "100%",
        height: "100dvh",
        margin: "0 auto",
        background: "#f6f8fc",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <PhoneTop />
      <div className="topbar" style={{ padding: "0 18px" }}>
        <button className="icon-button" onClick={() => navigate("/")} type="button">
          <ChevronLeft size={26} />
        </button>
        <h1 className="topbar-title">AI 추천 상담</h1>
        <span />
      </div>

      <section
        style={{
          margin: "8px 18px 0",
          padding: "12px 14px",
          borderRadius: 10,
          background: gov24Data.connected ? "#d8f8ef" : "#fff",
          border: "1px solid #e1e7f1",
          fontSize: 11,
          fontWeight: 900,
          color: "#1f2a44",
        }}
      >
        {gov24Data.connected ? "정부24 연동 완료 · 서류 기반 추천 중" : "정부24 미연동 · 프로필 기반 추천 중"}
      </section>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px 16px 96px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {messages.map((msg, index) => (
          <div key={`${msg.role}-${index}`} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div
              style={{
                maxWidth: "82%",
                padding: "13px 15px",
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: msg.role === "user" ? "#5b8cff" : "#fff",
                color: msg.role === "user" ? "#fff" : "#1f2a44",
                fontSize: 13,
                lineHeight: 1.55,
                whiteSpace: "pre-line",
                fontWeight: 800,
                boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          padding: "12px 16px calc(18px + env(safe-area-inset-bottom))",
          background: "#f6f8fc",
          borderTop: "1px solid #e6ebf3",
          display: "flex",
          gap: 10,
        }}
      >
        <input
          className="input"
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendQuestion();
          }}
          placeholder="예: 나한테 맞는 장학금 있어?"
          style={{ flex: 1, height: 46, borderRadius: 12 }}
          value={question}
        />
        <button
          onClick={sendQuestion}
          style={{
            width: 48,
            height: 46,
            border: 0,
            borderRadius: 12,
            background: "linear-gradient(135deg,#5b8cff,#63e6be)",
            color: "#fff",
            display: "grid",
            placeItems: "center",
          }}
          type="button"
        >
          <SendHorizontal size={21} />
        </button>
      </div>
    </main>
  );
}
