"use client";
import { useEffect, useState } from "react";
import PostQuote from "../../Components/PostQuote";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from 'react-toastify';

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const QuoteId = searchParams.get("id");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ quote: "", title: "" });

  useEffect(() => {
    const getQuoteDetails = async () => {
      try {
        const response = await fetch(`/api/quote/${QuoteId}`);
        const data = await response.json();
        console.log(data);
        setPost({
          quote: data.quote,
          title: data.title,
        });
      } catch (error) {
        console.log(error,"Something wrong happened");
      }
    };

    if (QuoteId) getQuoteDetails();
  }, [QuoteId]);

  const updateQuote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!QuoteId) return setIsSubmitting(false);

    try {
      const response = await fetch(`/api/quote/${QuoteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          quote: post.quote,
          title: post.title,
        }),
      });

      if (response.ok) {
        toast.success("Updated Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/profile");
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold text-start w-3/4 text-white mb-16">
        Edit Quote
      </h1>
      <PostQuote
        handleSubmit={updateQuote}
        submitting={isSubmitting}
        setPost={setPost}
        post={post}
      />
    </div>
  );
}
