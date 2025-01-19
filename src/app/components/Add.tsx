"use client";
import { useWixClient } from "@/hooks/useWixClient";
import React from "react";

export default function Add({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) {
  const [quantity, setQuantity] = React.useState(1);
  const handleQuantity = (type: "i" | "d") => {
    if (type === "i" && quantity < stockNumber) {
      setQuantity((p) => p + 1);
    } else if (type === "d" && quantity > 1) {
      setQuantity((p) => p - 1);
    }
  };

  const wixClient = useWixClient();
  const addItem = async () => {
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_STORE_APP_ID,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity,
        },
      ],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl text-gray-900">Choose a Quantity</h3>

      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex">
            <button
              className="bg-gray-100 w-8 h-8 rounded-l-full"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            <span className="h-8 w-8 bg-gray-100 flex items-center justify-center">
              {quantity}
            </span>
            <button
              className="bg-gray-100 w-8 h-8 rounded-r-full"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>
          <div className="text-lg">
            <p>
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
            </p>
            <p>Don't miss it</p>
          </div>
        </div>
        <button
          onClick={addItem}
          className="ring-1 ring-pink-600 text-pink-600 px-8 py-2 rounded-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
