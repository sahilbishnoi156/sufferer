"use client"
import Login from '@/Components/Login'
import Loading from "../../Components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProviders, useSession } from "next-auth/react";
import React from 'react'

export default function login() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState(null);
  const router = useRouter();

  // Setting up Providers
  const setUpProviders = async () => {
    setLoading(true);
    const response = await getProviders();
    setProviders(response);
    setLoading(false);
  };

  // Check if username is available
  const checkUserName = async () => {
    setLoading(true);
    const response = await fetch(
      `/api/users/checkusername/${session?.user.email}`
    );
    const data = await response.json();
    if (data.foundUsername) {
      router.push("/");
      setLoading(false);
    } else {
      router.push(`/login/getusername/${session?.user.id}`);
      setLoading(false);
    }
    return data;
  };



  // Use Effect
  useEffect(() => {
    if ((localStorage.getItem("Sufferer-site-authToken"))) {
      router.push("/");
    }
    else if ( (status === "authenticated") ){
      checkUserName();
    }
    setUpProviders();
  }, [status]);

  if (status === "loading" || loading) {
    return <Loading />;
  }
  return (
    <div className='bg-black h-full w-screen flex items-center justify-center py-10 select-none px-4'><Login providers={providers}/></div>
  )
}
