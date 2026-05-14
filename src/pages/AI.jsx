import { useState } from "react";

import {
  FiArrowLeft,
  FiSend,
} from "react-icons/fi";

import {
  useNavigate,
} from "react-router-dom";

function AI() {

  const navigate = useNavigate();

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        role: "ai",
        text:
          "안녕하세요 😊\n청년 지원사업, 월세 지원, 장학금 등을 물어보세요!",
      },
    ]);

  const [loading, setLoading] =
    useState(false);

  /* 질문 전송 */
  const sendQuestion =
    async () => {

      if (!question.trim()) return;

      /* 사용자 메시지 */
      const userMessage = {
        role: "user",
        text: question,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      setLoading(true);

      try {

        /* AI 서버 요청 */
        const response =
          await fetch(
            "http://localhost:8000/ai",
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                question,

                profile:
                  JSON.parse(
                    localStorage.getItem(
                      "profile"
                    )
                  ),

              }),

            }
          );

        const data =
          await response.json();

        /* AI 답변 추가 */
        setMessages((prev) => [

          ...prev,

          {
            role: "ai",
            text: data.answer,
          },

        ]);

      } catch (error) {

        console.log(error);

        setMessages((prev) => [

          ...prev,

          {
            role: "ai",
            text:
              "AI 응답 중 오류가 발생했습니다.",
          },

        ]);

      }

      setQuestion("");
      setLoading(false);

    };

  return (

    <div
      style={{
        minHeight: "100vh",
        maxWidth: "430px",
        margin: "0 auto",
        position: "relative",
        background: "#F5F6FB",
        paddingBottom: "120px",
      }}
    >

      {/* 상단 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",

          padding:
            "24px 20px 10px",
        }}
      >

        <FiArrowLeft
          size={26}
          color="#1F2A44"
          style={{
            cursor: "pointer",
          }}
          onClick={() =>
            navigate(-1)
          }
        />

        <h1
          style={{
            fontSize: "34px",
            fontWeight: "900",
            color: "#1F2A44",
          }}
        >
          AI 상담
        </h1>

      </div>

      {/* 채팅 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",

          padding: "20px",
        }}
      >

        {messages.map(
          (msg, index) => (

            <div
              key={index}

              style={{

                alignSelf:
                  msg.role === "user"
                    ? "flex-end"
                    : "flex-start",

                maxWidth: "80%",

                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg, #5B8CFF, #63E6BE)"
                    : "#FFFFFF",

                color:
                  msg.role === "user"
                    ? "#fff"
                    : "#1F2A44",

                padding:
                  "16px 18px",

                borderRadius:
                  "20px",

                fontSize: "15px",

                lineHeight: "1.5",

                whiteSpace:
                  "pre-line",

                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.05)",

              }}
            >

              {msg.text}

            </div>

          )
        )}

        {/* 로딩 */}
        {loading && (

          <div
            style={{

              background: "#fff",

              padding:
                "14px 18px",

              borderRadius:
                "18px",

              width: "fit-content",

              color: "#666",

            }}
          >

            AI가 답변 생성중...

          </div>

        )}

      </div>

      {/* 입력창 */}
        <div
        style={{

          position: "fixed",

          bottom: "0",

          left: "50%",

          transform:
            "translateX(-50%)",

          width: "100%",

          maxWidth: "430px",

          background: "#fff",

          padding: "14px 16px",

          display: "flex",

          gap: "12px",

          boxSizing: "border-box",

          boxShadow:
            "0 -4px 14px rgba(0,0,0,0.06)",

          borderTop:
            "1px solid #EEF1F6",

        }}
      >

        <input

          value={question}

          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }

          placeholder="질문을 입력하세요"

          style={{

            flex: 1,

            border: "none",

            outline: "none",

            background: "#F5F6FB",

            borderRadius: "16px",

            padding:
              "14px 16px",

            fontSize: "15px",

          }}
        />

        <button

          onClick={sendQuestion}

          style={{

            width: "52px",

            height: "52px",

            border: "none",

            borderRadius: "16px",

            background:
              "linear-gradient(135deg, #5B8CFF, #63E6BE)",

            color: "#fff",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            cursor: "pointer",

          }}
        >

          <FiSend size={22} />

        </button>

      </div>

    </div>

  );

}

export default AI;