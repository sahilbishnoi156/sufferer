"use client";
import MainProfile from "@/Components/MainProfile";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/Components/Loading";

export default function page({ params }) {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const userName = searchParams.get("name");
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/quotes`);
      const data = await response.json();
      setQuotes(data);
    };
    const fetchUser = async () => {
      const response = await fetch(`/api/users/getUser/${params?.id}`);
      const User = await response.json();
      setCurrentUser(User);
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
  if (status === "loading" || loading) {
    return (
        <Loading />
    );
  }
  return (
    <div className="w-full flex justify-center items-center">
      <MainProfile
        user={currentUser}
        data={quotes}
        section={`${userName}'s`}
        setData={setQuotes}
        loading={loading}
      />
    </div>
  );
}
