import { Battery, Signal, Wifi } from "lucide-react";

export default function PhoneTop() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <Signal size={15} fill="currentColor" />
        <Wifi size={15} />
        <Battery size={20} />
      </span>
    </div>
  );
}
