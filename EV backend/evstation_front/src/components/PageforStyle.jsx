import { useState } from "react";
import Login from "./Login";
import Signupp from "./Signup";
export default function Auth() {
  const [Signup, setSignup] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
      
      <div className={`auth-box bg-white rounded-2xl shadow-2xl ${Signup ? "active" : ""}`}>

        {/* LOGIN */}
        <div className="panel signin-panel absolute top-0 left-0 w-1/2 h-full p-10">
          <Login onSwitch={() => setSignup(true)} />
        </div>

        {/* SIGNUP */}
        <div className="panel signup-panel absolute top-0 right-0 w-1/2 h-full p-10">
          <Signupp onSwitch={() => setSignup(false)} />
        </div>

      </div>
    </div>
  );
}
