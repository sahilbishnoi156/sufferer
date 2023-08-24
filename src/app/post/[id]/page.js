"use client";
import React, { useEffect, useState } from "react";
import QuoteItem from "@/Components/QuoteItem";
import LoadingBar from "react-top-loading-bar";
import Skeleton from "@/Components/Skeleton";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const [dataLoading, setDataLoading] = useState(false); 
  const [currentPost, setCurrentPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [progress, setProgress] = useState(0);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState({});

  // Fetching Current post
  const fetchPost = async () => {
    setDataLoading(true)
    setProgress(30);
    const response = await fetch(`/api/quote/${params.id}`);
    setProgress(60);
    const data = await response.json();
    setProgress(100);
    setCurrentPost(data);
    setDataLoading(false)
  };

  const fetchCurrentUser = async () => {
    if ((session?.user?.id) || localStorage.getItem("Sufferer-site-authToken")) {
      setProgress(30);
      const userResponse = await fetch(`/api/users/getUser/${localStorage.getItem("Sufferer-site-userId") || session?.user?.id }`);
      setProgress(50);
      const user = await userResponse.json();
      setCurrentUser(user);
      setProgress(100);
    }
    else{
      router.push("/")
      toast.warn("Login To See The Post", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setDataLoading(false); // Set data loading to false when user data is fetched
  };

  useEffect(() => {
    if (session || localStorage.getItem("Sufferer-site-userId")) {
      fetchPost();
      fetchCurrentUser();  
    }
    else if ((status === "unauthenticated")){
      router.push("/")
      toast.warn("Login To See The Post", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [session]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="w-3/4  flex items-center justify-center">
        {dataLoading ? (
          <Skeleton type="quotes" />
        ) : (
          <>
            {currentPost.creator && (
              <QuoteItem
                creator={currentPost.creator}
                date={currentPost.date}
                id={currentPost._id}
                setPosts={setPosts}
                posts={posts}
                post={currentPost}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
