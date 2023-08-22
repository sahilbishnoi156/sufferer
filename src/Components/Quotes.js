import React from "react";
import QuoteItem from "./QuoteItem";
import Skeleton from "./Skeleton";
export default function Quotes({ posts, section, dataLoading, setData }) {
  return (
    <>
      <div
        id="quote-area"
        className={`${
          section === "Trending"
            ? "flex justify-center items-center flex-col gap-6 p-2 py-8 pb-16 sm:p-8"
            : "flex gap-12 mt-10 sm:flex-row flex-col sm:items-start  justify-center items-center"
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
                    key={post._id}
                    creator={post.creator}
                    date={post.date || ""}
                    id={post._id}
                    setPosts={setData}
                    posts={posts}
                    post={post}
                  />
                );
              })
            ) : (
              <div className="text-white">
                {section === "Trending"
                  ? "Posts are not available"
                  : "User hasn't post yet"}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
