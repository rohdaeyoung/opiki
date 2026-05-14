function History() {

  const histories = [

    {
      title: "청년 월세 지원",
      date: "2026.05.14",
      desc:
        "AI가 회원님의 소득과 지역을 기반으로 추천했어요.",
    },

    {
      title: "청년 도약 계좌",
      date: "2026.05.13",
      desc:
        "저축 지원 정책으로 추천된 혜택입니다.",
    },

    {
      title: "서울 청년 교통비 지원",
      date: "2026.05.12",
      desc:
        "거주 지역 기반으로 추천된 정책입니다.",
    },

  ];

  return (

    <div
      style={{
        width: "100%",
        minHeight: "100dvh",

        margin: "0 auto",

        background: "#F5F6FB",

        padding:
          "28px 20px 120px",

        boxSizing: "border-box",
      }}
    >

      <h1
        style={{
          fontSize: "44px",

          fontWeight: "900",

          color: "#1F2A44",

          marginBottom: "10px",
        }}
      >
        기록
      </h1>

      <p
        style={{
          color: "#A0A7C0",

          fontSize: "18px",

          marginBottom: "28px",

          fontWeight: "600",
        }}
      >
        AI 추천 및 저장 기록
      </p>

      <div
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "18px",
        }}
      >

        {histories.map(
          (item, index) => (

            <div
              key={index}
              style={{
                background: "white",

                borderRadius: "28px",

                padding: "22px",

                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >

              <div
                style={{
                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems: "center",

                  marginBottom: "12px",
                }}
              >

                <h2
                  style={{
                    fontSize: "22px",

                    fontWeight: "800",

                    color: "#1F2A44",
                  }}
                >
                  {item.title}
                </h2>

                <div
                  style={{
                    background:
                      "linear-gradient(135deg,#5B8CFF,#63E6BE)",

                    color: "white",

                    padding:
                      "6px 12px",

                    borderRadius: "999px",

                    fontSize: "12px",

                    fontWeight: "700",
                  }}
                >
                  AI 추천
                </div>

              </div>

              <p
                style={{
                  color: "#7B8199",

                  fontSize: "14px",

                  marginBottom: "14px",

                  lineHeight: "1.5",
                }}
              >
                {item.desc}
              </p>

              <div
                style={{
                  fontSize: "13px",

                  color: "#B0B7CC",

                  fontWeight: "600",
                }}
              >
                {item.date}
              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}

export default History;
