"use client";

import { useState } from "react";

export default function AboutProj() {
  const [supportDiv, setSupportDiv] = useState(false);
  return (
    <div className="h-full w-screen bg-black flex flex-col justify-evenly items-center gap-20 py-16 sm:px-0 px-4">
      <div className="w-full sm:w-3/4 text-center text-6xl text-white flex items-center justify-center gap-4 flex-col">
        Sufferer
        <p className="text-xs flex items-center justify-center gap-4 sm:flex-row flex-col">
          <span>
            Created By <a href="https://www.instagram.com/s.ahilbishnoi_/" target="_blank">
              Sahil Bishnoi
            </a>
          </span>
          |<span> Launched on 18 aug 2023</span>|
          <span>Supported and expanded by many awesome people.</span>
        </p>
      </div>
      <div className="w-3/4 flex text-white items-center">
        <div className="w-full flex items-center justify-center">
        <img src="https://avatars.githubusercontent.com/u/134002041?s=400&u=491c21a491528da76e818ac5e7f97b8c8810f63f&v=4" alt="Not Found" className="h-40 w-40 rounded-full" />
        </div>
        <div className="w-full flex sm:flex-col flex-row">
          <div className="relative">
            <img src="https://vegibit.com/wp-content/uploads/2014/04/Javascript-JS.png" alt="js" className="h-12 w-12 rounded-full scale-75 absolute animate-bounce -top-12 -left-12" />
            <img src="https://camo.githubusercontent.com/edc736634dd35b0f4008e2f7db456136b9fc0e1e7a4078bb72c7352b1bdf8a7e/68747470733a2f2f776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6373732d332e737667" alt="css" className="h-12 w-12 rounded-full scale-75 absolute animate-bounce left-20 -top-5" />
            <img src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_640.png" alt="html" className="h-12 w-12 rounded-full scale-75 absolute animate-bounce -bottom-32 -left-20" />
            <img src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png" alt="next" className="h-12 w-12 rounded-full scale-75 absolute animate-bounce -bottom-44 left-24" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="react" className="h-12 w-12 rounded-full scale-75 absolute animate-bounce top-6 left-56" />
          </div>
          <p className="text-lg">Hi! I'm </p>
          <span className="text-2xl text-yellow-400 mb-4">Sahil Bishnoi</span>
          <p className="text-sm text-slate-400">Creating amazing websites for over <span className="text-white">2 years </span></p>
          <p className="text-sm text-slate-400">as <span className="text-white">full stack</span> web developer .</p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-evenly items-center gap-4 sm:text-justify text-center">
        <span className="text-2xl text-gray-400 w-full sm:w-3/4 border-b-2 pb-2 border-slate-600">Credits</span>
        <div className="w-full sm:w-3/4 text-white flex flex-col gap-2">
          <p className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-start items-center justify-center">
            <a
              href="https://www.instagram.com/__.shivanshu.___/"
              target="_blank"
              className="text-blue-500 text-xl "
            >
              Shivanshu
            </a>{" "}
            for name suggesstion .
          </p>
          <p className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-start items-center justify-center">
            <a
              href="https://www.instagram.com/s.ahilbishnoi_/"
              target="_blank"
              className="text-blue-500 text-xl "
            >
              Sahil
            </a>
            who helped financially by donating, enabling optional ads or buying
            merch
          </p>
          <p className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-start items-center justify-center">
            <a
              href="https://github.com/sahilbishnoi156/sufferer"
              target="_blank"
              className="text-blue-500 text-xl "
            >
              Contributors
            </a>
            on GitHub that have helped with implementing various features,
            adding themes and more.
          </p>
        </div>
      </div>
      {/* Support div */}
      {supportDiv && (
        <div className="fixed z-50 top-0 left-0 h-screen w-screen backdrop-blur-lg flex items-center justify-center transition " onClick={()=>setSupportDiv(false)}>
          <div className="bg-black text-white sm:p-8 p-4 rounded-full sm:text-2xl text-xl border-2">Option currently unavailable</div>
        </div>
      )}
      <div className="w-full flex flex-col justify-evenly items-center gap-4">
        <span className="text-2xl text-gray-400 w-full sm:w-3/4 border-b-2 pb-2 border-slate-600 text-center sm:text-start">Support</span>
        <div className="w-full sm:w-3/4 text-white text-center sm:text-start">
          Thanks to everyone who has supported this project. It would not be
          possible without you and your continued support.
        </div>
        <div
          className="w-full sm:w-3/4 flex items-center justify-center gap-8"
          id="contact-div"
        >
          <div className="py-6 text-xl border-2 border-slate-700 text-white bg-slate-600 text-center rounded-xl flex gap-4 items-center justify-center w-full hover:bg-slate-300 hover:text-slate-700 cursor-pointer hover:scale-105 transition" onClick={()=>setSupportDiv(true)}>
            <i className="fa-solid fa-dollar-sign"></i>Support
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-evenly items-center gap-4">
        <span className="text-2xl text-gray-400 w-full sm:w-3/4 border-b-2 pb-2 border-slate-600 sm:text-start text-center">Contact</span>
        <div className="w-full sm:w-3/4 text-white text-center sm:text-start">
          If you encounter a bug, have a feature request or just want to say hi
          - here are the different ways you can contact me directly.
        </div>
        <div
          className="w-full sm:w-3/4 flex items-center justify-center gap-8 flex-col sm:flex-row"
          id="contact-div"
        >
          <a
            href="https://github.com/sahilbishnoi156/sufferer"
            className="py-6 text-xl border-2 border-slate-700 text-white bg-slate-600 text-center rounded-xl flex gap-4 items-center justify-center w-full hover:bg-slate-300 hover:text-slate-700 cursor-pointer hover:rotate-6 transition"
            target="_blank"
          >
            <i className="fa-brands fa-github"></i>Github
          </a>
          <a
            href="https://twitter.com/SahilBi59723409"
            className="py-6 text-xl border-2 border-slate-700 text-white bg-slate-600 text-center rounded-xl flex gap-4 items-center justify-center w-full hover:bg-slate-300 hover:text-slate-700 cursor-pointer hover:rotate-6 transition"
            target="_blank"
          >
            <i className="fa-brands fa-twitter"></i>Twitter
          </a>
          <a
            href="mailto:sskkpoonia@gmail.com"
            className="py-6 text-xl border-2 border-slate-700 text-white bg-slate-600 text-center rounded-xl flex gap-4 items-center justify-center  w-full hover:bg-slate-300 hover:text-slate-700 cursor-pointer hover:rotate-6 transition"
          >
            <i className="fa-solid fa-envelope"></i>Mail
          </a>
          <a
            href="https://www.instagram.com/s.ahilbishnoi_/"
            className="py-6 text-xl border-2 border-slate-700 text-white bg-slate-600 text-center rounded-xl flex gap-4 items-center justify-center  w-full hover:bg-slate-300 hover:text-slate-700 cursor-pointer hover:rotate-6 transition"
            target="_blank"
          >
            <i className="fa-brands fa-instagram"></i>Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
