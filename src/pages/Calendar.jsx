import BottomNav from "../components/BottomNav";

export default function Calendar() {

  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  const days = Array.from(
    { length: 31 },
    (_, i) => i + 1
  );

  // 즐겨찾기 날짜 추출
  const markedDays = [];

  favorites.forEach((item) => {

    if (!item.date) return;

    const parts =
      item.date.split("~");

    if (!parts[0]) return;

    const start =
      parts[0].trim();

    const day =
      Number(start.split(".")[2]);

    if (!isNaN(day)) {
      markedDays.push(day);
    }

  });

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F7F9FC",
        padding: "24px 20px 140px",
        overflowX: "hidden",
      }}
    >

      {/* 제목 */}
      <div
        style={{
          fontSize: "52px",
          fontWeight: "900",
          color: "#1F2A52",
          lineHeight: "1",
          marginBottom: "12px",
        }}
      >
        일정
      </div>

      {/* 설명 */}
      <div
        style={{
          color: "#AAB3CC",
          fontSize: "18px",
          fontWeight: "700",
          marginBottom: "24px",
        }}
      >
        저장한 혜택 일정 확인
      </div>

      {/* 캘린더 */}
      <div
        style={{
          width: "100%",
          background: "#fff",
          borderRadius: "34px",
          padding: "18px 14px",
          border: "2px solid #E6ECF5",
          marginBottom: "28px",
          boxSizing: "border-box",
        }}
      >

        {/* 월 */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: "900",
            color: "#1F2A52",
            marginBottom: "20px",
            paddingLeft: "8px",
          }}
        >
          2026년 5월
        </div>

        {/* 요일 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            marginBottom: "14px",
            textAlign: "center",
          }}
        >

          {["일","월","화","수","목","금","토"].map((day) => (

            <div
              key={day}
              style={{
                color: "#AAB3CC",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              {day}
            </div>

          ))}

        </div>

        {/* 날짜 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            justifyItems: "center",
            rowGap: "12px",
          }}
        >

          {days.map((day) => {

            const marked =
              markedDays.includes(day);

            return (

              <div
                key={day}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background:
                    marked
                    ?
                    "linear-gradient(135deg,#5D85F7,#64DCC8)"
                    :
                    "#F3F5FA",
                  color:
                    marked
                    ?
                    "#fff"
                    :
                    "#1F2A52",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                {day}
              </div>

            );

          })}

        </div>

      </div>

      {/* 저장된 일정 */}
      <div
        style={{
          fontSize: "42px",
          fontWeight: "900",
          color: "#1F2A52",
          marginBottom: "20px",
        }}
      >
        저장된 일정
      </div>

      {favorites.map((item, index) => (

        <div
          key={index}
          style={{
            background: "#fff",
            borderRadius: "32px",
            padding: "24px",
            border: "2px solid #E6ECF5",
            marginBottom: "18px",
          }}
        >

          {/* 제목 */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: "900",
              color: "#1F2A52",
              marginBottom: "16px",
              lineHeight: "1.3",
            }}
          >
            {item.title}
          </div>

          {/* 신청기간 */}
          <div
            style={{
              color: "#AAB3CC",
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            신청 기간
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "10px",
            }}
          >

            {/* 날짜 */}
            <div
              style={{
                color: "#F79245",
                fontSize: "18px",
                fontWeight: "800",
                lineHeight: "1.5",
              }}
            >
              {item.date}
            </div>

            {/* D-Day */}
            <div
              style={{
                minWidth: "88px",
                height: "48px",
                borderRadius: "999px",
                border: "3px solid #F79245",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#F79245",
                fontWeight: "900",
                fontSize: "18px",
                padding: "0 12px",
                background: "#fff",
                flexShrink: 0,
              }}
            >
              {item.dday}
            </div>

          </div>

        </div>

      ))}

      <BottomNav />

    </div>

  );

}