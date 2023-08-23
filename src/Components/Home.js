"use client";
import React, { useEffect, useState } from "react";
import SideProfile from "./SideProfile";
import Loading from "./Loading";
import LoadingBar from "react-top-loading-bar";
import Quotes from "./Quotes";
import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);
  const { data: session, status } = useSession();
  const [dataLimit, setDataLimit] = useState(4);
  const [currentUser, setCurrentUser] = useState({});
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchPosts = async () => {
    try {
      setDataLoading(true);
      const timestamp = new Date().getTime();
      const response = await fetch(
        `/api/quote?sLimit=${0}&eLimit=${dataLimit}&timestamp=${timestamp}`
      );
      const data = await response.json();
      setDataLoading(false);
      setAllPosts(data.posts);
      setHasMoreData(data.totalPosts > dataLimit);
      return data;
    } catch (error) {
      console.log("failed to get posts", error);
    }
  };

  const fetchCurrentUser = async () => {
    setProgress(30);

    const response = await fetch(
      `/api/users/getUser/${
        session?.user.id || localStorage.getItem("Sufferer-site-userId")
      }`
    );
    const user = await response.json();
    setCurrentUser(user);
    setProgress(100);
  };

  const fetchMoreData = async () => {
    const newStartLimit = dataLimit;
    const newEndLimit = dataLimit + 4;
    const timestamp = new Date().getTime();
    const response = await fetch(
      `/api/quote?sLimit=${newStartLimit}&eLimit=${newEndLimit}&timestamp=${timestamp}`
    );

    const data = await response.json();
    if (data.posts.length > 0) {
      setAllPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setDataLimit(newEndLimit);
    } else {
      setHasMoreData(false);
    }
  };

  useEffect(() => {
    if (allPosts.length === 0) {
      fetchPosts();
      fetchCurrentUser();
    }
  }, []);

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
            dataLength={allPosts.length}
            next={fetchMoreData}
            hasMore={hasMoreData}
            loader={
              <div className="w-full flex items-center justify-center">
              <h2 className="text-white">Loading...</h2>
              </div>
            }
          >
            <Quotes
              posts={allPosts}
              section={"Trending"}
              dataLoading={dataLoading}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </InfiniteScroll>
        </div>
        <div
          className="xl:block hidden"
          id="side-profile"
          style={{ minWidth: "30%" }}
        >
          <SideProfile
            session={session}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
}
