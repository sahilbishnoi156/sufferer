"use client";
import React, { useEffect, useState } from "react";
import QuoteItem from "@/Components/QuoteItem";
import LoadingBar from "react-top-loading-bar";
import Skeleton from "@/Components/Skeleton";
import { useSession } from "next-auth/react";

export default function Page({ params }) {
  const [dataLoading, setDataLoading] = useState(true); // Start with loading state
  const [currentPost, setCurrentPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState({});

  // Fetching Current post
  const fetchPost = async () => {
    setProgress(30);
    const response = await fetch(`/api/quote/${params.id}`);
    setProgress(60);
    const data = await response.json();
    setProgress(100);
    setCurrentPost(data);
  };

  const fetchCurrentUser = async () => {
    if ((session?.user?.id) || localStorage.getItem("Sufferer-site-userId")) {
      setProgress(30);
      const userResponse = await fetch(`/api/users/getUser/${session.user.id || localStorage.getItem("Sufferer-site-userId")}`);
      setProgress(50);
      const user = await userResponse.json();
      setCurrentUser(user);
      setProgress(100);
    }
    setDataLoading(false); // Set data loading to false when user data is fetched
  };

  useEffect(() => {
    fetchPost();
    if (session) {
      fetchCurrentUser();
    }
  }, [session]);

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
