import { FaStar, FaRegStar } from "react-icons/fa";
import { colors } from "../styles/theme";

function BenefitCard({
  item,
  onToggleFavorite
}) {

  return (
    <div
      style={{
        background:"#fff",
        border:"1px solid #E5EAF3",
        borderRadius:"18px",
        padding:"18px",
        marginBottom:"14px",
      }}
    >

      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"flex-start",
        }}
      >

        <div>

          <h3
            style={{
              fontSize:"18px",
              fontWeight:"700",
              color:colors.navy,
              lineHeight:"1.4",
            }}
          >
            {item.title}
          </h3>

          <p
            style={{
              marginTop:"6px",
              color:"#9BA4BA",
              fontSize:"13px",
            }}
          >
            {item.desc}
          </p>

          <p
            style={{
              marginTop:"8px",
              color:colors.orange,
              fontWeight:"600",
              fontSize:"13px",
            }}
          >
            신청 기간 {item.startDate} ~ {item.endDate}
          </p>

        </div>

        <div
          style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:"12px",
          }}
        >

          <button
            onClick={() => onToggleFavorite(item)}
          >
            {
              item.bookmarked
              ?
              <FaStar size={22} color="#5B8CFF"/>
              :
              <FaRegStar size={22} color="#A8B1C7"/>
            }
          </button>

          <div
            style={{
              padding:"4px 12px",
              borderRadius:"10px",
              border:`1px solid ${
                item.status === "mint"
                ? colors.mint
                : item.status === "orange"
                ? colors.orange
                : "#A8B1C7"
              }`,
              color:
                item.status === "mint"
                ? colors.mint
                : item.status === "orange"
                ? colors.orange
                : "#A8B1C7",
              fontWeight:"700",
              fontSize:"13px",
            }}
          >
            {item.deadline}
          </div>

        </div>

      </div>

    </div>
  );
}

export default BenefitCard;