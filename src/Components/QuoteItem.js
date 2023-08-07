"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function QuoteItem({ description, title, creator, date, id , setPosts,posts}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [quoteTime, setQuoteTime] = useState("");
  const router = useRouter();
  const [quoteDate, setQuoteDate] = useState("");

  const handleDelete = async () => {
    const hasConfirmed = confirm(`Do your really want to delete ${title}`)

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
    }
    else{
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
  const handleEditClick = () => {
    router.push(`/updatepost/?id=${id}`);
  };
  useEffect(() => {
    const jsonDate = new Date(parseFloat(date)); //converting to date
    setQuoteDate(
      jsonDate.getMonth() +
        1 +
        "-" +
        jsonDate.getDate() +
        "-" +
        jsonDate.getFullYear()
    );
    setQuoteTime(jsonDate.getHours() + ":" + jsonDate.getMinutes());
  }, [posts]);
  return (
    <div className="text-white w-full min-h-full border-2 border-gray-400 sm:rounded-3xl rounded-xl flex flex-col items-center justify-between" id={id}>
      <div className="w-full flex items-center justify-between sm:h-20 h-12 border-b-2 border-gray-800 px-4">
        <div className="w-full h-full flex items-center justify-start gap-4 overflow-hidden">
          <img
            src={creator.image}
            alt="d"
            className="sm:h-10 sm:w-10 h-8 w-8 rounded-full object-cover "
          />
          <span className="">
            <button
              className="hover:underline sm:text-lg text-sm"
              onClick={handleUserIdClick}
            >
              @{creator.username}
            </button>
            <p className="text-gray-300 text-xs ml-4 relative bottom-1">{creator.username}</p>
          </span>
        </div>
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
      <div className="w-full h-10 border-t-2 border-gray-800 px-4 flex items-center justify-between">
        <span className="text-sm sm:text-lg">Date : {quoteDate}</span>
        <span className="text-sm sm:text-lg">{quoteTime}</span>
      </div>
    </div>
  );
}
