"use client";
import "../styles/globals.css";
import { useState, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import Loading from "./Loading";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login({ providers }) {
  const [loading, setLoading] = useState(false);
  const [user_email, setUser_email] = useState("");
  const [user_password, setUser_password] = useState("");
  const [correctCredentials, setCorrectCredentials] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const passwordRef = useRef();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    passwordRef.current.type =
      passwordRef.current.type === "password" ? "text" : "password";
  };

  // Handling Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user_email,
          password: user_password,
        }),
      });
      const data = await response.json();
      setLoading(false);
      if (!data.userFound) {
        toast.warn(`Email Not Found`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (!data.isMatch) {
          toast.warn(`Invalid password`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          localStorage.setItem("Sufferer-site-authToken", data.authToken);
          localStorage.setItem("Sufferer-site-userId", data.userId);
          localStorage.setItem("Sufferer-site-username", data.user_name);

          toast.success(`Welcome ${data.user_name}`, {
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
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Continue wit google
  const continueWithGoogle = async (id) => {
    setLoading(true);
    try {
      await signIn(id);
      toast.success(`Redirecting 😄`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error(`Something went wrong`, {
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
    }
  };

  if (status === "loading" || loading) {
    return <Loading />;
  }
  return (
    <div className="flex sm:flex-row flex-col-reverse gap-10 sm:gap-2 w-full h-screen text-white items-center justify-start bg-black">
      <div className="sm:w-1/2 w-full flex flex-col items-center sm:justify-center justify-between h-full gap-8 sm:pl-16 pl-0">
        <div className="flex-col items-center justify-evenly gap-16 sm:gap-0 sm:flex hidden ">
          <div className="w-full text-center">
            <span className="text-6xl text-center w-3/4" id="site-heading">
              Welcome Back!
            </span>
            <p className="text-gray-400 text-center">
              At Sufferer, we believe in the extraordinary power of quotes to
              inspire, motivate, and uplift.
            </p>
            <div className="h-12"></div>
          </div>
        </div>
        <div className="text-slate-400 sm:hidden block">
          ----------OR----------
        </div>
        <div className="flex flex-col gap-4 w-full ">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  continueWithGoogle(provider.id);
                }}
                className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 justify-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clipRule="evenodd"
                  />
                </svg>

                {!loading || status === "loading"
                  ? `Sign in with ${provider.name}`
                  : "Redirecting..."}
              </button>
            ))}
          <button
            type="button"
            className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 justify-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 17"
            >
              <path
                fillRule="evenodd"
                d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Twitter
          </button>
          <button
            type="button"
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 w-full justify-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 8 19"
            >
              <path
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
              />
            </svg>
            Sign in with Facebook
          </button>
        </div>
        <Link
          className="text-blue-400 sm:block hidden"
          href="/register"
          replace
        >
          Don't have an account ?
        </Link>
      </div>
      <div className="text-slate-400 [writing-mode:vertical-lr] relative left-14 sm:block hidden">
        -----------------OR-----------------
      </div>
      <div className="h-full sm:w-3/5  w-full flex flex-col items-center justify-center sm:gap-16 gap-4 sm:mt-0 mt-10 ">
        <div className="w-full items-center justify-center flex">
          <span className="text-6xl" id="site-heading">
            LOGIN
          </span>
          <Link href="/">
            <i className="fa-solid fa-hippo ml-4 text-white text-5xl"></i>
          </Link>
        </div>
        <form className="w-full sm:w-2/3" onSubmit={handleLoginSubmit}>
          <div className="mb-6">
            <label
              htmlFor="user-email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="user-email"
              value={user_email}
              onChange={(e) => setUser_email(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              min={8}
              value={user_password}
              onChange={(e) => {
                e.target.value.length > 7
                  ? setCorrectCredentials(true)
                  : setCorrectCredentials(false);
                setUser_password(e.target.value);
              }}
              ref={passwordRef}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                defaultValue=""
                onChange={togglePasswordVisibility}
                onBlur={() => passwordRef.current.type === "password"}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >
              Show password
            </label>
          </div>
          {loading ? (
            <button
              disabled
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center sm:w-32 w-full justify-center"
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
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className={`text-white focus:ring-4 w-full focus:outline-none  font-medium rounded-lg text-sm sm:w-32 px-5 py-2.5 text-center  ${
                correctCredentials
                  ? "dark:focus:ring-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-300 bg-blue-700 hover:bg-blue-800 "
                  : "bg-gray-700 dark:bg-gray-600"
              }`}
              disabled={!correctCredentials}
            >
              Log In
            </button>
          )}
          <Link className="text-blue-400 sm:hidden block mt-4" href="/register">
            Don't have an account ?
          </Link>
        </form>
      </div>
    </div>
  );
}
