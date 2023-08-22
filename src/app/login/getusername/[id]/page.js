"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Loading from "../../../../Components/Loading";
import { toast } from "react-toastify";

export default function page({ params }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();
  // Ref
  const timerRef = useRef(null);
  const router = useRouter();
  const [usernameExists, setUsernameExists] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `/api/users/setUsername/${session?.user.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      const data = await response.json();
      localStorage.setItem("Sufferer-site-authToken", data.authToken);

      if (response.ok && data.authToken) {
        toast.success(`Welcome ${username}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/");
        setLoading(false);
      } else {
        toast.warn(`Something went wrong please try again`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    if (/[^a-z0-9._]|[.]{2,}|[_]{2,}/gm.test(newUsername)) {
      // Don't set the username
    } else {
      setUsername(newUsername);
    }

    // Clear the previous timer
    clearTimeout(timerRef.current);

    if (newUsername !== "" && newUsername.length > 6) {
      // Set a new timer to delay API call
      timerRef.current = setTimeout(() => {
        checkUsernameExists(newUsername);
      }, 500); // Adjust the delay time as needed
    } else {
      setUsernameExists(null);
    }
  };
  useEffect(() => {
    if (status === "unauthenticated" || session?.user.id !== params.id) {
      setLoading(true);
      toast.warn(`Permission denied`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push("/login");
    }
  }, [status]);
  if (status === "loading" || loading) {
    return <Loading />;
  }
  return (
    <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-black z-10">
      <form
        className="w-1/2 h-full flex items-center justify-center flex-col gap-16"
        onSubmit={handleLoginSubmit}
      >
        <div className="flex items-center justify-center flex-col w-full">
          <div className="flex items-center justify-center gap-16 ">
            <img
              src={session?.user.image}
              alt="Not found"
              className="h-40 w-40 rounded-full"
            />
            <div>
              <div className="text-white">
                Hi{" "}
                <span className="text-2xl text-orange-500">
                  {" "}
                  {session?.user.name}
                </span>
              </div>
              <div className="text-white">Welcome to our community</div>
            </div>
          </div>
          <h1 className="w-full text-center mt-10 text-2xl text-white select-none">
            Give us some details to give you{" "}
            <span className="text-orange-500">better experience</span>
          </h1>
        </div>
        <div className=" w-full">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username (must contain 5 characters)
          </label>
          <input
            type="text"
            id="username"
            value={username}
            min={5}
            max={20}
            onChange={handleUserNameChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Choose a username"
            required
          />
          <div>
            {usernameExists === null ? (
              <></>
            ) : usernameExists ? (
              <p className="text-sm mt-1 text-red-700">
                Username already taken
              </p>
            ) : (
              <p className="text-sm mt-1 text-green-700">Username available</p>
            )}
          </div>
        </div>
        <div className="mb-6 w-full">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
            id="password"
            value={password}
            max={8}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Choose a password"
            required
          />

          <input
            type="checkbox"
            id="show-password-check"
            className="mt-4"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label
            className="text-white cursor-pointer"
            htmlFor="show-password-check"
          >
            Show password
          </label>
        </div>
        <button
          type="submit"
          disabled={usernameExists || username === "" || username.length < 6}
          className={`text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ${
            usernameExists || username === "" || username.length < 6
              ? "bg-gray-700"
              : "bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-blue-800"
          }`}
        >
          proceed
        </button>
      </form>
    </div>
  );
}
