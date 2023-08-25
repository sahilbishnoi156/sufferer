import Link from "next/link";
export default function Jumbotron() {
  return (
    <section className="bg-white dark:bg-black h-screen w-screen absolute top-0 left-0 z-50 flex flex-col justify-center items-center">
      <div className="w-full h-1/4 flex sm:justify-start justify-center items-center pl-4">
        <i className="fa-solid fa-hippo text-white text-6xl"></i>
      </div>
      <div className="py-8 h-3/4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div >
            <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white ">
              Welcome to Sufferer
            </h1>
            <h5 className="text-2xl text-green-500 ">Where Words Find Wings!</h5>
          </div>
          <p className="text-sm font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Unleash the Power of Words and Inspiration. Share, Connect, and Discover a World of Wisdom
          Are you ready to dive into a world of endless wisdom? Join Sufferer today and explore the boundless power of words!
          </p>
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            href="/login"
            prefetch={true}
            className="lg:w-1/4 w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Sign in
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <a
            href="#"
            className="lg:w-1/4 w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
