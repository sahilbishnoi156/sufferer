"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UserIds({
  username,
  user_image,
  userId,
  given_name,
  family_name,
}) {
  return (
    <div className="flex flex-col justify-center items-start gap-4">
      <ul className="flex flex-col justify-center items-center gap-8">
        <li className="flex gap-4 items-center justify-center">
          <img
            src={user_image}
            alt="hg"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span>
            <Link
              className="hover:underline text-lg"
              href={`/profile/${userId}?name=${username}`}
            >
              @{username}
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {given_name} {family_name}
            </p>
          </span>
        </li>
      </ul>
    </div>
  );
}
