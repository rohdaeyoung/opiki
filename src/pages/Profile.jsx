import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

function Profile() {

  const navigate =
    useNavigate();

  const [profile, setProfile]
    = useState({});

  const [isConnecting,
    setIsConnecting]
      = useState(false);

  const [isConnected,
    setIsConnected]
      = useState(false);

  const [showConsent,
    setShowConsent]
      = useState(false);

  useEffect(() => {

    const savedProfile =
      JSON.parse(
        localStorage.getItem(
          "profile"
        )
      );

    if (savedProfile) {

      setProfile(savedProfile);

      if (
        savedProfile.govConnected
      ) {

        setIsConnected(true);

      }

    }

  }, []);

  const connectGov24 = () => {

    setShowConsent(false);

    setIsConnecting(true);

    setTimeout(() => {

      const updatedProfile = {

        ...profile,

        govConnected: true,

      };

      localStorage.setItem(

        "profile",

        JSON.stringify(
          updatedProfile
        )

      );

      setProfile(
        updatedProfile
      );

      setIsConnecting(false);

      setIsConnected(true);

    }, 2500);

  };

  const logout = () => {

    localStorage.removeItem(
      "isLogin"
    );

    navigate("/login");

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F5F6FB",
        maxWidth: "430px",
        margin: "0 auto",
        padding:
          "24px 20px 120px",
        boxSizing: "border-box",
      }}
    >

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "900",
          color: "#1F2A44",
          marginBottom: "24px",
        }}
      >
        프로필
      </h1>

      <div
        style={{
          background: "white",
          borderRadius: "28px",
          padding: "28px",
          boxShadow:
            "0 4px 14px rgba(0,0,0,0.05)",
        }}
      >

        <div
          style={{
            width: "82px",
            height: "82px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#5B8CFF,#63E6BE)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            fontWeight: "900",
            marginBottom: "20px",
          }}
        >
          {profile?.name?.charAt(0)}
        </div>

        <h2
          style={{
            fontSize: "28px",
            color: "#1F2A44",
            marginBottom: "18px",
          }}
        >
          {profile?.name}
        </h2>

        <p style={infoStyle}>
          이메일:
          {profile?.email}
        </p>

        <p style={infoStyle}>
          나이:
          {profile?.age}
        </p>

        <p style={infoStyle}>
          지역:
          {profile?.region}
        </p>

        <p style={infoStyle}>
          소득 분위:
          {profile?.income}
        </p>

        <p style={infoStyle}>
          학교:
          {profile?.school}
        </p>

        {

          profile?.govConnected && (

            <div
              style={{
                marginTop: "18px",
                padding: "14px",
                borderRadius: "16px",
                background:
                  "#E8FFF3",
                color: "#17A34A",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              정부24 연동 완료
            </div>

          )

        }

        <button
          onClick={() =>
            navigate(
              "/edit-profile"
            )
          }
          style={mainButton}
        >
          프로필 수정
        </button>

        <button
          onClick={() =>
            setShowConsent(true)
          }
          disabled={
            isConnecting ||
            isConnected
          }
          style={{
            ...mainButton,

            marginTop: "14px",
          }}
        >

          {

            isConnecting

              ? "정부24 연동중..."

              : isConnected

              ? "정부24 연동 완료"

              : "정부24 연동"

          }

        </button>

        <button
          onClick={logout}
          style={{
            width: "100%",
            height: "54px",
            border: "none",
            borderRadius: "18px",
            background: "#FF5D5D",
            color: "white",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            marginTop: "14px",
          }}
        >
          로그아웃
        </button>

      </div>

      {

        showConsent && (

          <div
            style={{
              position: "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 1000,
            }}
          >

            <div
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "24px",
                width: "100%",
                maxWidth: "340px",
              }}
            >

              <h3
                style={{
                  fontSize: "22px",
                  marginBottom: "16px",
                  color: "#1F2A44",
                }}
              >
                개인정보 동의
              </h3>

              <p
                style={{
                  color: "#666",
                  lineHeight: "1.6",
                  fontSize: "14px",
                }}
              >
                정부24 연동을 위해
                개인정보 제공 및
                정책 분석에
                동의하시겠습니까?
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "24px",
                }}
              >

                <button
                  onClick={() =>
                    setShowConsent(false)
                  }
                  style={cancelButton}
                >
                  취소
                </button>

                <button
                  onClick={connectGov24}
                  style={agreeButton}
                >
                  동의
                </button>

              </div>

            </div>

          </div>

        )

      }

    </div>

  );

}

const infoStyle = {

  fontSize: "15px",

  color: "#555",

  marginBottom: "10px",

};

const mainButton = {

  width: "100%",

  height: "54px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#5B8CFF,#63E6BE)",

  color: "white",

  fontSize: "15px",

  fontWeight: "700",

  cursor: "pointer",

  marginTop: "28px",

};

const cancelButton = {

  flex: 1,

  height: "48px",

  border: "none",

  borderRadius: "14px",

  background: "#ECECEC",

};

const agreeButton = {

  flex: 1,

  height: "48px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(135deg,#5B8CFF,#63E6BE)",

  color: "white",

  fontWeight: "700",

};

export default Profile;