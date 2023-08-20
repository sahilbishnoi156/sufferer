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
            Created By{" "}
            <a href="https://www.instagram.com/s.ahilbishnoi_/" target="_blank">
              Sahil Bishnoi
            </a>
          </span>
          |<span> Launched on 18 aug 2023</span>|
          <span>Supported and expanded by many awesome people.</span>
        </p>
      </div>
      <div className="w-full flex flex-col justify-evenly items-center gap-4 sm:text-justify text-center">
        <span className="text-2xl text-gray-400 w-full sm:w-3/4">Credits</span>
        <div className="w-full sm:w-3/4 text-white flex flex-col gap-2">
          <p className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-start items-center justify-center">
            <a
              href="https://www.instagram.com/__.shivanshu.___/"
              target="_blank"
              className="text-yellow-700 text-xl "
            >
              Shivanshu
            </a>{" "}
            for name suggesstion .
          </p>
          <p className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-start items-center justify-center">
            <a
              href="https://www.instagram.com/s.ahilbishnoi_/"
              target="_blank"
              className="text-yellow-700 text-xl "
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
              className="text-yellow-700 text-xl "
            >
              Contributors
            </a>
            on GitHub that have helped with implementing various features,
            adding themes and more.
          </p>
        </div>
      </div>
      {supportDiv && (
        <div className="fixed z-50 top-0 left-0 h-screen w-screen backdrop-blur-lg flex items-center justify-center transition " onClick={()=>setSupportDiv(false)}>
          <div className="bg-black text-white sm:p-8 p-4 rounded-full sm:text-2xl text-xl border-2">Option currently unavailable</div>
        </div>
      )}
      <div className="w-full flex flex-col justify-evenly items-center gap-4">
        <span className="text-2xl text-gray-400 w-full sm:w-3/4">Support</span>
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
        <span className="text-2xl text-gray-400 w-full sm:w-3/4">Contact</span>
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