"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchBarT {}

const SearchBar: React.FC<SearchBarT> = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const timeoutId = setTimeout(() => {
      if (!search) searchParams.delete("search");
      else searchParams.set("search", search);

      if (searchParams.get("search") && !search)
        setSearch(searchParams.get("search") || "");

      router.push(`${window.location.pathname}?${searchParams.toString()}`);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <div className="text-white bg-dark-2 px-3 py-3 rounded-lg flex items-center gap-2">
      <Image src={"/assets/search.svg"} width={20} height={20} alt="search" />
      <input
        type="text"
        placeholder="search..."
        className="w-full bg-transparent outline-none"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
};

export default SearchBar;
