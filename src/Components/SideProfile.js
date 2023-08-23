"use client";
import { useEffect, useState } from "react";
import UserIds from "./UserIds";
import Link from "next/link";
import Skeleton from "./Skeleton";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SideProfile({ session, currentUser }) {
  const [dataLoading, setDataLoading] = useState(false);
  const [allUsers, setUsers] = useState([]);
  const router = useRouter();

  const fetchRelatedUsers = async () => {
    try {
      setDataLoading(true);
      const response = await fetch("/api/users/allUsers");
      const data = await response.json();
      Array.isArray(data) ? setUsers(data) : setUsers([data]);
      setDataLoading(false);
    } catch (error) {
      console.log("failed to get quotes", error);
    }
  };

  useEffect(() => {
    if (currentUser.username === "") {
      router.push(
        `/login/getusername/${
          session?.user.id || localStorage.getItem("Sufferer-site-userId")
        }`
      );
      toast.error(`Permission Denied`, {
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
    if (window.innerWidth > 640) {
      fetchRelatedUsers();
    }
  }, [session?.user.id, localStorage.getItem("Sufferer-site-userId")]);

  return (
    <div className="h-screen flex flex-col justify-evenly gap-10 px-8 py-12 fixed border-l-2 border-gray-700 select-none">
      {!dataLoading ? (
        <Link
          href="/profile"
          data-te-toggle="tooltip"
          data-te-placement="bottom"
          data-te-ripple-init
          data-te-ripple-color="dark"
          title="Open Profile"
          className="flex gap-4 items-center cursor-pointer group justify-start
          w-full" >
          <img
            src={
              currentUser.image ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            alt="d"
            className="h-16 w-16 rounded-full object-cover"
          />
          <span>
            <p className="text-2xl">@{currentUser.username || ""}</p>
            <p className="text-gray-500 dark:text-gray-400">
              {currentUser.given_name || currentUser.username}{" "}
              {currentUser.family_name || ""}
            </p>
          </span>
        </Link>
      ) : (
        <Skeleton type={"userId"} />
      )}
      <div className="flex flex-col gap-4">
        <div className="text-xl">People You May Know</div>
        {dataLoading ? (
          <Skeleton type="sideProfile" />
        ) : (
          <>
            {allUsers.slice(0, 5).map((user) => {
              return (
                <UserIds
                  heading="People You May Know"
                  key={user._id}
                  username={user.username}
                  user_image={user.image}
                  userId={user._id}
                  given_name={user.given_name}
                  family_name={user.family_name}
                />
              );
            })}
          </>
        )}
      </div>
      <div className="flex items-start justify-center flex-col gap-2">
        <div className="w-full flex items-end justify-start gap-2">
          <p className="text-sm">Learn About This Project</p>
          <Link
            className="border-2 rounded-full bg-white h-6 w-6 flex items-center justify-center  "
            href="/projectrepo"
            prefetch={true}
          >
            <i className="fa-solid fa-info text-sm text-slate-800"></i>
          </Link>
        </div>
        <div className="text-xs text-slate-400">
          © 2023 SUFFERER FROM CODENAUTICA
        </div>
      </div>
    </div>
  );
}
