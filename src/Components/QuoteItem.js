"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "../styles/profile.css"

export default function QuoteItem({
  title,
  creator,
  date,
  id,
  setPosts,
  posts,
  post,
  section,
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [postTime, setPostTime] = useState("");
  const router = useRouter();
  const [postLiked, setPostLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [postInfo, setPostInfo] = useState({
    likes: [],
    comments: [],
    shares: 0,
  });
  const [togglePostInfo, setTogglePostInfo] = useState(false);

  const handleDelete = async () => {
    const hasConfirmed = confirm(`Do your really want to delete ${title}`);

    if (hasConfirmed) {
      toast.info(`Post Deleted`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      try {
        await fetch(`/api/quote/${id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((item) => item._id !== id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info(`Your Post Is Safe`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handlePostLike = async () => {
    try {
      const response = await fetch(`/api/quote/like`, {
        method: "PATCH",
        body: JSON.stringify({
          userId:
            session?.user.id || localStorage.getItem("Sufferer-site-userId"),
          postId: id,
        }),
      });
      const data = await response.json();
      setPostInfo({
        likes: await data.likedPost.likes,
        comments: await data.likedPost.comments,
        shares: await data.likedPost.shares,
      });

      if (data.status !== 200) {
        throw new Error(data.message || "Something went wrong");
      }
      // Handle successful response, update state, etc.
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false); // Reset the flag after the request completes
    }
  };

  const handlePostSave = async () => {
    try {
      const response = await fetch(`/api/quote/save`, {
        method: "PATCH",
        body: JSON.stringify({
          userId:
            session?.user.id || localStorage.getItem("Sufferer-site-userId"),
          postId: id,
        }),
      });
      const data = await response.json();
      setPosts()
      if (data.status !== 200) {
        throw new Error(data.message || "Something went wrong");
      }
      // Handle successful response, update state, etc.
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false); // Reset the flag after the request completes
    }
  };

  const throttledHandlePostLike = async () => {
    if (!isFetching) {
      setIsFetching(true); // Set the flag to indicate an ongoing request
      await handlePostLike();
    }
  };

  const HandlePostLike = () => {
    if (postLiked) {
      setPostLiked(false);
      throttledHandlePostLike();
    } else {
      setPostLiked(true);
      throttledHandlePostLike();
    }
  };

  const handleUserIdClick = () => {
    if (creator._id === session?.user.id) return router.push(`/profile`);
    router.push(`/profile/${creator._id}?name=${creator.username}`);
  };
  const handleEditClick = () => {
    router.push(`/updatepost/?id=${id}`);
  };
  useEffect(() => {
    if (post) {
      setPostInfo({
        likes: post.likes,
        comments: post.comments,
        shares: post.shares,
      });
    }
    const today = new Date();
    const jsonDate = new Date(parseFloat(date)); // converting to date

    const timeDifference = Math.floor((today - jsonDate) / (60 * 1000)); // Time difference in minutes

    if (timeDifference < 60) {
      // Less than 1 hour
      setPostTime(`${timeDifference}m ago`);
    } else if (timeDifference < 1440) {
      // Less than 24 hours
      const hoursDifference = Math.floor(timeDifference / 60);
      setPostTime(`${hoursDifference}h ago`);
    } else {
      // More than 24 hours
      const daysDifference = Math.floor(timeDifference / 1440);
      setPostTime(`${daysDifference}d ago`);
    }
  }, [date, post]);
  return (
    <div
      className={`text-white ${
        section === "Trending" ? "lg:w-3/4 w-full" : "lg:w-3/4 w-full"
      } h-fit bg-black border border-slate-500 sm:rounded-3xl rounded-xl flex flex-col items-center justify-between`}
      id={id}
    >
      <div className="w-full h-fit p-2 sm:p-4">
        {/* User Profile  */}
        <div className="w-full flex items-center justify-between pb-2 sm:pb-4">
          <div
            className="w-fit flex items-center justify-start gap-4 overflow-hidden cursor-pointer"
            onClick={handleUserIdClick}
          >
            <img
              draggable="false"
              src={creator.image}
              alt="not found"
              className="h-8 w-8 rounded-full object-cover select-none"
            />
            <span className="flex items-center justify-center">
              <div className="sm:text-lg text-sm flex items-center justify-center gap-0 sm:gap-1 sm:flex-row flex-col select-none">
                @{creator.username}
                <span className="text-slate-400 sm:inline hidden">·</span>
                <span className="text-xs text-slate-400 sm:text-sm self-start sm:self-center h-full">
                  {postTime}
                </span>
              </div>
            </span>
          </div>
          <div className="flex gap-6 items-center justify-center">
            <div
              className="w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={() => setTogglePostInfo(true)}
            >
              <i className="fa-solid fa-ellipsis-vertical fa-rotate-90 mr-2 cursor-pointer select-none"></i>
            </div>

            {/* Post Info */}
            {togglePostInfo && (
              <div
                className="h-screen w-screen flex items-center justify-center backdrop-blur-sm fixed top-0 left-0 z-50 select-none"
                onClick={() => setTogglePostInfo(false)}
              >
                <div className="bg-black w-screen h-screen absolute z-20 opacity-60"></div>
                <div className="h-fit p-2 w-64 bg-slate-800 rounded-3xl relative z-30" id="post-info">
                  <div className="w-full h-full">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 w-full h-full flex items-center justify-center gap-2 flex-col">
                      <li className="px-4 py-2 hover:rotate-2 cursor-pointer transition-all">
                        <i className={`fa-${postSaved ? "solid" : "regular"} fa-bookmark mr-2`} onClick={()=>setPostSaved(!postSaved)}>

                        </i>
                        Save
                      </li>
                      <li className="w-full h-[1px] bg-slate-400"></li>
                      {pathname === "/profile" ? (
                        <>
                          <li
                            className="block px-4 py-2 hover:rotate-2 cursor-pointer transition-all"
                            onClick={handleEditClick}
                          >
                            <i className="fa-solid fa-pen-to-square cursor-pointer mr-2"></i>
                            Edit Post
                          </li>
                          <li className="w-full h-[1px] bg-slate-400"></li>
                          <li
                            className="px-4 py-2 hover:rotate-2 cursor-pointer transition-all"
                            onClick={handleDelete}
                          >
                            <i className="fa-solid fa-trash cursor-pointer mr-2"></i>
                            Delete Post
                          </li>
                          <li className="w-full h-[1px] bg-slate-400"></li>
                        </>
                      ) : (
                        <></>
                      )}
                      <li className="px-4 py-2 hover:rotate-2 cursor-pointer transition-all text-red-500">
                        <i className="fa-regular fa-flag mr-2"></i>
                        Report Post
                      </li>
                      <li className="w-full h-[1px] bg-slate-400"></li>
                      <li className="px-4 py-2 hover:rotate-2 cursor-pointer transition-all">
                        <i className="fa-regular fa-copy mr-2"></i>
                        Copy Link
                      </li>
                      <li className="w-full h-[1px] bg-slate-400"></li>
                      <li className="px-4 py-2 hover:rotate-2 cursor-pointer transition-all">
                        <i className="fa-regular fa-eye-slash mr-2"></i>I don't
                        want to see this
                      </li>
                      <li className="w-full h-[1px] bg-slate-400"></li>
                      <li className="hover:rotate-2 cursor-pointer transition-all px-4 py-2">
                        <i
                          className="fa-solid fa-xmark mr-2"
                          onClick={() => setTogglePostInfo(false)}
                        ></i>
                        Cancel
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-[1px] bg-slate-500 self-center"></div>
      </div>
      {/* Post Body  */}
      <div
        className="w-full h-fit overflow-hidden px-2 sm:px-4"
        id="quote-item"
      >
        <p className="text-gray-400 text-start sm:text-lg whitespace-pre-line text-sm h-fit">
          {post.caption}
        </p>
      </div>
      {post.image && (
        <div className="w-full h-full mt-2 relative overflow-hidden">
          <div className=" h-full w-full p-2">
            <img
              src={post.image}
              alt="Not found"
              className="w-full max-h-96 h-full object-contain select-none rounded-sm"
            />
          </div>
        </div>
      )}
      <div className="w-full px-4">
        <div className="mt-2 flex justify-between items-center w-full text-xs ">
          <p className="flex gap-1 items-center justify-center">
            <i className="fa-solid fa-heart"></i>
            {postInfo.likes && postInfo.likes.length}
          </p>
          <div className="flex gap-2">
            <p className="flex gap-1 items-center justify-center">
              <i className="fa-regular fa-comment"></i>
              {postInfo.likes && postInfo.comments.length}
            </p>
            <p className="flex gap-1 items-center justify-center">
              <i className="fa-solid fa-share "></i>
              {postInfo.likes && (postInfo.shares || 0)}
            </p>
          </div>
        </div>
        {/* <div className="w-full h-[1px] bg-slate-500 self-center mt-2"></div> */}
        <div className="flex items-center justify-start gap-4 w-full py-2 sm:py-4">
          <div className="flex flex-col items-center justify-center">
            <i
              className={`fa-${
                postInfo.likes &&
                (postInfo.likes.includes(
                  session?.user.id ||
                    localStorage.getItem("Sufferer-site-userId")
                ) ||
                  postLiked)
                  ? "solid"
                  : "regular"
              } fa-heart cursor-pointer transition duration-300 text-lg sm:text-2xl`}
              onClick={HandlePostLike}
            ></i>
          </div>
          <div className="flex flex-col items-center justify-center">
            <i className="fa-regular fa-comment text-lg sm:text-2xl cursor-pointer"></i>
          </div>
          <div className="flex flex-col items-center justify-center">
            <i className="fa-solid fa-share text-lg sm:text-2xl cursor-pointer"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
