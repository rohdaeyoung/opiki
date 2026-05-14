import { CalendarDays, History, House, Sparkles, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "홈", icon: House },
  { to: "/calendar", label: "일정", icon: CalendarDays },
  { to: "/ai", label: "AI 추천", icon: Sparkles, ai: true },
  { to: "/notification", label: "기록", icon: History },
  { to: "/profile", label: "프로필", icon: User },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""} ${item.ai ? "nav-ai" : ""}`
            }
            key={item.to}
            to={item.to}
          >
            {item.ai ? (
              <span className="ai-orb">
                <Icon size={30} />
              </span>
            ) : (
              <Icon size={23} strokeWidth={2.4} />
            )}
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
