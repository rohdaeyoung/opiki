// API base URL 결정 로직
// 1) VITE_API_BASE_URL 환경변수가 있으면 그것 (외부 서버 명시 지정용)
// 2) 프로덕션 (배포된 웹) → 같은 도메인의 /api (Vercel serverless function)
// 3) 로컬 개발 (vite dev) → localhost:5000 (npm run server)
// 4) Capacitor iOS WebView → http://localhost:5000 또는 외부 URL
const ENV_BASE = import.meta.env?.VITE_API_BASE_URL?.trim();
const IS_PROD = import.meta.env?.PROD === true;

function defaultBase() {
  if (typeof window === "undefined") return "";
  const { protocol, hostname, origin } = window.location;

  // Capacitor iOS WebView (네이티브 앱)
  if (protocol === "capacitor:" || protocol === "opiki:") {
    return "http://localhost:5000";
  }

  // 프로덕션 빌드 (Vercel 등) → 같은 도메인의 /api
  if (IS_PROD) {
    return `${origin}/api`;
  }

  // 로컬 개발: vite dev → :5173 으로 떠있고, server는 :5000
  return `${protocol}//${hostname || "localhost"}:5000`;
}

export const API_BASE_URL = ENV_BASE || defaultBase();
export const IS_PROD_BUILD = IS_PROD;

// 엔드포인트 경로 — 프로덕션은 /ai 가 아니라 API_BASE_URL 가 이미 /api 까지 포함하므로 /ai 만 붙이면 됨
const AI_PATH = "/ai";
const HEALTH_PATH = "/health";

export async function pingServer() {
  try {
    const res = await fetch(`${API_BASE_URL}${HEALTH_PATH}`);
    if (!res.ok) return { ok: false };
    return await res.json();
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}

export async function askAi({ question, profile, history = [], gov24 = {} }) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${AI_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, profile, history, gov24 }),
    });
  } catch (networkError) {
    throw new Error(`서버에 연결할 수 없어요. (${networkError.message})`);
  }

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* JSON 아닌 응답 */
  }

  if (!res.ok) {
    throw new Error(data.reply || `AI 응답 실패 (${res.status})`);
  }
  return data.reply || "";
}
