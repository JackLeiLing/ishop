import Link from "next/link";
import React from "react";
import Image from "next/image";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 5;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999999)
    .descending("price")
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    )
    .eq("collectionIds", categoryId);

  // if (searchParams?.sort) {
  //   const [sortType, sortBy] = searchParams.sort.split(" ");
  //   if (sortType === "asc") {
  //     console.log("asc");
  //     productQuery.ascending("price");
  //   }

  //   if (sortType === "desc") {
  //     console.log("desc");

  //     productQuery.descending("price");
  //   }
  // }

  const res = await productQuery.find();

  return (
    <div>
      <div className="flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {res.items.map((product: products.Product) => (
          <Link
            className="w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-4"
            href={"/" + product._id}
            key={product._id}
          >
            <div className="w-full relative h-80">
              {product.media?.items && (
                <>
                  <Image
                    src={product.media?.items[1]?.image?.url || "/product.png"}
                    alt="product"
                    fill
                    sizes="25vw"
                    className="object-cover absolute rounded-md"
                  />

                  <Image
                    src={product.media?.mainMedia?.image?.url || "/product.png"}
                    alt="product"
                    fill
                    sizes="25vw"
                    className="object-cover absolute rounded-md hover:opacity-0 transition-opacity duration-1000"
                  />
                </>
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">${product.price?.price}</span>
            </div>
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product?.description || ""),
              }}
            >
              {}
            </div>
            <button className="rounded-2xl ring-1 ring-red-300 py-2 px-4 text-xs hover:text-white w-max">
              Add to cart
            </button>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={res.currentPage || 0}
        hasPrev={res.hasPrev()}
        hasNext={res.hasNext()}
      />
    </div>
  );
};
export default ProductList;
