import React from "react";
import QuoteItem from "./QuoteItem";
import Skeleton from "./Skeleton";
import Link from "next/link";
export default function Quotes({
  posts,
  section,
  dataLoading,
  setData,
  currentUser,
  setCurrentUser,
  pathname,
}) {
  return (
    <div
      id="quote-area"
      className={`${
        section === "Trending"
          ? "flex justify-center items-center flex-col gap-6 p-2 py-8 pb-16 sm:p-8"
          : "flex items-center justify-center flex-col gap-6 mt-10"
      }`}
    >
      {section === "Trending" && (
        <div className="w-3/4 self-center flex items-center justify-center flex-col gap-2">
          <h1
            id="quotes-heading"
            className="text-2xl sm:text-4xl w-full text-center"
          >
            FEED
          </h1>
          <div className="h-[1px] w-1/2 bg-slate-400"></div>
        </div>
      )}
      {dataLoading ? (
        <Skeleton type="quotes" />
      ) : (
        <>
          {posts.length > 0 ? (
            posts.map((post) => {
              return (
                <QuoteItem
                  currentUser={currentUser}
                  key={post._id}
                  creator={post.creator}
                  date={post.date || ""}
                  id={post._id}
                  setCurrentUser={setCurrentUser}
                  setPosts={setData}
                  posts={posts}
                  post={post}
                  section={section}
                />
              );
            })
          ) : (
            <div className="text-white">
              {section === "Trending" ? (
                "Posts are not available"
              ) : (
                <>
                  <div>User hasn't post yet</div>
                  {pathname === "/profile" && (
                    <>
                      <Link
                        href="/createpost"
                        className="h-96 flex items-center justify-center flex-col gap-2 cursor-pointer "
                      >
                        <i className="fa-solid fa-camera text-6xl hover:scale-110 hover:text-yellow-500 transition duration-300"></i>
                        Post Your First Post
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
