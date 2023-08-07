export default function PostQuote({ post, setPost, submitting, handleSubmit }) {
  return (
    <div className="h-fit sm:w-3/4 w-11/12">
      <form onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            value={post.title}
            maxLength={45}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-transparent focus:outline-none focus:ring-0 flex justify-between w-full"
          >
            <span>Quote Title</span>
            <span className="sticky right-0 bottom-0">
              Characters Left : {45 - post.title.length}
            </span>
          </label>
        </div>

        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="quote-area" className="sr-only">
              Your Quote
            </label>
            <textarea
              id="quote-area"
              rows="6"
              value={post.quote}
              onChange={(e) => setPost({ ...post, quote: e.target.value })}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 max-h-80 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 outline-none"
              placeholder="Write a Quote..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            {submitting ? (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow  hover:bg-indigo-400"
              >
                <svg
                  className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm leading-6 text-white bg-indigo-500 rounded-md shadow hover:bg-indigo-400"
              >
                <i className="fa-solid fa-share text-sm text-white mr-2"></i>
                Share
              </button>
            )}
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <i className="fa-solid fa-cloud"></i>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <i className="fa-solid fa-paperclip"></i>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
      <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
        Remember, contributions to this topic should follow our
        <a
          href="#"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Community Guidelines
        </a>
        .
      </p>
    </div>
  );
}
