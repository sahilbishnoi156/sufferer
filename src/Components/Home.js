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
  const [totalPosts, setTotalPosts] = useState(4)
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchData = async () => {
    try {
      setDataLoading(true);
      setProgress(30);
  
      const timestamp = new Date().getTime();
  
      const postsResponse = await fetch(
        `/api/quote?sLimit=${0}&eLimit=${dataLimit}&timestamp=${timestamp}`
      );
      const postsData = await postsResponse.json();
  
      const userResponse = await fetch(
        `/api/users/getUser/${
          session?.user.id || localStorage.getItem("Sufferer-site-userId")
        }`
      );
      const user = await userResponse.json();
      setTotalPosts(postsData.totalPosts)
      setDataLoading(false);
      setAllPosts(postsData.posts);
      setCurrentUser(user);
      setProgress(100);
    } catch (error) {
      console.log("Failed to get data", error);
    }
  };
  

  const fetchMoreData = async () => {
    const newStartLimit = dataLimit;
    const newEndLimit = newStartLimit + 4;
    const timestamp = new Date().getTime();
    const response = await fetch(
      `/api/quote?sLimit=${newStartLimit}&eLimit=${newEndLimit}&timestamp=${timestamp}`
    );
  
    const data = await response.json();
    setAllPosts((prevPosts) => [...prevPosts, ...data.posts]);
    setDataLimit(newEndLimit);
    setHasMoreData(data.totalPosts > newEndLimit);
  };
  

  const Loader = () => (
    <div className="w-full flex items-center justify-center">
      <h2 className="text-white">Loading...</h2>
    </div>
  );
  
  useEffect(() => {
    fetchData();
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
            dataLength={totalPosts}
            next={fetchMoreData}
            hasMore={hasMoreData}
            loader={<Loader />}
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
