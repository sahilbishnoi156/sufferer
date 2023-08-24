"use client";
import { useState } from "react";
import ShowConnectedUser from "../../../Components/ShowConnectedUser";
import LoadingBar from "react-top-loading-bar";

export default function page({params}) {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ShowConnectedUser
        userId={params.id}
        tabType={"followers"}
        setProgress={setProgress}
      />
    </>
  );
}
