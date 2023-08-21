"use client";
import PostQuote from "@/Components/PostQuote";
import PostNewQuote from "@/Components/PostNewQuote";
import Loading from "@/Components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function create() {
  const [post, setPost] = useState({ caption: "", image: "" });
  const router = useRouter();
  const { data: session, status } = useSession();
  const [imageUrl, setImageUrl] = useState(null)
  const [submitting, setIsSubmitting] = useState(false);

  const createQuote = async (e) => {
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
      setPost({...post, image:imageJsonData.url});
    }

    try {
      const response = await fetch("/api/quote/new", {
        method: "POST",
        body: JSON.stringify({
          caption: post.caption,
          userId:
            session?.user.id || localStorage.getItem("Sufferer-site-userId"),
          image: post.image,
        }),
      });
      if (response.ok) {
        router.push("/profile");
        toast.success(`Post is now live`, {
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
    if (localStorage.getItem("Sufferer-site-authToken")) {
    } else if (!session?.user.id || status === "unauthenticated") {
      router.push("/");
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
  }, [session?.user.id]);

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="w-full h-full flex items-center justify-center flex-col py-8 mb-8 p-4">
      <h1 className="text-4xl sm:text-2xl font-bold text-start w-full sm:w-3/4 text-white mb-16">
        Create Post
      </h1>
      <PostNewQuote
        handleSubmit={createQuote}
        submitting={submitting}
        setPost={setPost}
        post={post}
        setImageUrl={setImageUrl}
      />
    </div>
  );
}
