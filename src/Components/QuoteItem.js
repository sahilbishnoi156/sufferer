"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function QuoteItem({
  description,
  title,
  creator,
  date,
  id,
  setPosts,
  posts,
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [quoteTime, setQuoteTime] = useState("");
  const router = useRouter();
  const [postLiked, setPostLiked] = useState(false);
  const [quoteDate, setQuoteDate] = useState("");

  const handleDelete = async () => {
    const hasConfirmed = confirm(`Do your really want to delete ${title}`);

    if (hasConfirmed) {
      toast.info(`${title} Deleted`, {
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
      toast.info(`${title} is Safe`, {
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

  const handleUserIdClick = () => {
    if (creator._id === session?.user.id) return router.push(`/profile`);
    router.push(`/profile/${creator._id}?name=${creator.username}`);
  };

  const HandlePostLike = () => {
    if (postLiked) {
      setPostLiked(false);
    } else {
      setPostLiked(true);
    }
  };
  const handleEditClick = () => {
    router.push(`/updatepost/?id=${id}`);
  };
  useEffect(() => {
    const today = new Date();
    const jsonDate = new Date(parseFloat(date)); // converting to date

    const timeDifference = Math.floor((today - jsonDate) / (60 * 1000)); // Time difference in minutes

    if (timeDifference < 60) {
      // Less than 1 hour
      setQuoteTime(`${timeDifference}m ago`);
    } else if (timeDifference < 1440) {
      // Less than 24 hours
      const hoursDifference = Math.floor(timeDifference / 60);
      const minutesDifference = timeDifference % 60;
      setQuoteTime(`${hoursDifference}h ${minutesDifference}m ago`);
    } else {
      // More than 24 hours
      const daysDifference = Math.floor(timeDifference / 1440);
      setQuoteTime(`${daysDifference}d ago`);
    }
  }, [date]);
  return (
    <div
      className="text-white w-full min-h-full border-2 border-gray-400 sm:rounded-3xl rounded-xl flex flex-col items-center justify-between"
      id={id}
    >
      <div className="w-full flex items-center justify-between border-b-2 border-gray-800 px-4 py-2">
        <div
          className="w-fit h-full flex items-center justify-start gap-4 overflow-hidden cursor-pointer"
          onClick={handleUserIdClick}
        >
          <img
            src={creator.image}
            alt="not found"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="flex items-center justify-center">
            <div className="sm:text-lg text-sm flex items-center justify-center gap-1">
              @{creator.username}
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-400 sm:text-sm">
                {quoteTime}
              </span>
            </div>
          </span>
        </div>
        <div className="flex gap-6 items-center justify-center">
          {pathname === "/profile" ? (
            <div className="flex gap-4 items-center justify-center">
              <i
                className="fa-solid fa-pen-to-square cursor-pointer"
                onClick={handleEditClick}
              ></i>
              <i
                className="fa-solid fa-trash cursor-pointer"
                onClick={handleDelete}
              ></i>
            </div>
          ) : (
            <></>
          )}
          <i class="fa-solid fa-ellipsis-vertical fa-rotate-90 mr-2 cursor-pointer"></i>
        </div>
      </div>
      <div
        className="w-full max-h-1/2 border2 border-gray-800 sm:p-4 p-2 overflow-hidden"
        id="quote-item"
      >
        <span className="sm:text-xl text-lg">
          <span className="text-green-300 text-base">Quote:</span>&nbsp; {title}
        </span>
        <p className="text-gray-400 text-justify sm:text-lg text-sm">
          {description}
        </p>
      </div>
      <div className="w-full border-t-2 border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center">
            <i
              class={`fa-${
                postLiked ? "solid" : "regular"
              } fa-heart cursor-pointer transition duration-300 text-2xl`}
              onClick={HandlePostLike}
            ></i>
            <p className="te text-[8px]">100k</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <i class="fa-regular fa-comment text-2xl cursor-pointer"></i>
            <p className="te text-[8px]">100k</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <i class="fa-solid fa-share text-2xl cursor-pointer"></i>
            <p className="te text-[8px]">100k</p>
          </div>
        </div>
      </div>
    </div>
  );
}
