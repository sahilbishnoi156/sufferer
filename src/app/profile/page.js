"use client";
import MainProfile from "../../Components/MainProfile";
import { useState, useEffect, lazy } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingBar from "react-top-loading-bar";
import Loading from "../../Components/Loading";

export default function page() {
  const [progress, setProgress] = useState(0)
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({});
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      setProgress(40)
      const response = await fetch(`/api/users/${session?.user.id|| localStorage.getItem("Sufferer-site-userId")}/quotes`);
      setProgress(80)
      const data = await response.json();
      setQuotes(data);
      setProgress(100)
    };
    const fetchUser = async () => {
      const response = await fetch(`/api/users/getUser/${session?.user.id || localStorage.getItem("Sufferer-site-userId")}`);
      const data = await response.json();
      setUser(data);
    };
    if ((status === "authenticated" && session?.user.id) || localStorage.getItem("Sufferer-site-authToken")) {
      setLoading(true)
      fetchPosts();
      fetchUser();
      setLoading(false)
    } else if (status === "unauthenticated" || status === "" || localStorage.getItem("Sufferer-site-authToken")) {
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
    <div className="w-full flex justify-center items-center mb-16">
      <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
      />
      <MainProfile
        user={user}
        setProgress={setProgress}
        section={"My"}
        data={quotes}
        setData={setQuotes}
        loading={loading}
      />
    </div>
  );
}
