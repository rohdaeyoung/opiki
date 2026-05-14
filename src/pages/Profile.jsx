import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Profile() {

  const navigate = useNavigate();

  const profile =
    JSON.parse(localStorage.getItem("profile")) || {};

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const userName =
    profile.name ||
    user.name ||
    "사용자";

  const firstLetter =
    userName.charAt(0);

  const logout = () => {

    localStorage.removeItem("isLogin");

    navigate("/login");

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F7F9FC",
        padding: "28px 24px 140px",
      }}
    >

      {/* 상단 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginBottom: "36px",
        }}
      >

        {/* 프로필 원 */}
        <div
          style={{
            width: "112px",
            height: "112px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#5D85F7,#64DCC8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "52px",
            fontWeight: "800",
            flexShrink: 0,
          }}
        >
          {firstLetter}
        </div>

        {/* 이름 */}
        <div>

          <div
            style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#1F2A52",
              marginBottom: "6px",
            }}
          >
            {userName}
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "#AAB3CC",
              fontWeight: "600",
            }}
          >
            맞춤 혜택 추천 사용자
          </div>

        </div>

      </div>

      {/* 정보 카드 */}
      <div
        style={{
          background: "#fff",
          border: "2px solid #E5EBF5",
          borderRadius: "36px",
          padding: "20px 24px",
          marginBottom: "28px",
        }}
      >

        {[
          ["아이디", user.id || "rdy0810"],
          ["나이", profile.age || "-"],
          ["지역", profile.region || "-"],
          ["대학교", profile.school || "-"],
          ["소득 분위", profile.income || "-"],
        ].map((item, index) => (

          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "24px 0",
              borderBottom:
                index !== 4
                  ? "1px solid #EDF1F7"
                  : "none",
            }}
          >

            <div
              style={{
                color: "#AAB3CC",
                fontSize: "22px",
                fontWeight: "700",
              }}
            >
              {item[0]}
            </div>

            <div
              style={{
                color: "#1F2A52",
                fontSize: "22px",
                fontWeight: "800",
              }}
            >
              {item[1]}
            </div>

          </div>

        ))}

      </div>

      {/* 프로필 수정 */}
      <button
        onClick={() =>
          navigate("/edit-profile")
        }
        style={{
          width: "100%",
          height: "78px",
          border: "none",
          borderRadius: "28px",
          background:
            "linear-gradient(90deg,#5D85F7,#5B82F2)",
          color: "#fff",
          fontSize: "28px",
          fontWeight: "800",
          marginBottom: "18px",
          cursor: "pointer",
        }}
      >
        프로필 수정
      </button>

      {/* 로그아웃 */}
      <button
        onClick={logout}
        style={{
          width: "100%",
          height: "78px",
          border: "none",
          borderRadius: "28px",
          background: "#EEF2FA",
          color: "#5F6B8B",
          fontSize: "24px",
          fontWeight: "700",
          cursor: "pointer",
          marginBottom: "28px",
        }}
      >
        로그아웃
      </button>

      {/* AI 혜택 분석 */}
      <div
        style={{
          background: "#fff",
          borderRadius: "32px",
          padding: "24px",
          border: "2px solid #E6ECF5",
          marginBottom: "22px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >

          <div
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#1F2A52",
            }}
          >
            AI 혜택 분석
          </div>

          <div
            style={{
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#EEF4FF",
              color: "#5D85F7",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            AI 분석 완료
          </div>

        </div>

        <div
          style={{
            color: "#5F6B8B",
            lineHeight: "1.9",
            fontSize: "17px",
            fontWeight: "600",
          }}
        >
          • 청년 교통비 지원 추천<br />
          • 국가근로장학금 대상 가능<br />
          • 청년 월세 지원 신청 가능성 높음<br />
          • 지역 기반 추가 혜택 탐색 완료
        </div>

      </div>

      {/* 정부24 연동 */}
      <div
        style={{
          background: "#fff",
          borderRadius: "32px",
          padding: "24px",
          border: "2px solid #E6ECF5",
          marginBottom: "22px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >

          <div
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#1F2A52",
            }}
          >
            정부24 자동 연동
          </div>

          <div
            style={{
              padding: "8px 14px",
              borderRadius: "999px",
              background: "#EAFBF5",
              color: "#3DBE8B",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            연동 가능
          </div>

        </div>

        <div
          style={{
            color: "#5F6B8B",
            lineHeight: "2",
            fontSize: "17px",
            fontWeight: "600",
            marginBottom: "18px",
          }}
        >
          ✓ 주민등록등본 자동 제출 가능<br />
          ✓ 소득금액증명원 자동 불러오기<br />
          ✓ 재학증명서 자동 연동<br />
          ✓ 신청 정보 자동 입력 지원
        </div>

        <button
          style={{
            width: "100%",
            height: "56px",
            border: "none",
            borderRadius: "18px",
            background:
              "linear-gradient(90deg,#5D85F7,#64DCC8)",
            color: "#fff",
            fontSize: "17px",
            fontWeight: "800",
            cursor: "pointer",
          }}
        >
          개인정보 동의 후 자동 연결
        </button>

      </div>

      {/* AI 신청 상태 */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#5D85F7,#64DCC8)",
          borderRadius: "32px",
          padding: "26px",
          color: "#fff",
          marginBottom: "30px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >

          <div
            style={{
              fontSize: "24px",
              fontWeight: "800",
            }}
          >
            AI 신청 준비 상태
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "8px 14px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            자동 분석중
          </div>

        </div>

        <div
          style={{
            fontSize: "54px",
            fontWeight: "900",
            lineHeight: 1,
            marginBottom: "18px",
          }}
        >
          85%
        </div>

        {/* 진행 바 */}
        <div
          style={{
            width: "100%",
            height: "12px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.25)",
            overflow: "hidden",
            marginBottom: "18px",
          }}
        >

          <div
            style={{
              width: "85%",
              height: "100%",
              borderRadius: "999px",
              background: "#fff",
            }}
          />

        </div>

        <div
          style={{
            fontSize: "17px",
            lineHeight: "1.8",
            fontWeight: "600",
          }}
        >
          AI가 신청 가능 상태를 분석했어요.<br />
          부족한 서류: 통장 사본<br />
          정부24 자동 제출 가능 항목 확인 완료
        </div>

      </div>

      {/* 하단 네비 */}
      <BottomNav />

    </div>

  );

}