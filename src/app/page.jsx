"use client"

import { SignInCard } from "@/components/auth/sign-in-card";
import { SignUpCard } from "@/components/auth/Sign-up-card";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState("signIn");
  return (
    <div className="h-full flex items-center justify-center">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
      </div>
    </div>
  );
}
