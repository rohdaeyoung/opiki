import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AI() {

  const navigate = useNavigate();

  const messagesEndRef = useRef(null);

  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        role: "ai",
        text:
          "안녕하세요 😊\n개인정보 기반으로 정책을 추천해드려요.",
      },
    ]);

  // 자동 스크롤
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  const sendQuestion = async () => {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentQuestion = question;

    setQuestion("");

    setLoading(true);

    try {

      const profile =
        JSON.parse(
          localStorage.getItem("profile")
        ) || {};

      const response = await fetch(
        "http://127.0.0.1:5000/ai",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            question:
              currentQuestion,

            profile,
          }),
        }
      );

      const data =
        await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.reply ||
            "답변을 생성하지 못했습니다.",
        },
      ]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "서버 연결 오류가 발생했습니다.",
        },
      ]);

    }

    setLoading(false);

  };

  return (

    <div
      style={{
        width: "100%",
        maxWidth: "430px",

        height: "100vh",

        margin: "0 auto",

        background: "#F5F6FB",

        display: "flex",

        flexDirection: "column",

        position: "relative",

        overflow: "hidden",
      }}
    >

      {/* 헤더 */}

      <div
        style={{
          height: "82px",

          display: "flex",

          alignItems: "center",

          gap: "14px",

          padding: "0 20px",

          borderBottom:
            "1px solid #ECECEC",

          background: "#F5F6FB",

          flexShrink: 0,
        }}
      >

        <button
          onClick={() => navigate("/")}
          style={{
            border: "none",

            background: "none",

            fontSize: "28px",

            color: "#1F2A44",

            cursor: "pointer",
          }}
        >
          ←
        </button>

        <h1
          style={{
            fontSize: "28px",

            fontWeight: "900",

            color: "#1F2A44",
          }}
        >
          AI 정책 상담
        </h1>

      </div>

      {/* 채팅 영역 */}

      <div
        style={{
          flex: 1,

          overflowY: "auto",

          padding:
            "20px 16px 120px",

          display: "flex",

          flexDirection: "column",

          gap: "16px",
        }}
      >

        {messages.map((msg, index) => (

          <div
            key={index}
            style={{
              display: "flex",

              justifyContent:
                msg.role === "user"
                  ? "flex-end"
                  : "flex-start",
            }}
          >

            <div
              style={{
                maxWidth: "78%",

                padding:
                  "14px 16px",

                borderRadius: "22px",

                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg,#5B8CFF,#63E6BE)"
                    : "white",

                color:
                  msg.role === "user"
                    ? "white"
                    : "#1F2A44",

                fontSize: "15px",

                lineHeight: "1.5",

                whiteSpace: "pre-line",

                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              {msg.text}
            </div>

          </div>

        ))}

        {loading && (

          <div
            style={{
              display: "flex",

              justifyContent:
                "flex-start",
            }}
          >

            <div
              style={{
                background: "white",

                padding:
                  "14px 16px",

                borderRadius: "22px",

                color: "#7B8199",

                fontSize: "14px",

                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              정책을 분석중입니다...
            </div>

          </div>

        )}

        <div ref={messagesEndRef} />

      </div>

      {/* 입력창 */}

      <div
        style={{
          position: "absolute",

          bottom: "0",

          left: "0",

          width: "100%",

          padding: "14px 16px",

          background: "#F5F6FB",

          borderTop:
            "1px solid #ECECEC",

          display: "flex",

          gap: "12px",

          boxSizing: "border-box",
        }}
      >

        <input
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendQuestion();
            }
          }}
          placeholder="질문을 입력하세요"
          style={{
            flex: 1,

            height: "54px",

            border: "none",

            borderRadius: "18px",

            padding: "0 18px",

            background: "white",

            fontSize: "15px",

            outline: "none",
          }}
        />

        <button
          onClick={sendQuestion}
          style={{
            width: "58px",

            height: "54px",

            border: "none",

            borderRadius: "18px",

            background:
              "linear-gradient(135deg,#5B8CFF,#63E6BE)",

            color: "white",

            fontSize: "22px",

            cursor: "pointer",

            flexShrink: 0,
          }}
        >
          ↑
        </button>

      </div>

    </div>

  );

}

export default AI;