import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="px-16 mt-5 bg-gray-100 py-6">
      {/* top */}
      <div className="flex justify-between gap-24">
        {/* left */}
        <div className="w-1/4">
          <Link href="/">
            <div className="text-2xl tracking-wide text-red-300 mb-2">JACK</div>
          </Link>
          <p>1 George St, Sydney NSW 2000, Australia</p>
          <p className="font-bold my-6">email@domain.com </p>
          <p className="font-bold">0999999999</p>
          <div className="flex gap-6 my-6">
            <Image
              src="/facebook.png"
              width={16}
              height={16}
              alt="facebook logo"
            />
            <Image
              src="/instagram.png"
              width={16}
              height={16}
              alt="instagram logo"
            />
            <Image
              src="/youtube.png"
              width={16}
              height={16}
              alt="youtube logo"
            />
            <Image
              src="/pinterest.png"
              width={16}
              height={16}
              alt="pinterest logo"
            />
            <Image src="/x.png" width={16} height={16} alt="x logo" />
          </div>
        </div>
        {/* middle */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-semibold">Company</h1>
            <div className="flex flex-col gap-6">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-semibold">Shop</h1>
            <div className="flex flex-col gap-6">
              <Link href="/">New Arrivals</Link>
              <Link href="/about">Accesories</Link>
              <Link href="/services">Men</Link>
              <Link href="/contact">Women</Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-semibold">Help</h1>
            <div className="flex flex-col gap-6">
              <Link href="/">Customer Services</Link>
              <Link href="/about">My Account</Link>
              <Link href="/services">Legal and Privacy</Link>
              <Link href="/contact">Gift Card</Link>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="text-xl text-red-300">Subscribe</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4 rounded-l-full"
            />
            <button className="w-1/4 bg-red-300 rounded-r-full">JOIN</button>
          </div>

          <p className="font-semibold">Secure Payments</p>
          <div className="flex justify-between">
            <Image src="/discover.png" width={32} height={32} alt="visa logo" />
            <Image src="/skrill.png" width={32} height={32} alt="visa logo" />
            <Image src="/visa.png" width={32} height={32} alt="visa logo" />
            <Image
              src="/mastercard.png"
              width={32}
              height={32}
              alt="mastercard logo"
            />
            <Image src="/paypal.png" width={32} height={32} alt="paypal logo" />
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="w-1/4">Copy right: All right reserved</div>
    </div>
  );
}
