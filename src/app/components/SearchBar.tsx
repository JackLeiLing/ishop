"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get("search");
    if (search) {
      router.push(`/list?name=${search}`);
    }
  }
  return (
    <form
      className="flex justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent flex-1 outline-none"
        name="search"
      />
      <button type="submit">
        <Image src="/search.png" alt="search" width={16} height={16} />
      </button>
    </form>
  );
}
