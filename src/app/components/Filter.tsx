"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

export default function Filter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="pt-10 flex justify-between">
      <div className="flex justify-center gap-4">
        <select
          name="type"
          className="rounded-full px-8 py-2 border bg-gray-300"
          onChange={handleFilterChange}
        >
          <option> Type</option>
          <option value="all">All</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-full px-6 py-2 ring-1 ring-offset-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-full px-6 py-2 ring-1 ring-offset-gray-400"
          onChange={handleFilterChange}
        />
        <select
          name="cat"
          className="rounded-full px-6 py-2 border bg-gray-300"
          onChange={handleFilterChange}
        >
          <option>Category</option>

          <option value="best-sellers">Best Sellers</option>
          <option value="accessories">Accessories</option>
          <option value="sale">Sale</option>
          <option value="home-appliances">Home Appliances</option>
          <option value="smart-phones-watches">Smart Watches</option>
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          className="rounded-full px-8 py-2 border"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc priceData.price">Price (low to high)</option>
          <option value="desc priceData.price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
}
