import benefits from "../data/benefits";

const keywordMap = [
  ["장학", ["장학금", "교육"]],
  ["학교", ["장학금", "교육"]],
  ["대학생", ["장학금", "교육"]],
  ["월세", ["주거", "생활비"]],
  ["주거", ["주거", "생활비"]],
  ["교통", ["생활비"]],
  ["취업", ["취업·창업"]],
  ["창업", ["취업·창업"]],
  ["교육", ["교육"]],
  ["서류", ["장학금", "생활비", "취업·창업", "교육"]],
];

function scoreBenefit(benefit, profile, gov24Data, question) {
  let score = 0;
  const source = `${question} ${profile.education || ""} ${profile.job || ""} ${profile.major || ""}`;

  keywordMap.forEach(([keyword, tags]) => {
    if (source.includes(keyword) && tags.some((tag) => benefit.tags.includes(tag))) {
      score += 4;
    }
  });

  if (profile.education?.includes("대학교") && benefit.tags.includes("장학금")) score += 3;
  if (profile.job === "미취업" && benefit.tags.includes("취업·창업")) score += 2;
  if (profile.region?.includes("안양") && benefit.tags.includes("생활비")) score += 1;
  if (gov24Data.connected && gov24Data.interests.some((tag) => benefit.tags.includes(tag))) score += 2;
  if (benefit.status === "closed") score -= 10;

  return score;
}

export function getRecommendedBenefits(profile, gov24Data, question = "") {
  return [...benefits]
    .map((benefit) => ({
      ...benefit,
      score: scoreBenefit(benefit, profile, gov24Data, question),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function makeAiReply(question, profile, gov24Data) {
  const recommended = getRecommendedBenefits(profile, gov24Data, question);
  const top = recommended[0];
  const docs = gov24Data.connected
    ? gov24Data.documents
        .filter((doc) => doc.status !== "확인 완료")
        .map((doc) => doc.title)
        .join(", ") || "현재 추가로 필요한 서류가 거의 없어요."
    : "정부24 연동을 하면 주민등록등본, 재학증명서, 소득분위 확인서 같은 필요 서류를 함께 확인할 수 있어요.";

  if (question.includes("서류")) {
    return `정부24 연동 기준으로 확인해볼게요.\n\n필요하거나 보완하면 좋은 서류는 ${docs} 입니다.\n\n이 서류가 준비되면 ${top.title} 같은 혜택 신청 가능성이 더 높아져요.`;
  }

  if (question.includes("왜") || question.includes("이유")) {
    return `${profile.nickname || "사용자"}님 정보와 정부24 확인 정보를 기준으로 보면 ${top.title}을 먼저 보는 게 좋아요.\n\n추천 이유\n1. ${profile.education || "학력 정보"} 조건과 잘 맞아요.\n2. 관심 분야 ${gov24Data.interests?.join(", ") || "혜택"}와 겹쳐요.\n3. 신청 기간이 ${top.date}라 지금 확인하기 좋아요.`;
  }

  return `${profile.nickname || "사용자"}님에게 지금 우선 추천할 혜택은 ${top.title}이에요.\n\n${top.support}\n\n함께 보면 좋은 혜택\n1. ${recommended[1]?.title || "청년 교통비 지원사업"}\n2. ${recommended[2]?.title || "국가근로장학금 2학기"}\n\n필요 서류: ${docs}`;
}
