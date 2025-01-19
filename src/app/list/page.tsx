import React from "react";
import ProductList from "../components/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Filter from "../components/Filter";

export default async function ListPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const wixClient = await wixClientServer();
  const res = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <div className="container flex flex-col mx-auto">
      <div className="flex h-[20rem] bg-pink-100">
        <div className="w-2/3 flex items-center justify-center flex-col gap-6">
          <h1 className="text-2xl tracking-wide font-bold">
            Grab up to 50% off <br />
            on Selected Products
          </h1>
          <button className="bg-pink-300 rounded-full text-white px-8 py-2">
            Buy Now
          </button>
        </div>
        <div className="w-1/3 flex items-end">
          <Image
            src="/woman.png"
            alt="sale"
            width={250}
            height={250}
            objectFit="cover"
          />
        </div>
      </div>
      <div>
        <Filter />
      </div>
      <div>
        <h1 className="text-xl font-bold py-6">{res.collection?.name}</h1>
        <ProductList
          categoryId={res.collection?._id || "000000000"}
          limit={4}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
}
