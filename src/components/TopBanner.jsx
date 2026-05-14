import logo from "../assets/logo.png";

function TopBanner() {

  return (
    <div
      style={{
        margin: "20px",
        padding: "28px",
        borderRadius: "32px",
        background:
          "linear-gradient(135deg,#5B8CFF,#6EE7C8)",
        position: "relative",
        overflow: "hidden",
      }}
    >

      <h2
        style={{
          color: "#fff",
          fontSize: "34px",
          fontWeight: "800",
          lineHeight: "1.35",
        }}
      >
        당신의 기회를
        <br />
        대신 발견해드려요
      </h2>

      <p
        style={{
          marginTop: "14px",
          color: "#EEF4FF",
          fontSize: "16px",
          lineHeight: "1.6",
        }}
      >
        맞춤 혜택을 비교하고
        <br />
        빠르게 신청까지!
      </p>

      <img
        src={logo}
        alt="logo"
        style={{
          width: "90px",
          position: "absolute",
          right: "24px",
          bottom: "28px",
          opacity: "0.95",
        }}
      />

    </div>
  );
}

export default TopBanner;