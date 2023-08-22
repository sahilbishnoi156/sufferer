"use client";
import "../styles/profile.css";
import Quotes from "@/Components/Quotes";
import Loading from "../Components/Loading";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MainProfile({
  data,
  section,
  setData,
  user,
  loading,
  setProgress,
  handleFollowUser,
}) {
  // States
  const [UserInfo, setUserInfo] = useState({
    followers: [],
    followings: [],
  });
  const [toggleBtmNav, setToggleBtmNav] = useState(true);
  const [imageClick, setImageClick] = useState(false);
  const [followClicked, setFollowClicked] = useState(false);

  // Ref
  const profileNavRef = useRef();
  const bottomDivRef = useRef();

  // Hooks
  const { status, data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  //
  const handleToggleBottomInfo = () => {
    setToggleBtmNav(!toggleBtmNav);
  };
  // Use Effect
  useEffect(() => {
    if (
      status === "authenticated" ||
      localStorage.getItem("Sufferer-site-authToken")
    ) {
      setUserInfo({ followers: user.followers, followings: user.followings });
    } else if (
      status === "unauthenticated" ||
      localStorage.getItem("Sufferer-site-authToken")
    ) {
      router.push("/");
    }
    // Profile navigation

    profileNavRef.current.addEventListener("click", (e) => {
      const button = e.target.closest("div");
      if (!button) return;
      const calcLeft = button.offsetLeft;
      if (calcLeft < 164) {
        profileNavRef.current.style.setProperty("--left", calcLeft + "px");
      }
      const calcWidth = button.offsetWidth / profileNavRef.current.offsetWidth;
      if (calcWidth < 1) {
        profileNavRef.current.style.setProperty("--width", calcWidth);
      }
    });
  }, [status, user.followers]);

  // Loading
  if (status === "loading" || loading) {
    // Show a loading state while waiting for user data to load.
    return <Loading />;
  }
  return (
    <>
      <div className="sm:w-5/6 lg:w-5/6 xl:5/6 w-full h-full text-white flex flex-col justify-center items-center gap-2 px-4">
        <div
          className={`sm:hidden absolute bottom-0 left-0 w-screen h-fit px-4 overflow-hidden mb-12 ${
            toggleBtmNav ? "-z-50" : "z-10"
          }`}
        >
          <div
            className={`relative w-full h-full ${
              toggleBtmNav ? "opacity-0 translate-y-full" : "opacity-100"
            } bg-gray-600 rounded-t-3xl box-border overflow-hidden`}
            ref={bottomDivRef}
            style={{ transition: ".2s" }}
          >
            <div className="w-full h-8 flex items-center justify-center">
              <div className="bg-white w-1/4 h-1 rounded-full"></div>
            </div>
            <div className="h-full pb-4 w-full bg-gray-600 flex flex-col justify-center gap-4 pt-2 ">
              <div className="w-full flex items-center justify-start px-6 gap-4 text-2xl">
                <i className="fa-solid fa-gear text-white"></i>
                <Link href="/setting">Setting</Link>
              </div>
              <div className="w-full flex items-center justify-start px-6 gap-4 text-2xl">
                <i className="fa-solid fa-info text-sm text-slate-600 border-2 bg-white rounded-full p-2 h-6 w-6 "></i>
                <Link href="/projectrepo">About</Link>
              </div>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div className="w-full h-14 sm:hidden block">
          <div className="w-full h-14 fixed backdrop-blur-lg sm:hidden border-b-2 border-gray-800 top-0 left-0 z-50">
            <div className="flex items-center justify-between w-full px-8 h-full">
              <div>{user.username}</div>
              <div className="flex gap-4 items-center justify-between">
                <Link
                  className="border-2 rounded-full bg-white h-5 w-5 flex items-center justify-center  "
                  href="/projectrepo"
                >
                  <i className="fa-solid fa-info text-sm text-slate-800"></i>
                </Link>
                <i
                  className="fa-solid fa-bars text-white text-lg"
                  onClick={handleToggleBottomInfo}
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit border-b-2 border-l-indigo-700 w-full flex flex-col sm:flex-row gap-4 justify-evenly pt-8 sm:pb-10 pb-2 border-gray-700">
          <div className="flex gap-4 items-center justify-center w-fit">
            {/* common image for mobile & desktop */}
            <div className="border-2 rounded-full border-gray-500 p-1 w-fit ">
              <img
                src={user.image}
                onLoad={() => setProgress(100)}
                onLoadStart={() => {
                  setProgress(60);
                }}
                alt="notfound"
                className="sm:h-40 sm:w-40 h-16 w-16 rounded-full object-cover cursor-pointer"
                onClick={() => setImageClick(true)}
              />
            </div>
            {/* view image  */}
            {imageClick ? (
              <div
                className="h-screen w-screen backdrop-blur-lg flex items-center justify-center fixed top-0 left-0 z-50"
                onClick={() => setImageClick(false)}
              >
                <div className="h-52 w-52 lg:h-96 lg:w-96 rounded-full p-3 relative">
                  <div className="h-full w-full rounded-full absolute -top-3 -left-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-spin"></div>
                  <div className="h-full w-full rounded-full absolute top-8 left-8 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-spin"></div>
                  <img
                    src={user.image}
                    alt="not found"
                    className="h-full w-full rounded-full object-cover absolute hover:scale-105 transition duration-300 "
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
            {/* For Mobile Profile */}
            <div className="flex flex-col gap-2 sm:hidden justify-center items-start text-sm">
              <div className="flex gap-6 items-center">
                <div>@{user.username}</div>
                {pathname === "/profile" ? (
                  <i
                    className="fa-solid fa-pen-to-square cursor-pointer"
                    onClick={() => {
                      router.push("/setting");
                    }}
                  ></i>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex sm:gap-8 gap-2 text-center text-xs">
                <div>{data.length} Quotes</div>
                <div>
                  {UserInfo.followers && UserInfo.followers.length} Followers
                </div>
                <div>
                  {UserInfo.followers && UserInfo.followings.length} Followings
                </div>
              </div>
            </div>
          </div>
          {/* For Desktop Profile */}
          <div className="flex flex-col gap-4 sm:w-1/2 w-full">
            <div className="hidden sm:flex items-center justify-between h-6">
              <div className="flex items-center justify-center">
                <div>@{user.username}</div>
                {pathname === "/profile" ? (
                  <i
                    className="fa-solid fa-pen-to-square cursor-pointer hover:scale-110 ml-8 transition-all"
                    onClick={() => {
                      router.push("/setting");
                    }}
                  ></i>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="hidden gap-8 sm:flex">
              <div>{data.length} quote</div>
              <div>
                {UserInfo.followers && UserInfo.followers.length} Followers
              </div>
              <div>
                {UserInfo.followers && UserInfo.followings.length} Followings
              </div>
            </div>
            <div>
              <strong>
                {user.given_name} {user.family_name}
              </strong>
              <p className="w-full overflow-auto bg-transparent whitespace-pre-line text-xs ">
                {user.about}
              </p>
              {pathname === "/profile" ? null : (
                <div className="mt-4 flex gap-4 mb-4">
                  <button
                    type="button"
                    className={`${
                      followClicked ||
                      (UserInfo.followers &&
                        (UserInfo.followers.includes(
                          session?.user.id ||
                            localStorage.getItem("Sufferer-site-userId")
                        )))
                        ? "bg-slate-700"
                        : "bg-blue-600 hover:scale-105 cursor-pointer"
                    } w-fit text-sm p-4 py-1 rounded-lg  `}
                    onClick={async () => {
                      handleFollowUser();
                      setFollowClicked(!followClicked);
                      setUserInfo((prevUserInfo) => {
                        const updatedFollowers =
                          prevUserInfo.followers.includes("Temp value")
                            ? prevUserInfo.followers.filter(
                                (item) => item !== "Temp value"
                              )
                            : prevUserInfo.followers.concat(["Temp value"]);

                        return {
                          ...prevUserInfo,
                          followers: updatedFollowers,
                        };
                      });
                    }}
                  >
                    Follow
                  </button>
                  <div className="p-4 py-1 cursor-pointer rounded-lg bg-slate-700 w-fit hover:scale-105 text-sm">
                    Message
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {pathname === "/profile" ? (
          <div
            id="profile-navigation"
            className="flex gap-8 w-fit items-center justify-center relative z-50"
            ref={profileNavRef}
          >
            <div>Quotes</div>
            <div>Saved</div>
            <div>Discard</div>
          </div>
        ) : (
          <div
            id="profile-navigation"
            className="flex gap-8 w-fit items-center justify-center relative z-50 before:w-56"
            ref={profileNavRef}
          >
            <div>Quotes</div>
          </div>
        )}
        <div className="w-full mb-10">
          <div className="">
            <Quotes posts={data} section={section} setData={setData} />
          </div>
        </div>
      </div>
    </>
  );
}
