"use client";
import { useEffect, useState } from "react";
import PostQuote from "../../Components/PostQuote";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import PostNewQuote from "@/Components/PostNewQuote";

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const QuoteId = searchParams.get("id");
  const [imageUrl, setImageUrl] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ caption: "", image: "" });

  useEffect(() => {
    const getQuoteDetails = async () => {
      try {
        const response = await fetch(`/api/quote/${QuoteId}`);
        const data = await response.json();
        setPost({
          caption: data.caption,
          image: data.image,
        });
      } catch (error) {
        console.log(error, "Something wrong happened");
      }
    };

    if (QuoteId) getQuoteDetails();
  }, [QuoteId]);

  const updateQuote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (imageUrl) {
      const formData = new FormData();
      formData.append("file", imageUrl);
      formData.append("upload_preset", "gmgscbus");
      const ImageResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dlhxapeva/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const imageJsonData = await ImageResponse.json();
      var usrCldImage = imageJsonData.url;
      setPost({...post, image:imageJsonData.url});
    }

    if (!QuoteId) return setIsSubmitting(false);

    try {
      const response = await fetch(`/api/quote/${QuoteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          caption: post.caption,
          image: usrCldImage || post.image,
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
    <div className="w-screen h-full flex items-center justify-center flex-col my-16">
      <h1 className="text-4xl font-bold text-start w-3/4 h-full text-white mb-16">
        Edit Quote
      </h1>
      <PostNewQuote
        handleSubmit={updateQuote}
        submitting={isSubmitting}
        setPost={setPost}
        post={post}
        setImageUrl={setImageUrl}
      />
    </div>
  );
}
