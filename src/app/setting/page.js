"use client";
import Setting from "@/Components/Setting";
import { useSession, signOut } from "next-auth/react";
import Loading from "@/Components/Loading";
import { useRouter } from "next/navigation";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function page() {
  // Getting session
  const { data: session, status } = useSession();

  // States
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState({});

  // Hooks
  const router = useRouter();

  // Handling Logout
  const handleLogOut = () => {
    setProgress(50);
    localStorage.clear();
    signOut();
    setProgress(100);
  };

  // useEffect
  useEffect(() => {
    // Fetching user details
    const fetchUser = async () => {
      setProgress(40);
      const response = await fetch(
        `/api/users/getUser/${
          session?.user.id || localStorage.getItem("userId")
        }`
      );
      setProgress(80);
      const data = await response.json();
      setUser(data);
      setProgress(100);
    };

    // If user is authenticated the fetch details
    if (
      (status === "authenticated" && session?.user.id) ||
      localStorage.getItem("authToken")
    ) {
      fetchUser();

      // If not then go to "/"
    } else if (
      status === "unauthenticated" ||
      status === "" ||
      localStorage.getItem("authToken")
    ) {
      router.push("/");
    }
  }, [session?.user.id, status]);

  // If status is loading then show loading screen
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="sm:p-10 p-4 w-full flex items-center justify-center mb-16">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Setting
        user={user}
        id={session?.user.id || localStorage.getItem("userId")}
        handleLogOut={handleLogOut}
        setProgress={setProgress}
      />
    </div>
  );
}
