export function getProfile() {
  return (
    JSON.parse(localStorage.getItem("profile") || "null") || {
      nickname: "성결 멋사",
      name: "성결 멋사 님",
      age: "21세",
      region: "경기도 안양시",
      income: "-",
      education: "대학교 재학",
      school: "성결대학교",
      major: "공학계열",
      job: "미취업",
      special: "-",
      extra: "-",
    }
  );
}

export function getGov24Data() {
  return (
    JSON.parse(localStorage.getItem("gov24Data") || "null") || {
      connected: false,
      consentAt: "",
      interests: [],
      documents: [],
      missingDocuments: [],
    }
  );
}

export function connectGov24(profile) {
  const data = {
    connected: true,
    consentAt: new Date().toISOString(),
    interests: ["장학금", "생활비", "취업·창업", "교육"],
    documents: [
      {
        id: "resident",
        title: "주민등록등본",
        status: profile.region ? "확인 완료" : "확인 필요",
        usedFor: "거주지역 확인",
      },
      {
        id: "enrollment",
        title: "재학증명서",
        status: profile.education?.includes("재학") ? "확인 완료" : "확인 필요",
        usedFor: "장학금 및 교육 혜택",
      },
      {
        id: "income",
        title: "소득분위 확인서",
        status: profile.income && profile.income !== "-" ? "확인 완료" : "추가 필요",
        usedFor: "장학금, 생활비 지원",
      },
      {
        id: "employment",
        title: "고용보험 자격 이력",
        status: profile.job === "미취업" ? "확인 완료" : "확인 필요",
        usedFor: "취업·창업 혜택",
      },
    ],
    missingDocuments: ["소득분위 확인서"],
  };

  localStorage.setItem("gov24Data", JSON.stringify(data));
  return data;
}

export function isLoggedIn() {
  return localStorage.getItem("isLogin") === "true";
}

export function getFavoriteIds() {
  return JSON.parse(localStorage.getItem("favoriteIds") || "[]");
}

export function setFavoriteIds(ids) {
  localStorage.setItem("favoriteIds", JSON.stringify(ids));
}

export function toggleFavoriteId(id) {
  const ids = getFavoriteIds();
  const next = ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
  setFavoriteIds(next);
  return next;
}

export function getAppliedBenefitIds() {
  return JSON.parse(localStorage.getItem("appliedBenefitIds") || "[]");
}

export function applyBenefit(id) {
  const ids = getAppliedBenefitIds();
  const next = ids.includes(id) ? ids : [...ids, id];
  localStorage.setItem("appliedBenefitIds", JSON.stringify(next));
  return next;
}

export function hasAppliedBenefit(id) {
  return getAppliedBenefitIds().includes(id);
}
