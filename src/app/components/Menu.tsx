"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Menu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Image
        src="/menu.png"
        alt="menu"
        width="28"
        height="28"
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute bg-black backdrop-blur-sm bg-opacity-70 shadow-inner text-white left-0 top-20 w-full h-[calc(100vh-5rem)] flex flex-col items-center justify-center gap-4 ">
          <Link href="/">Home</Link>
          <Link href="/list">Shop</Link>
          <Link href="/login">Deals</Link>
          <Link href="/login">About</Link>
          <Link href="/login">Contact</Link>
          <Link href="/login">Logout</Link>
          <Link href="/login">Cart(1)</Link>
        </div>
      )}
    </div>
  );
}
