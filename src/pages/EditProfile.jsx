import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {

  const navigate = useNavigate();

  const [profile, setProfile]
    = useState({
      name: "",
      id: "",
      age: "",
      region: "",
      university: "",
      income: "",
    });

  useEffect(() => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    const savedProfile =
      JSON.parse(localStorage.getItem("profile"));

    setProfile({
      name: user?.name || "",
      id: user?.id || "",
      age: savedProfile?.age || "",
      region: savedProfile?.region || "",
      university:
        savedProfile?.university || "",
      income:
        savedProfile?.income || "",
    });

  }, []);

  const handleChange = (key, value) => {

    setProfile({
      ...profile,
      [key]: value,
    });

  };

  const handleSave = () => {

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    alert("프로필 저장 완료!");

    navigate("/profile");

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F7F9FC",
        padding: "28px 24px 120px",
      }}
    >

      {/* 상단 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "34px",
        }}
      >

        <button
          onClick={() =>
            navigate(-1)
          }
          style={{
            border: "none",
            background: "transparent",
            fontSize: "32px",
            cursor: "pointer",
            color: "#1F2A44",
          }}
        >
          ←
        </button>

        <div
          style={{
            fontSize: "38px",
            fontWeight: "800",
            color: "#1F2A44",
          }}
        >
          프로필 수정
        </div>

      </div>

      {/* 카드 */}
      <div
        style={{
          background: "#fff",
          borderRadius: "34px",
          padding: "30px 24px",
          border: "2px solid #E4E9F5",
        }}
      >

        <InputBox
          label="이름"
          value={profile.name}
          onChange={(value) =>
            handleChange("name", value)
          }
        />

        <InputBox
          label="아이디"
          value={profile.id}
          disabled
        />

        <InputBox
          label="나이"
          value={profile.age}
          onChange={(value) =>
            handleChange("age", value)
          }
        />

        <InputBox
          label="지역"
          value={profile.region}
          onChange={(value) =>
            handleChange("region", value)
          }
        />

        <InputBox
          label="대학교"
          value={profile.university}
          onChange={(value) =>
            handleChange("university", value)
          }
        />

        <InputBox
          label="소득 분위"
          value={profile.income}
          onChange={(value) =>
            handleChange("income", value)
          }
        />

        {/* 비밀번호 */}
        <InputBox
          label="비밀번호"
          value="********"
          disabled
        />

      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        style={{
          width: "100%",
          height: "68px",
          border: "none",
          borderRadius: "24px",
          background: "#5B8CFF",
          color: "#fff",
          fontSize: "24px",
          fontWeight: "800",
          marginTop: "28px",
          cursor: "pointer",
        }}
      >
        저장하기
      </button>

    </div>

  );
}

function InputBox({
  label,
  value,
  onChange,
  disabled,
}) {

  return (

    <div
      style={{
        marginBottom: "24px",
      }}
    >

      <div
        style={{
          fontSize: "17px",
          color: "#AAB2C8",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        {label}
      </div>

      <input
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        style={{
          width: "100%",
          height: "58px",
          borderRadius: "18px",
          border: "1px solid #E1E6F3",
          padding: "0 18px",
          fontSize: "18px",
          fontWeight: "700",
          color: "#1F2A44",
          background:
            disabled
            ? "#F4F6FB"
            : "#fff",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

    </div>

  );

}

export default EditProfile;