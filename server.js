import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/ai", async (req, res) => {

  try {

    const {
      question,
      profile,
    } = req.body;

    const prompt = `
사용자 정보:

이름: ${profile?.name || ""}
나이: ${profile?.age || ""}
지역: ${profile?.region || ""}
소득분위: ${profile?.income || ""}
학교: ${profile?.school || ""}

질문:
${question}

위 정보를 기반으로
대한민국 청년 정책을 추천해주세요.
`;

    const completion =
      await openai.chat.completions.create({

        model: "gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content:
              "너는 청년 정책 AI 상담사다.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

      });

    res.json({
      reply:
        completion.choices[0]
          .message.content,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      reply:
        "AI 응답 생성 실패",
    });

  }

});

app.listen(5000, () => {

  console.log(
    "AI 서버 실행중 5000"
  );

});