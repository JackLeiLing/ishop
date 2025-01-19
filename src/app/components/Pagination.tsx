"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Pagination({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}): React.JSX.Element {
  const { replace } = useRouter();
  const searchParams = useParams();
  const pathName = usePathname();
  const goToPage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-center py-3 gap-3">
      <button
        disabled={!hasPrev}
        className="rounded-md bg-pink-500 text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200 "
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className="rounded-md bg-pink-500 text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200 "
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
