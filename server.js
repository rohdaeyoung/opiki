import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

/* 테스트용 */
app.get("/", (req, res) => {
  res.send("서버 정상 실행중");
});

/* OpenAI */
const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
});

/* AI 요청 */
app.post("/ai", async (req, res) => {

  try {

    const {
      question,
      profile,
    } = req.body;

    const prompt = `
너는 청년 정책 추천 AI다.

질문:
${question}

사용자:
${JSON.stringify(profile)}
`;

    const completion =
      await openai.chat.completions.create({

        model: "gpt-3.5-turbo",

        messages: [

          {
            role: "system",
            content:
              "너는 청년 정책 추천 AI다.",
          },

          {
            role: "user",
            content: prompt,
          },

        ],

      });

    const answer =
      completion.choices[0]
        .message.content;

    res.json({
      answer,
    });

  } catch (error) {

    console.log("에러:");

    console.log(error);

    res.status(500).json({

      answer:
        "AI 응답 생성 실패",

    });

  }

});

/* 서버 실행 */
const PORT = 8000;

app.listen(PORT, () => {

  console.log(
    `AI 서버 실행중 ${PORT}`
  );

});