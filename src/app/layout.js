import Provider from "@/Components/Provider";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/Components/Navbar";
import BottomNav from "@/Components/BottomNav";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sufferer - Create and share your thoughts",
  description:
    "Connect and engage with friends, family, and colleagues on the go with our innovative social media networking app. Share updates, photos, and experiences, discover new connections, and stay updated on the latest trends. Join our vibrant community today and experience a new way of staying connected.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className={`${inter.className}`}>
        <Provider>
          <div className="flex w-full">
            <div className="h-screen w-36 sm:block hidden">
              <Navbar />
            </div>
            <div className="sm:hidden block">
              <BottomNav />
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="colored"
            />
            <div className="w-full">{children}</div>
          </div>
          <script src="https://cdn.tailwindcss.com"></script>
          <script
            src="https://kit.fontawesome.com/f8f9825bbd.js"
            crossOrigin="anonymous"
            rel="preload"
            as="script"
          ></script>
        </Provider>
      </body>
    </html>
  );
}
