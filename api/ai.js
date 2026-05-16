// Vercel Serverless Function: POST /api/ai
// 동일 코드를 로컬 dev (npm run server) 와 프로덕션 (Vercel) 양쪽에서 재사용
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  // CORS (Capacitor iOS WebView 포함 모든 출처 허용)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "POST 만 허용됩니다." });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        reply: "서버에 OPENAI_API_KEY 가 설정되지 않았어요. Vercel 환경변수를 확인해주세요.",
      });
    }

    const { question, profile = {}, history = [], gov24 = {} } = req.body || {};

    if (!question || typeof question !== "string") {
      return res.status(400).json({ reply: "질문이 비어있어요." });
    }

    const systemPrompt = `너는 대한민국 청년 정책/혜택을 추천하는 AI 상담사 "Opiki" 다.
- 항상 한국어로, 친근하고 짧게 답한다.
- 사용자에게 도움이 될 만한 구체적인 정책명/지원 내용/신청 기관을 함께 알려준다.
- 모르는 정책은 추측하지 말고 "정확한 정보는 정부24/청년정책 사이트 확인"이라고 안내한다.
- 답변은 4~6줄, 필요하면 번호 목록을 사용한다.`;

    const userContext = `사용자 프로필:
- 이름: ${profile?.name || "-"}
- 닉네임: ${profile?.nickname || "-"}
- 나이: ${profile?.age || "-"}
- 지역: ${profile?.region || "-"}
- 소득분위: ${profile?.income || "-"}
- 학교: ${profile?.school || "-"}
- 전공: ${profile?.major || "-"}
- 학력: ${profile?.education || "-"}
- 취업상태: ${profile?.job || "-"}
정부24 연동: ${gov24?.connected ? "연동됨" : "미연동"}
관심 분야: ${(gov24?.interests || []).join(", ") || "-"}`;

    const trimmedHistory = Array.isArray(history) ? history.slice(-8) : [];
    const historyMessages = trimmedHistory
      .filter((m) => m && (m.role === "user" || m.role === "ai") && m.text)
      .map((m) => ({
        role: m.role === "ai" ? "assistant" : "user",
        content: String(m.text),
      }));

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "system", content: userContext },
        ...historyMessages,
        { role: "user", content: question },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || "잠시 후 다시 시도해주세요.";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("[/api/ai] error:", error?.message || error);
    const status = error?.status || 500;
    return res.status(status).json({
      reply:
        status === 401
          ? "OpenAI 인증 실패: API 키를 확인해주세요."
          : status === 429
            ? "OpenAI 사용량 한도에 걸렸어요. 잠시 후 다시 시도해주세요."
            : "AI 응답을 가져오지 못했어요.",
    });
  }
}
