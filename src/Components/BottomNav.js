"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full h-14 bg-white border-t border-gray-200 dark:bg-black dark:border-gray-600 ${
        pathname === "/login" || pathname === "/register" ? "hidden" : "block"
      }`}
    >
      <div className="flex h-full max-w-lg justify-evenly mx-auto font-medium">
        <Link
          href="/"
          replace
          prefetch
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-950"
        >
          <i className="fa-solid fa-house text-white"></i>
        </Link>
        <Link
          replace
          prefetch
          href="/message"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-950"
        >
          <i className="fa-solid fa-message text-white"></i>
        </Link>
        <Link
          replace
          prefetch
          href="/createpost"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-950"
        >
          <i className="fa-solid fa-plus text-2xl text-white "></i>
        </Link>
        <Link
          replace
          prefetch
          href="/search"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-950"
        >
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </Link>
        <Link
          replace
          prefetch
          href="/profile"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-950"
        >
          <i className="fa-solid fa-user text-white"></i>
        </Link>
      </div>
    </div>
  );
}
