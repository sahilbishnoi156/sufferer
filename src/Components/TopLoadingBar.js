"use client";
import { useState, useEffect } from "react";

export default function TopLoadingBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[2px] w-screen">
      <div className={`h-full bg-red-700`} style={{ width: `${progress}%`}}></div>
    </div>
  );
}
