"use client";
import { useState, useRef, useEffect } from "react";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

export default function Setting({ handleLogOut, user, id, setProgress }) {
  // States
  const [imagePreview, setImagePreview] = useState("");
  const [currentUser, setCurrentUser] = useState(user);
  const [usernameExists, setUsernameExists] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // Ref
  const timerRef = useRef(null);
  const imageRef = useRef();

  // Handling Image Uploading
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    if (file.type !== "image/png") {
      setImagePreview(fileUrl);
      setProfileImage(file);
      setCurrentUser({ ...currentUser, image: fileUrl });
    }
  };

  // Handling Image click
  const handleImageClick = () => {
    imageRef.current.click();
  };

  // Function to check if the username exists
  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(
        `/api/users/checkusername/byusername/${username}`
      );
      const data = await response.json();
      if (data.foundUsername) {
        setUsernameExists(true); // Username exist
      } else {
        setUsernameExists(false); // Username does not exists
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handling username change
  const handleUserNameChange = (e) => {
    const newUsername = e.target.value.toLowerCase();
    if (/[^A-Za-z0-9\s._]|[.]{2,}|[_]{2,}/gm.test(newUsername)) {
      // Don't set the username
    } else {
      setCurrentUser({ ...currentUser, username: newUsername.trim() });
    }

    // Clear the previous timer
    clearTimeout(timerRef.current);

    if (newUsername !== user.username) {
      // Set a new timer to delay API call
      timerRef.current = setTimeout(() => {
        checkUsernameExists(newUsername);
      }, 500); // Adjust the delay time as needed
    } else {
      setUsernameExists(null);
    }
  };

  // Updating information
  const updateUserInfo = async (e) => {
    e.preventDefault();
    try {
      setProgress(30);
      setLoading(true);
      // Uploading Image
      if (user.image !== currentUser.image) {
        const formData = new FormData();
        formData.append("file", profileImage);
        formData.append("upload_preset", "gmgscbus");
        const ImageResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dlhxapeva/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const imageJsonData = await ImageResponse.json();
        setCurrentUser({ ...currentUser, image: imageJsonData.url });
        var usrCldImage = imageJsonData.url;
      }

      // Changing other data
      const response = await fetch(`/api/users/updateUser/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          username: currentUser.username,
          email: currentUser.email,
          image: usrCldImage || user.image, // Use the new URL obtained from the API response
          given_name: currentUser.given_name,
          family_name: currentUser.family_name,
          about: currentUser.about,
        }),
      });
      setProgress(60);
      setLoading(false);
      if (response.status === 200) {
        // Update the currentUser state with the new URL
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
      } else if (response.status === 500) {
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
      }
      setProgress(100);
    } catch (error) {
      console.log(error);
    }
  };

  // Handling Password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setProgress(10);
    try {
      const response = await fetch(`/api/auth/resetpass/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          password: newPassword,
          old_password: currentPassword,
        }),
      });
      setProgress(60);
      if (response.status === 200) {
        // Update the currentUser state with the new URL
        toast.success("Password Changed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleLogOut();
      } else if (response.status === 401) {
        toast.error("Invalid Password", {
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
      setProgress(100);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Delete user
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const hasConfirmed = confirm(`Do your really want to delete this account`);

    if (hasConfirmed) {
      setProgress(10);
      try {
        const response = await fetch(`/api/auth/deleteuser/${id.toString()}`, {
          method: "DELETE",
        });
        setProgress(60);
        if (response.status === 200) {
          // Update the currentUser state with the new URL
          toast.success("Account Deleted", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          handleLogOut();
        } else if (response.status === 401) {
          toast.error("Something wrong happened", {
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
        setProgress(100);
      } catch (error) {
        console.log(error);
      }
    }
    else{
      toast.error("Your account is safe", {
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

  // Use Effect
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  // if user is not available
  if (!user) {
    return <Loading />; // Replace this with your loading component or placeholder
  }
  return (
    <div className="sm:w-3/4 w-full h-full bg-gray-900 text-white rounded-xl flex flex-col">
      <div className="flex sm:p-10 items-start justify-center sm:gap-16 sm:flex-row flex-col">
        <div className="sm:w-2/6 w-full sm:text-start text-center py-8 flex flex-col">
          <span>Personal Information</span>
          <span className="text-gray-400 text-xs">
            Use a permanent address where you can receive mail.
          </span>
        </div>
        <div className="w-full p-4">
          <form className="h-full w-full" onSubmit={updateUserInfo}>
            <div className="flex gap-10 sm:flex-row flex-col">
              <div className=" sm:w-52 w-full mb-6 sm:ml-4 flex items-center justify-center">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className="hidden"
                  onChange={handleImageChange}
                  ref={imageRef}
                />
                <div className="border-2 rounded-full border-gray-500 p-1">
                  <img
                    src={imagePreview || user.image}
                    alt="d"
                    className="sm:h-32 sm:w-32 h-32 w-32 rounded-full cursor-pointer object-cover"
                    onClick={handleImageClick}
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="first-name"
                    max={15}
                    value={currentUser.given_name || ""}
                    onChange={(e) => {
                      setCurrentUser({
                        ...currentUser,
                        given_name: e.target.value,
                      });
                    }}
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <label
                  htmlFor="last-name"
                  className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="last-name"
                    max={15}
                    value={currentUser.family_name || ""}
                    onChange={(e) => {
                      setCurrentUser({
                        ...currentUser,
                        family_name: e.target.value,
                      });
                    }}
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>
            <label
              htmlFor="about-user"
              className="block mb-2 sm:mt-0 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              About
            </label>
            <textarea
              id="about-user"
              rows="3"
              max={150}
              value={currentUser.about || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, about: e.target.value })
              }
              className="block p-2.5 resize-none overflow-auto w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="About yourself"
            ></textarea>
            <label
              htmlFor="username"
              className="block mt-8 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                type="text"
                id="username"
                value={currentUser.username || ""}
                onChange={handleUserNameChange}
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            {usernameExists === null ? (
              <></>
            ) : usernameExists ? (
              <p className="text-sm mt-1 text-red-700">
                Username already taken
              </p>
            ) : (
              <p className="text-sm mt-1 text-green-700">Username available</p>
            )}
            <label
              htmlFor="user-email"
              className="block mt-8 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                id="user-email"
                value={currentUser.email || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                disabled
              />
            </div>
            <div className="flex gap-8 items-center sm:justify-start justify-evenly">
              {loading ? (
                <button
                  disabled
                  type="button"
                  className="text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-blue-800"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Saving...
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={usernameExists || currentUser === user}
                  className={`text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ${
                    usernameExists || currentUser === user
                      ? "bg-gray-700"
                      : "bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-blue-800"
                  }`}
                >
                  Save
                </button>
              )}

              <button
                type="reset"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={() => {
                  setImagePreview(null);
                  setCurrentUser(user);
                  toast.warn("Canceled", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex sm:p-10 p-4 border-t-2 border-gray-500 sm:gap-16 sm:flex-row flex-col">
        <div className="sm:w-2/6 py-8 flex flex-col sm:text-start text-center">
          <span>Reset Password</span>
          <span className="text-gray-400 text-xs">
            Update your password associated with your account.
          </span>
        </div>
        <div className="w-full sm:p-4">
          <form onSubmit={handleResetPassword}>
            <label
              htmlFor="current-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Current Password
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Current Password"
              />
            </div>
            <label
              htmlFor="new-password"
              className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                min={8}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="New Password"
              />
            </div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                min={8}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex gap-8 items-center sm:justify-start justify-evenly mt-6">
              <button
                type="submit"
                className={`text-white  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ${
                  newPassword !== confirmPassword || currentPassword === ""
                    ? "bg-slate-700"
                    : "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:ring-blue-300 bg-blue-700 hover:bg-blue-800"
                }`}
                disabled={
                  newPassword !== confirmPassword || currentPassword === ""
                }
              >
                Change
              </button>
              <button
                type="reset"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex p-6 px-10 border-t-2 border-gray-500 sm:gap-16 sm:flex-row flex-col justify-center items-center">
        <div className="sm:w-2/6 py-8 flex flex-col">
          <span>Log Out</span>
          <span className="text-gray-400 text-xs">Log Out your session .</span>
        </div>
        <div className="w-full p-4 flex items-center sm:justify-start justify-center">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 h-10 "
            onClick={() => {
              handleLogOut();
              toast.success(`See ya later ${user.given_name} `, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }}
          >
            Log Out<i className="fa-solid fa-right-from-bracket ml-4"></i>
          </button>
        </div>
      </div>
      <div className="flex p-6 px-10 border-t-2 border-gray-500 sm:gap-16 sm:flex-row flex-col justify-center items-center">
        <div className="sm:w-2/6 py-8 flex flex-col sm:text-start text-center">
          <span>Delete Account</span>
          <span className="text-gray-400 text-xs">
            No longer want to use our service? You can delete your account here.
            This action is not reversible. All information related to this
            account will be deleted permanently.
          </span>
        </div>
        <div className="w-full p-4 flex items-center sm:justify-start justify-center">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleDeleteUser}
          >
            Yes, delete my account
          </button>
        </div>
      </div>
    </div>
  );
}
