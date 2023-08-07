"use client";
import Setting from "@/Components/Setting";
import { useSession, signOut } from "next-auth/react";
import Loading from "@/Components/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function page() {
  // Getting session
  const { data: session, status } = useSession();

  // States
  const [user, setUser] = useState({});

  // Hooks
  const router = useRouter();

  // Handling Logout
  const handleLogOut = () => {
    localStorage.clear();
    toast.success(`See ya later ${user.given_name} `, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
      signOut();
  };

  // useEffect
  useEffect(() => {
    // Fetching user details
    const fetchUser = async () => {
      const response = await fetch(`/api/users/getUser/${session?.user.id || localStorage.getItem("userId")}`);
      const data = await response.json();
      setUser(data);
    };

    // If user is authenticated the fetch details
    if (status === "authenticated" && session?.user.id || localStorage.getItem("authToken")) {
      fetchUser();

    // If not then go to "/"
    } else if (status === "unauthenticated" || status === "" || localStorage.getItem("authToken")) {
      router.push("/");
    }
  }, [session?.user.id, status]);

  // If status is loading then show loading screen
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="sm:p-10 p-4 w-full flex items-center justify-center mb-16">
      <Setting
        user={user}
        id={session?.user.id || localStorage.getItem("userId")}
        handleLogOut={handleLogOut}
      />
    </div>
  );
}
