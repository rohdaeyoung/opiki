export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({
    ok: true,
    hasKey: !!process.env.OPENAI_API_KEY,
  });
}
