"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "../styles/profile.css";
import Link from "next/link";

export default function QuoteItem({
  creator,
  date,
  id,
  setPosts,
  posts,
  post,
  currentUser,
  setCurrentUser,
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [postTime, setPostTime] = useState("");
  const router = useRouter();
  const [isFetchingLike, setIsFetchingLike] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const [isFetchingSave, setIsFetchingSave] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [textCopied, setTextCopied] = useState(false);
  const [reportPost, setReportPost] = useState(false);
  const [postInfo, setPostInfo] = useState({
    likes: [],
    comments: [],
    shares: 0,
  });
  const [togglePostInfo, setTogglePostInfo] = useState(false);

  const handleDelete = async () => {
    const hasConfirmed = confirm(`Do your really want to delete this post`);

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

  const handlePostLiking = async () => {
    try {
      if (!isFetchingLike) {
        setIsFetchingLike(true);
        // Optimistic UI update
        setPostLiked(!postLiked);

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
          likes: data.likedPost.likes,
          comments: data.likedPost.comments,
          shares: data.likedPost.shares,
        });

        if (data.status !== 200) {
          throw new Error(data.message || "Something went wrong");
        }

        setPostLiked(!postLiked); // Toggle the like state
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingLike(false);
    }
  };

  const handlePostSaving = async () => {
    // Optimistic UI update
    setPostSaved(!postSaved);

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
      setCurrentUser(data.foundUser);

      if (data.status !== 200) {
        throw new Error(data.message || "Something went wrong");
      }
      // Handle successful response, update state, etc.
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingSave(false);
    }
  };

  const throttledHandlePostSave = async () => {
    if (!isFetchingSave) {
      setIsFetchingSave(true);
      await handlePostSaving();
    }
  };

  const handleTogglePostSave = () => {
    setPostSaved(!postSaved);
    throttledHandlePostSave();
  };

  const throttledHandlePostLike = async () => {
    if (!isFetchingLike) {
      setIsFetchingLike(true); // Set the flag to indicate an ongoing request
      await handlePostLiking();
    }
  };

  const handleCopyLink = async () => {
    setTextCopied(true);
    navigator.clipboard.writeText(`https://sufferer.vercel.app/post/${id}`);
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
    if (pathname !== "/profile") {
      if (creator._id === session?.user.id) return router.push(`/profile`);
      router.push(`/profile/${creator._id}?name=${creator.username}`);
    }
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
      className={`text-white lg:w-3/4 w-full h-fit bg-black border border-slate-500 sm:rounded-3xl rounded-xl flex flex-col items-center justify-between relative`}
      id={id}
    >
      {/* DropDown */}
      {togglePostInfo && (
        <div
          className="absolute h-full w-full backdrop-blur-lg rounded-3xl z-50"
        >
          <div
            id="post-info"
            className="w-full xl:w-1/3 scale-125 opacity-0 h-fit absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-slate-700 px-4 rounded-2xl"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 w-full h-full flex items-center justify-center gap-2 flex-col ">
              <li
                className="px-4 py-2 hover:rotate-2 cursor-pointer transition-all"
                onClick={() => {
                  setPostSaved(!postSaved);
                  handleTogglePostSave();
                }}
              >
                <i
                  className={`fa-${
                    postSaved ||
                    (currentUser.savedPosts &&
                      currentUser.savedPosts.includes(id))
                      ? "solid"
                      : "regular"
                  } fa-bookmark mr-2`}
                ></i>
                {currentUser.savedPosts.includes(id) ? "Saved" : "Save"}
              </li>
              <li className="w-full h-[1px] bg-slate-400"></li>
              {post.creator._id === (session?.user.id || localStorage.getItem("Sufferer-site-userId")) ? (
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
                    className="px-4 py-2 hover:rotate-2 text-red-400 cursor-pointer transition-all"
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
              <li
                className="px-4 py-2 hover:rotate-2 cursor-pointer transition-all text-red-500 brightness-150"
                onClick={() => setReportPost(!reportPost)}
              >
                {reportPost ? (
                  <>
                    <i className="fa-regular fa-circle-check mr-2 "></i>
                    Reported
                  </>
                ) : (
                  <>
                    {" "}
                    <i className="fa-regular fa-flag mr-2"></i>
                    Report Post
                  </>
                )}
              </li>
              <li className="w-full h-[1px] bg-slate-400"></li>
              <li
                className="px-4 py-2 hover:rotate-2 cursor-pointer transition-all"
                onClick={handleCopyLink}
              >
                {!textCopied ? (
                  <>
                    <i className="fa-regular fa-copy mr-2"></i>
                    Copy Link
                  </>
                ) : (
                  <>
                    <i className="fa-regular fa-circle-check mr-2 "></i>
                    Copied
                  </>
                )}
              </li>
              <li className="w-full h-[1px] bg-slate-400"></li>
              <li className="px-4 py-2 hover:rotate-2 cursor-pointer transition-all">
                <Link href={`/post/${id}`} className="h-full w-full">
                  <i className="fa-regular fa-eye-slash mr-2"></i>Go to post
                </Link>
              </li>
              <li className="w-full h-[1px] bg-slate-400"></li>
              <li
                className="hover:rotate-2 cursor-pointer transition-all px-4 py-2"
                onClick={() => setTogglePostInfo(false)}
              >
                <i className="fa-solid fa-xmark mr-2"></i>
                Cancel
              </li>
            </ul>
          </div>
        </div>
      )}
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
          <div className="flex gap-6 items-center justify-center relative">
            <div
              className="w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={() => setTogglePostInfo(!togglePostInfo)}
            >
              <i className="fa-solid fa-ellipsis-vertical fa-rotate-90 mr-2 cursor-pointer select-none"></i>
            </div>
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
        <div className="w-full h-full mt-2 overflow-hidden">
          <div className=" h-full w-full p-2">
            <img
              src={post.image}
              alt="Not found"
              draggable="false"
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
