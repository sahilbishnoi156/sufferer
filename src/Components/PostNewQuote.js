"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";

export default function PostNewQuote({
  post,
  handleSubmit,
  setImageUrl,
  setPost,
  submitting,
}) {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const [currentTime, setCurrentTime] = useState("");

  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageUrl(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPost({ ...post, image: url });
    }
  };

  const fetchUser = async () => {
    const response = await fetch(
      `/api/users/getUser/${
        session?.user.id || localStorage.getItem("Sufferer-site-userId")
      }`
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
    fetchUser();
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full sm:w-3/4 h-full">
        <div className="text-white w-full sm:w-full h-fit bg-black border border-slate-500 sm:rounded-3xl rounded-xl flex flex-col items-center justify-between">
          <div className="w-full h-fit p-2 sm:p-4">
            <div className="w-full flex items-center justify-between pb-2 sm:pb-4">
              <div className="w-fit flex items-center justify-start gap-4 overflow-hidden cursor-pointer">
                <img
                  src={user.image}
                  alt="not found"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="flex items-center justify-center">
                  <div className="sm:text-lg text-sm flex items-center justify-center gap-0 sm:gap-1 sm:flex-row flex-col">
                    @{user.username}
                    <span className="text-slate-400 sm:inline hidden">·</span>
                    <span className="text-xs text-slate-400 sm:text-sm self-start sm:self-center h-full">
                      {new Date(currentTime).toLocaleTimeString()}
                    </span>
                  </div>
                </span>
              </div>
            </div>
            <div className="w-full h-[1px] bg-slate-500 self-center"></div>
          </div>
          <div
            className="w-full h-fit overflow-hidden px-2 sm:px-4"
            id="quote-item"
          >
            <p className="text-gray-400 text-justify sm:text-lg text-sm h-fit">
              <textarea
                name="Caption"
                value={post.caption}
                rows={4}
                onChange={(e)=>setPost({ ...post, caption: e.target.value })}
                className="w-full bg-transparent outline-none resize-none h-full"
                placeholder="Caption"
              />
            </p>
          </div>
          {post.image && (
            <div className="w-full h-96 mt-2">
              <img
                src={post.image}
                alt="Uploaded"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="mt-2 flex justify-between items-center w-full px-2 sm:px-4  text-xs">
            <p className="flex gap-1 items-center justify-center">
              <i className="fa-solid fa-heart"></i>0
            </p>
            <div className="flex gap-2">
              <p className="flex gap-1 items-center justify-center">
                <i className="fa-regular fa-comment"></i>0
              </p>
              <p className="flex gap-1 items-center justify-center">
                <i className="fa-solid fa-share cursor-pointer"></i>0
              </p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-slate-500 self-center mt-2 "></div>
          <div className="flex justify-between items-center  px-2 sm:px-4 gap-4 w-full py-2 sm:py-4">
            <div className="flex items-center justify-start gap-4">
              <div className="flex flex-col items-center justify-center">
                <i
                  className={`fa-regular fa-heart cursor-pointer transition duration-300 text-lg sm:text-2xl`}
                ></i>
              </div>
              <div className="flex flex-col items-center justify-center">
                <i className="fa-regular fa-comment text-lg sm:text-2xl cursor-pointer"></i>
              </div>
              <div className="flex flex-col items-center justify-center">
                <i className="fa-solid fa-share text-lg sm:text-2xl cursor-pointer"></i>
              </div>
            </div>
            <div className="flex">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />
              <i
                className="fa-solid fa-photo-film hover:scale-110 transition-all cursor-pointer"
                onClick={handleImageUpload}
              ></i>
            </div>
          </div>
        </div>
        <div className="w-3/4 mt-6">
          {submitting ? (
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow  hover:bg-indigo-400"
            >
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm leading-6 text-white bg-indigo-500 rounded-md shadow hover:bg-indigo-400"
            >
              <i className="fa-solid fa-share text-sm text-white mr-2"></i>
              Share
            </button>
          )}
        </div>
      </form>
    </>
  );
}
