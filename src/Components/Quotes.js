import React from "react";
import QuoteItem from "./QuoteItem";
import Skeleton from "./Skeleton";
export default function Quotes({
  posts,
  section,
  dataLoading,
  setData,
}) {
  return (
    <>
      <div
        id="quote-area"
        
        className={`${
          section === "Trending"
            ? "flex justify-center flex-col gap-10 p-2 py-8 pb-16 sm:p-8"
            : "grid gap-6"
        }`}
      >
        <h1 id="quotes-heading" className="text-2xl sm:text-4xl">
          {section} Quotes :
        </h1>
          {dataLoading ? (
            <Skeleton type="quotes" />
          ) : (
            <>
              {posts.length > 0 ? (
                posts.map((post) => {
                  return (
                    <QuoteItem
                      key={post._id}
                      description={post.quote}
                      title={post.title}
                      creator={post.creator}
                      date={post.date || ""}
                      id={post._id}
                      setPosts={setData}
                      posts={posts}
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
