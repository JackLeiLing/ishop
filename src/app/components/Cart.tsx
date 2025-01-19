import { useCartStore } from "@/hooks/useCartStore";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";

export default function Cart() {
  // const cartItems = true;
  const { cart, removeItem } = useCartStore();
  const wixClient = useWixClient();
  const router = useRouter();

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgba(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col z-10">
      {!cart.lineItems ? (
        <div>Cart is Empty</div>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          {/* Item */}
          {cart.lineItems.map((item) => (
            <div key={item._id} className="flex gap-4">
              {item.image && (
                <Image
                  src={wixMedia.getScaledToFillImageUrl(item.image, 72, 96, {})}
                  alt="phone"
                  width={60}
                  height={96}
                  className="object-cover roundmd"
                />
              )}
              <div className="flex flex-col justify-between w-full">
                {/* Top */}
                <div>
                  {/* title */}
                  <div className="flex justify-between items-center gap-8">
                    <h3 className="font-semibold">
                      {item?.productName?.original}
                    </h3>
                    <div className="p-1 bg-gray-100 rounded-sm">
                      ${item.price?.amount}
                    </div>
                  </div>
                  {/* Desc */}
                  <div className="text-sm text-gray-500">
                    {item.availability?.status}
                  </div>
                </div>
                {/* Bottom */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-500">Qty. {item.quantity}</span>
                  <span
                    className="text-blue-300 cursor-pointer"
                    onClick={() => {
                      removeItem(wixClient, item._id!);
                    }}
                  >
                    Remove
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Cart Bottom */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center gap-4">
              {/* <span className="font-bold">Subtotal</span>
              <span className="font-semibold">${cart.sub</span> */}
            </div>
            <p className="text-sm">
              Shipping and taxes are calculated at checkout.
            </p>
            <div className="flex justify-between text-sm ">
              <button
                className="p-2 ring-1 ring-gray-500 rounded-md cursor-pointer"
                onClick={() => router.push("/cart")}
              >
                View Cart
              </button>
              <button className="p-2 bg-black text-white rounded-md">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
