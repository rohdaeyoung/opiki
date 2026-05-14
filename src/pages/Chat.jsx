import { useState } from "react";
import BottomNav from "../components/BottomNav";

function Chat() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `${user.name}님에게 맞는 혜택을 알려드릴게요 😊`,
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {

    if (!input) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    let aiReply = "";

    if (input.includes("주거")) {

      aiReply =
        "청년 월세 지원과 전세 지원 혜택을 추천드려요!";

    } else if (input.includes("장학")) {

      aiReply =
        "대학생 장학금 및 생활비 지원 혜택이 있어요!";

    } else if (input.includes("취업")) {

      aiReply =
        "취업 준비 지원금과 면접 지원 혜택을 추천드려요!";

    } else {

      aiReply =
        "현재 사용자 정보 기준 맞춤 혜택을 분석 중이에요!";

    }

    const aiMessage = {
      role: "ai",
      text: aiReply,
    };

    setMessages([
      ...messages,
      userMessage,
      aiMessage,
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#DDE3F3] flex justify-center">

      <div className="w-full max-w-sm min-h-screen bg-[#F7F9FC] p-5 pb-24 flex flex-col">

        {/* 상단 */}
        <div className="mt-10">

          <h1 className="text-3xl font-bold text-[#1F2A44]">

            AI 챗봇

          </h1>

          <p className="text-[#5B8CFF] mt-2">

            혜택을 AI에게 물어보세요

          </p>

        </div>

        {/* 채팅 */}
        <div className="flex-1 mt-8 space-y-4 overflow-y-auto">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`p-4 rounded-3xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-[#5B8CFF] text-white ml-auto"
                  : "bg-white shadow-md"
              }`}
            >

              {msg.text}

            </div>

          ))}

        </div>

        {/* 입력창 */}
        <div className="mt-4 flex gap-2">

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="메시지를 입력하세요"
            className="flex-1 p-4 rounded-2xl border"
          />

          <button
            onClick={handleSend}
            className="bg-[#5B8CFF] text-white px-5 rounded-2xl"
          >

            전송

          </button>

        </div>

        {/* 하단바 */}
        <BottomNav />

      </div>

    </div>
  );
}

export default Chat;