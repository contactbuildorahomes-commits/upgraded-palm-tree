import { useEffect } from "react";
import { logout } from "@/firebase/auth";

export const meta = () => [
  { title: "Briefly — Logout" },
];

function MainComponent() {
  useEffect(() => {
    logout();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center text-white">Logged out</div>
  );
}

export default MainComponent;
