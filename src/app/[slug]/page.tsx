import React from "react";
import ProductImages from "../components/ProductImages";
import CustomizeProduct from "../components/CustomizeProduct";
import Add from "../components/Add";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
async function page({ params }: { params: { slug: string } }) {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("_id", params.slug)
    .find();

  if (products.items.length === 0) {
    return notFound();
  }

  const product = products.items[0];

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* Img */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product?.media?.items} />
      </div>
      {/* Text */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div
          className="text-gray-500"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              product?.description || "No description"
            ),
          }}
        />
        <div className="h-[2px] bg-gray-100"></div>
        <div className="">
          <div className="flex gap-4 items-center">
            <h3 className="text-xl text-gray-950 ">${product.price?.price}</h3>
            {product.price?.price !== product.price?.discountedPrice && (
              <h2 className="font-medium text-gray-500 line-through">
                ${product.price?.discountedPrice}
              </h2>
            )}
          </div>
        </div>
        <div className="h-[2px] bg-gray-100"></div>
        {product.variants && product.productOptions ? (
          <CustomizeProduct
            productId={product._id || ""}
            productOptions={product.productOptions || []}
            productVarians={product.variants || []}
          />
        ) : (
          <Add
            productId={product._id || ""}
            variantId="0000000000000-00000-0000-00000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}

        <div className="h-[2px] bg-gray-100"></div>
        {product.additionalInfoSections?.map((section) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(section.description || ""),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
