"use client";
import PostQuote from "@/Components/PostQuote";
import Loading from "@/Components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function create() {
  const [post, setPost] = useState({ quote: "", title: "" });
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setIsSubmitting] = useState(false);

  const createQuote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quote/new", {
        method: "POST",
        body: JSON.stringify({
          quote: post.quote,
          userId: session?.user.id || localStorage.getItem("userId"),
          title: post.title,
        }),
      });
      if (response.ok) {
        router.push("/profile");
        toast.success(`${post.title} is now live`, {
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      
    }
    else if (!session?.user.id || status === "unauthenticated") {
      router.push("/")
      toast.warn("Permission denied", {
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
  }, [session?.user.id])
  
  if (status === "loading") {
    return <Loading/>
  }
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold text-start w-3/4 text-white mb-16">Create Quote</h1>
      <PostQuote
        handleSubmit={createQuote}
        submitting={submitting}
        setPost={setPost}
        post={post}
      />
    </div>
  );
}
