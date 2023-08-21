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
            ? "flex justify-center items-center flex-col gap-4 p-2 py-8 pb-16 sm:p-8"
            : "flex gap-12 mt-10 sm:flex-row flex-col sm:items-start  justify-center items-center"
        }`}
      >
        {section === "Trending" && <h1
          id="quotes-heading"
          className="text-2xl sm:text-4xl border-b-2 w-3/4 border-slate-500 text-center mb-4"
        >
          FEED
        </h1>}
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
