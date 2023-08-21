"use client";
import Jumbotron from "@/Components/Jumobotron";
import { useSession } from "next-auth/react";
import Home from "@/Components/Home";
import { useEffect, useState } from "react";

export default function page() {
  const { status, data:session } = useSession();
  const [userLogged, setUserLogged] = useState(false)
  useEffect(() => {
    // Perform client-side check for localStorage
    const token = localStorage.getItem('Sufferer-site-authToken');
    token && setUserLogged(true)
  }, []);
  return (
    <div id="quote-area" className="w-full">
      {status === "authenticated" || status === "loading" || userLogged  ? <Home /> : <Jumbotron />}
    </div>
  );
}
