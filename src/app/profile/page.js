"use client";
import MainProfile from "../../Components/MainProfile";
import { useState, useEffect, lazy } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../../Components/Loading";

export default function page() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({});
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id|| localStorage.getItem("userId")}/quotes`);
      const data = await response.json();
      setQuotes(data);
    };
    const fetchUser = async () => {
      const response = await fetch(`/api/users/getUser/${session?.user.id || localStorage.getItem("userId")}`);
      const data = await response.json();
      setUser(data);
    };
    if ((status === "authenticated" && session?.user.id) || localStorage.getItem("authToken")) {
      setLoading(true)
      fetchPosts();
      fetchUser();
      setLoading(false)
    } else if (status === "unauthenticated" || status === "" || localStorage.getItem("authToken")) {
      router.push("/");
    }
  }, [session?.user.id, status]);
  if (status === "loading" || !user || loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center items-center">
      <MainProfile
        user={user}
        section={"My"}
        data={quotes}
        setData={setQuotes}
        loading={loading}
      />
    </div>
  );
}
