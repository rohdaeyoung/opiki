function Loading() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#5B8CFF,#6EE7C8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
      }}
    >

      {/* 원 */}
      <div
        style={{
          width: "110px",
          height: "110px",
          borderRadius: "50%",
          border:
            "10px solid rgba(255,255,255,0.3)",
          borderTop:
            "10px solid #fff",
          animation:
            "spin 1s linear infinite",
        }}
      />

      {/* 텍스트 */}
      <h1
        style={{
          marginTop: "34px",
          fontSize: "32px",
          fontWeight: "800",
        }}
      >
        AI 분석 중...
      </h1>

      <p
        style={{
          marginTop: "14px",
          fontSize: "16px",
          opacity: 0.9,
        }}
      >
        사용자 맞춤 혜택을
        찾고 있습니다
      </p>

      {/* 애니메이션 */}
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </div>

  );
}

export default Loading;