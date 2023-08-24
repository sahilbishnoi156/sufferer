import React from "react";

const QuoteSkelton = () => {
  return (
    <div
      role="status"
      className=" flex flex-col gap-4 p-4 border border-gray-200 rounded-2xl shadow animate-pulse md:p-2 dark:border-gray-700 w-3/4 h-full"
    >
      <div className="flex items-center mt-4 space-x-3 border-b-2 pb-2 border-gray-700">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-4"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
      </div>
      <div className="h-32 bg-gray-200 dark:bg-gray-700 w-full mb-4"></div>
      <div>
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};
const IdSkel = () => {
  return (
    <div className="flex justify-start items-center gap-4 w-full">
      <svg
        className="w-16 h-16 text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <div className="flex items-start justify-start flex-col">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
  );
};
const SideProfileSkeleton = () => {
  return (
    <div
      role="status"
      className="max-w-xl space-y-6 rounded shadow animate-pulse md:p-6"
    >
      <IdSkel/>
      <IdSkel/>
      <IdSkel/>
      <IdSkel/>
      <IdSkel/>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

const UserIdSkeleton = ({ dimension, h2 = "3", h1 = "4", w1="32",w2="44" }) => {
  return (
    <div role="status" className="animate-pulse">
      {/* <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
      <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div> */}
      <div className="flex items-center justify-start mt-4">
        <svg
          className={`w-${dimension} h-${dimension} text-gray-200 dark:text-gray-700 mr-4`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="flex flex-col gap-4">
          <div
            className={`w-${w1} h-${h1} bg-gray-200 rounded-full dark:bg-gray-700 mr-3`}
          ></div>
          <div
            className={`w-${w2} h-${h2} bg-gray-200 rounded-full dark:bg-gray-700`}
          ></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default function Skeleton({ type }) {
  return (
    <>
      {type === "quotes" ? (
        <>
          <QuoteSkelton />
        </>
      ) : type === "sideProfile" ? (
        <>
          <SideProfileSkeleton/>
        </>
      ) : type === "userId" ? (
        <>
          <UserIdSkeleton dimension="6" />
        </>
      ) : type === "userProfile" ? (
        <div className="flex flex-col w-11/12 items-center justify-center h-full">
        <div className="border-b-2 w-full pb-8 border-gray-700 flex items-center justify-center">
          <UserIdSkeleton dimension="40" w1="60" h1="12" h2="10" w2="96"/>
        </div>
          <div className="grid w-full grid-cols-2 gap-8 mt-20">
          <div className="w-1/2 h-20 bg-gray-200 rounded-full dark:bg-gray-700 col-span-3"></div>
          <QuoteSkelton />
          <QuoteSkelton />
        </div>
        </div>
      ) : ""}
    </>
  );
}
