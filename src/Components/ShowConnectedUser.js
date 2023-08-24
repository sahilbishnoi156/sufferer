"use client";
import { useState, useEffect } from "react";
import UserIds from "./UserIds";
import Skeleton from "./Skeleton";
import Search from "./Search";

export default function ({ tabType, userId, setProgress, closeTab }) {
  const [searchInput, setSearchInput] = useState("");
  const [followers, setFollowers] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchProg, setSearchProg] = useState(false);

  const fetchFollowers = async () => {
    setDataLoading(true);
    setProgress(30);
    const response = await fetch(
      `/api/users/getfollowers/${userId}?tabType=${tabType}`
    );
    setProgress(60);
    const data = await response.json();
    setProgress(100);
    setDataLoading(false);
    setFollowers(data);
  };

  useEffect(() => {
    followers.length === 0 && fetchFollowers();
  }, []);

  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-black z-40 ">
      <div className="w-3/4 h-full mt-36 flex flex-col items-center justify-start gap-4">
        <div className="flex w-full justify-between text-2xl">
          <i
            className="fa-solid fa-xmark  cursor-pointer"
            onClick={() => closeTab(false)}
          ></i>
          <div className="text-2xl mb-2">
            {searchProg ? (
              "Results"
            ) : (
              <>{tabType === "followers" ? "Followers" : "Followings"}</>
            )}
          </div>
          ‎{" "}
        </div>
        <Search
          setDataLoading={setDataLoading}
          setSearchProg={setSearchProg}
          setUsers={setFollowers}
          fetchUsers={fetchFollowers}
        />
        <div className="w-full h-full flex flex-col gap-4">
          {dataLoading ? (
            <Skeleton type="sideProfile" />
          ) : (
            <>
              {followers.map((follower) => {
                return (
                  <UserIds
                    username={follower.username}
                    userId={follower._id}
                    user_image={follower.image}
                    given_name={follower.given_name}
                    family_name={follower.family_name}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
