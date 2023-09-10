"use client";
import { useState } from "react";

export default function Search({
  setUsers,
  setSearchProg,
  setDataLoading,
  fetchUsers,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const fetchSearchedUser = async (searchInput) => {
    try {
      setDataLoading(true);
      setIsFetching(true);
      const response = await fetch(`/api/users/findUser/${searchInput}`);
      const data = await response.json();
      setDataLoading(false);
      Array.isArray(data) ? setUsers(data) : setUsers([data]);
      setIsFetching(false);
    } catch (error) {
      console.log("failed to get quotes", error);
    }
  };

  const handleUserSearch = async (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (isFetching) {
      return 0;
    } else {
      setSearchProg(true);
      if (searchInput.trim() === "") {
        fetchUsers();
      } else {
        fetchSearchedUser(searchInput);
      }
    }
  };
  return (
    <form
      className="w-full flex items-center justify-between p-2 border-2 border-slate-700 rounded-lg"
      onSubmit={handleUserSearch}
    >
      <input
        type="text"
        className="bg-transparent outline-none w-full h-full"
        placeholder="Search Users"
        value={searchInput}
        onChange={handleUserSearch}
      />
      <button className="p-2" type="submit">
        <svg
          className="w-4 h-4 text-gray-400 dark:text-gray-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
    </form>
  );
}
