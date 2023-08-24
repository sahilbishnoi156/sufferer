"use client";
import React, { useEffect, useState } from "react";
import SideProfile from "./SideProfile";
import Loading from "./Loading";
import LoadingBar from "react-top-loading-bar";
import Quotes from "./Quotes";
import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState({});
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchData = async () => {
    try {
      setDataLoading(true);
      setProgress(30);
      // const timestamp = new Date().getTime();
      const postsResponse = await fetch(`/api/quote?_limit=4`, {
        next: { revalidate: 60 },
      });
      const postsData = await postsResponse.json();
      setProgress(40);
      const userResponse = await fetch(
        `/api/users/getUser/${
          (await session?.user.id) ||
          localStorage.getItem("Sufferer-site-userId")
        }`
      );
      setProgress(80);
      const user = await userResponse.json();
      setDataLoading(false);
      setPosts(postsData.posts);
      setCurrentUser(user);
      setProgress(100);
    } catch (error) {
      console.log("Failed to get data", error);
    }
  };

  const fetchMoreData = async () => {
    const response = await fetch(`/api/quote?_start=${posts.length}&_limit=4`);
    const data = await response.json();
    setPosts((prevPosts) => [...prevPosts, ...data.posts]);
    setHasMoreData(data.totalPosts > posts.length);
  };

  const Loader = () => (
    <div className="w-full flex items-center justify-center">
      <h2 className="text-white">Loading...</h2>
    </div>
  );

  useEffect(() => {
    if (session || localStorage.getItem("Sufferer-site-authToken")) {
      if (posts.length <= 0) {
        fetchData();
      }
    } else {
      setDataLoading(true);
    }
  }, [session]);

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <>
      <div className="text-white box-border flex justify-end bg-black ">
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <div className="w-full sm:pl-20 p-2" id="quotes-section">
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMoreData}
            hasMore={hasMoreData}
            loader={<Loader />}
          >
            <Quotes
              posts={posts}
              section={"Trending"}
              dataLoading={dataLoading}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setDataLoading={setDataLoading}
            />
          </InfiniteScroll>
        </div>
        <div
          className="xl:block hidden"
          id="side-profile"
          style={{ minWidth: "30%" }}
        >
          <SideProfile session={session} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
