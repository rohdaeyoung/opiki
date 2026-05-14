import Header from "../components/Header";
import BottomNav from "../components/BottomNav";


function Notification() {

  const notifications = [

    {
      id: 1,
      type: "마감 임박",
      title: "청년 교통비 지원사업",
      desc: "3일 뒤 마감됩니다.",
      day: "D-3",
      color: "#FF9F5A",
    },

    {
      id: 2,
      type: "추천 혜택",
      title: "청년 월세 지원",
      desc: "AI 추천 혜택입니다.",
      day: "추천",
      color: "#6EE7C8",
    },

    {
      id: 3,
      type: "공지",
      title: "서비스 업데이트",
      desc: "새로운 혜택이 추가되었습니다.",
      day: "NEW",
      color: "#5B8CFF",
    },

  ];

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F7F9FC",
        paddingBottom: "120px",
      }}
    >

      <Header />

      <div
        style={{
          padding: "20px",
        }}
      >

        {/* 제목 */}
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "800",
            color: "#1F2A44",
            marginBottom: "24px",
          }}
        >
          알림 내역
        </h1>

        {/* 알림 리스트 */}
        {
          notifications.map((item) => (

            <div
              key={item.id}
              style={{
                background: "#fff",
                borderRadius: "24px",
                padding: "20px",
                marginBottom: "16px",
                border:
                  "1px solid #E5EAF3",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                }}
              >

                <div>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "#A8B1C7",
                      marginBottom: "8px",
                    }}
                  >
                    {item.type}
                  </p>

                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#1F2A44",
                    }}
                  >
                    {item.title}
                  </h2>

                  <p
                    style={{
                      marginTop: "10px",
                      color: "#A8B1C7",
                      fontSize: "14px",
                    }}
                  >
                    {item.desc}
                  </p>

                </div>

                {/* D-day */}
                <div
                  style={{
                    border:
                      `1px solid ${item.color}`,
                    color: item.color,
                    borderRadius: "12px",
                    padding: "8px 12px",
                    fontWeight: "700",
                    minWidth: "70px",
                    textAlign: "center",
                  }}
                >
                  {item.day}
                </div>

              </div>

            </div>

          ))
        }

      </div>

      <BottomNav />

    </div>
  );
}

export default Notification;