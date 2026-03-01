"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PromptModal from "./PromptModal";

interface PromptButtonProps {
  session: any;
  className?: string;
}

export default function PromptButton({ session, className }: PromptButtonProps) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  function handleClick() {
    if (session) {
      router.push("/designer");
    } else {
      setShow(true);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={
          className ||
          "rounded-xl bg-[var(--accent)] px-8 py-4 text-base font-medium text-white hover:opacity-90"
        }
      >
        Start with prompt
      </button>
      {show && <PromptModal onClose={() => setShow(false)} />}
    </>
  );
}
