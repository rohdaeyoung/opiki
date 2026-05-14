import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

function EditProfile() {

  const navigate =
    useNavigate();

  const [profile, setProfile]
    = useState({

      name: "",

      age: "",

      region: "",

      income: "",

      school: "",

      email: "",

    });

  useEffect(() => {

    const savedProfile =
      JSON.parse(
        localStorage.getItem(
          "profile"
        )
      );

    if (savedProfile) {

      setProfile(
        savedProfile
      );

    }

  }, []);

  const saveProfile = () => {

    localStorage.setItem(

      "profile",

      JSON.stringify(
        profile
      )

    );

    alert(
      "프로필 수정 완료 😊"
    );

    navigate("/profile");

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F5F6FB",
        maxWidth: "430px",
        margin: "0 auto",

        padding:
          "24px 20px 160px",

        boxSizing: "border-box",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "28px",
        }}
      >

        <button
          onClick={() =>
            navigate("/profile")
          }
          style={{
            border: "none",
            background: "none",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ←
        </button>

        <h1
          style={{
            fontSize: "30px",
            fontWeight: "900",
            color: "#1F2A44",
          }}
        >
          프로필 수정
        </h1>

      </div>

      <div
        style={{
          background: "white",
          borderRadius: "28px",
          padding: "24px",
          boxShadow:
            "0 4px 14px rgba(0,0,0,0.05)",
        }}
      >

        <input
          value={profile.name}
          onChange={(e) =>
            setProfile({

              ...profile,

              name:
                e.target.value,

            })
          }
          placeholder="이름"
          style={inputStyle}
        />

        <input
          value={profile.email}
          onChange={(e) =>
            setProfile({

              ...profile,

              email:
                e.target.value,

            })
          }
          placeholder="이메일"
          style={inputStyle}
        />

        <input
          value={profile.age}
          onChange={(e) =>
            setProfile({

              ...profile,

              age:
                e.target.value,

            })
          }
          placeholder="나이"
          style={inputStyle}
        />

        <input
          value={profile.region}
          onChange={(e) =>
            setProfile({

              ...profile,

              region:
                e.target.value,

            })
          }
          placeholder="지역"
          style={inputStyle}
        />

        <input
          value={profile.income}
          onChange={(e) =>
            setProfile({

              ...profile,

              income:
                e.target.value,

            })
          }
          placeholder="소득 분위"
          style={inputStyle}
        />

        <input
          value={profile.school}
          onChange={(e) =>
            setProfile({

              ...profile,

              school:
                e.target.value,

            })
          }
          placeholder="학교"
          style={inputStyle}
        />

        <button
          onClick={saveProfile}
          style={{
            width: "100%",
            height: "56px",
            border: "none",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#5B8CFF,#63E6BE)",
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",

            marginTop: "20px",

            marginBottom: "30px",
          }}
        >
          저장하기
        </button>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  height: "54px",

  border: "none",

  borderRadius: "16px",

  padding: "0 18px",

  background: "#F5F6FB",

  fontSize: "15px",

  outline: "none",

  boxSizing: "border-box",

  marginBottom: "14px",

};

export default EditProfile;