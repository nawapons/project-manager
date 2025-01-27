"use client"

import { LoginForm } from "@/features/auth/components/sign-in-form";
import { RegisterForm } from "@/features/auth/components/sign-up-form";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState("signIn");
  return (
    <div className="h-full flex items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? <LoginForm setState={setState} /> : <RegisterForm setState={setState} />}
      </div>
    </div>
  );
}
