import React from "react";
import { wixClientServer } from "@/lib/wixClientServer";
import Link from "next/link";

const CategoryList = async () => {
  const wixClient = await wixClientServer();
  const res = await wixClient.collections.queryCollections().find();
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {res.items.map((category: any) => (
          <Link
            href={"/list?cat=" + category.slug}
            key={category._id}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6"
          >
            <div className="relative bg-slate-100 w-full h-96">
              <img
                src={category.media?.items[0]?.image?.url}
                alt={category.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {category.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
