import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
// import NavIcons from "./NavIcons";
const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

export default function NavBar() {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
      <div className="flex items-center justify-between h-full md:hidden">
        {/* Mobile */}
        <Link
          href={"/"}
          className="flex items-center justify-center gap-2 text-2xl"
        >
          <Image src={"/logo.png"} width={30} height={30} alt={"logo"} />
          JACK
        </Link>
        <Menu />
      </div>

      {/* Bigger Screens */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* left */}
        <div className="w-1/3 xl:w-1/2 flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2 text-2xl">
            <Image src={"/logo.png"} width={30} height={30} alt={"logo"} />
            JACK
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href={"/"}>Home</Link>
            <Link href={"/"}>Shop</Link>
            <Link href={"/"}>Deals</Link>
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Contact</Link>
          </div>
        </div>
        {/* right */}
        <div className="w-2/3 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
}
