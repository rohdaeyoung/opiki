function Notification() {

  return (

    <div
      style={{
        width: "100%",
        maxWidth: "430px",

        minHeight: "100vh",

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

          marginBottom: "12px",
        }}
      >
        알림
      </h1>

      <p
        style={{
          color: "#A0A7C0",

          fontSize: "18px",

          fontWeight: "600",

          marginBottom: "24px",
        }}
      >
        최근 정책 알림
      </p>

      <div
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "16px",
        }}
      >

        <div
          style={{
            background: "white",

            padding: "22px",

            borderRadius: "24px",

            boxShadow:
              "0 8px 24px rgba(0,0,0,0.05)",
          }}
        >

          <h3
            style={{
              color: "#1F2A44",

              fontSize: "18px",

              fontWeight: "800",

              marginBottom: "10px",
            }}
          >
            청년 월세 지원 신청 시작
          </h3>

          <p
            style={{
              color: "#7B8199",

              lineHeight: "1.5",

              fontSize: "14px",
            }}
          >
            회원님의 조건에 맞는 정책 신청이 시작되었어요.
          </p>

        </div>

      </div>

    </div>

  );

}

export default Notification;