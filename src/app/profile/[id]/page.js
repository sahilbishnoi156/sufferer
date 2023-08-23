"use client";
import MainProfile from "@/Components/MainProfile";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "@/Components/Loading";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

export default function page({ params }) {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [progress, setProgress] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const userName = searchParams.get("name");
  const { data: session, status } = useSession();
  
  // use Effect
  useEffect(() => {
    const fetchPosts = async () => {
      setProgress(30);
      const response = await fetch(`/api/users/${params?.id}/quotes`);
      setProgress(60);
      const data = await response.json();
      setQuotes(data);
      setProgress(100);
    };
    const fetchUser = async () => {
      const response = await fetch(`/api/users/getUser/${params?.id}`);
      const User = await response.json();
      setCurrentUser(User);
    };
    if (
      (status === "authenticated" && session?.user.id) ||
      localStorage.getItem("Sufferer-site-authToken")
    ) {
      setLoading(true);
      fetchPosts();
      fetchUser();
      setLoading(false);
    } else if (
      status === "unauthenticated" ||
      status === "" ||
      localStorage.getItem("Sufferer-site-authToken")
    ) {
      router.push("/");
    }
  }, [session?.user.id, status]);
  if (status === "loading" || loading) {
    return <Loading />;
  }
  return (
    <div className="w-full flex justify-center items-center mb-16">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <MainProfile
        setProgress={setProgress}
        user={currentUser}
        data={quotes}
        section={`${userName}'s`}
        setData={setQuotes}
        loading={loading}
        params={params}
      />
    </div>
  );
}
