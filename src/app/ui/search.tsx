"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CSSProperties } from "react";

//import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const style_hover: CSSProperties = {
    backgroundColor: "gray",
    position: "fixed",
    bottom: 220,
    width: "100%",
  };

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div style={style_hover} className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="search currency"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
