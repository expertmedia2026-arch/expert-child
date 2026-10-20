"use client";

import { useEffect, useState } from "react";

export function TodayLabel() {
  const [label, setLabel] = useState("Today");

  useEffect(() => {
    setLabel(
      new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "short",
      }).format(new Date()),
    );
  }, []);

  return (
    <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a33b32] uppercase">
      {label}
    </p>
  );
}
