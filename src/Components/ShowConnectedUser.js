"use client";
import { useState, useEffect } from "react";
import UserIds from "./UserIds";
import Skeleton from "./Skeleton";

export default function ({ tabType, userId, setProgress }) {
  const [users, setUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchProg, setSearchProg] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const fetchUsers = async () => {
    setDataLoading(true);
    setProgress(30);
    const response = await fetch(
      `/api/users/getfollowers/${userId}?tabType=${tabType}`
    );
    setProgress(60);
    const data = await response.json();
    setProgress(100);
    setDataLoading(false);
    setUsers(data.reverse());
  };

  const fetchSearchedUser = async (searchInput) => {
    try {
      setDataLoading(true);
      const response = await fetch(
        `/api/users/follow/searchUser/${userId}?searchInput=${searchInput}&searchType=${
          tabType === "followers" ? "searchFollower" : "searchFollowings"
        }`
      );
      const data = await response.json();
      setDataLoading(false);
      Array.isArray(data) ? setUsers(data) : setUsers([data]);
    } catch (error) {
      console.log("failed to get quotes", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchProg(true);
    if (searchInput === "") {
      fetchUsers();
    } else {
      fetchSearchedUser(searchInput);
    }
  };

  useEffect(() => {
    users.length === 0 && fetchUsers();
  }, []);

  return (
    <div className="h-full w-screen fixed top-0 left-0 flex items-center justify-center bg-black z-40  text-white">
      <div className="w-3/4 h-full mt-36 flex flex-col items-center justify-start gap-4">
        <div className="flex w-full justify-center items-center text-2xl">
          <div className="text-2xl mb-2">
            {searchProg ? (
              "Results"
            ) : (
              <>{tabType === "followers" ? "Followers" : "Followings"}</>
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center justify-between p-2 border-2 border-slate-700 rounded-lg"
        >
          <input
            type="text"
            className="bg-transparent outline-none w-full h-full"
            placeholder="Search Users"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="p-2" type="submit">
            <svg
              className="w-4 h-4 text-gray-400 dark:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </form>
        <div className="w-full h-full flex flex-col gap-4">
          {dataLoading ? (
            <Skeleton type="sideProfile" />
          ) : (
            <>
              {users.length <= 0 ? (
                <>
                {searchProg ? "User Not Found" : "Introvert Don't Have Friends"}
                </>
              ) : (
                <>
                  {users.map((follower) => {
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
