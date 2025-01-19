"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collection",
    description: "Save up to 50% off",
    img: "https://images.pexels.com/photos/2072583/pexels-photo-2072583.jpeg",
    url: "/shop",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Spring Sale Collection",
    description: "Save up to 50% off",
    img: "https://images.pexels.com/photos/2072583/pexels-photo-2072583.jpeg",
    url: "/shop",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 3,
    title: "Autumn Sale Collection",
    description: "Save up to 50% off",
    img: "https://images.pexels.com/photos/2072583/pexels-photo-2072583.jpeg",
    url: "/shop",
    bg: "bg-gradient-to-r from-green-50 to-yellow-50",
  },
  {
    id: 4,
    title: "Winter Sale Collection",
    description: "Save up to 50% off",
    img: "https://images.pexels.com/photos/2072583/pexels-photo-2072583.jpeg",
    url: "/shop",
    bg: "bg-gradient-to-r from-purple-50 to-pink-50",
  },
];

export default function Slider() {
  const [current, setCurrent] = React.useState(0);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div className="w-max h-full flex ">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-screen h-[calc(100vh-80px)] flex flex-col md:flex-row transition-all duration-1000 ease-in-out ${slide.bg}`}
            style={{
              transform: `translateX(-${current * 100}%)`,
              opacity: index === current ? 1 : 0,
            }}
          >
            {/* text content */}
            <div className="h-1/2 p-2 flex flex-col  justify-center items-center md:w-1/2 md:h-full">
              <h1 className="text-4xl font-bold text-black">{slide.title}</h1>

              <p className="text-gray-600">{slide.description}</p>
              <Link href={slide.url}>
                <button className="bg-black text-white px-4 py-2 mt-4">
                  Shop Now
                </button>
              </Link>
            </div>
            {/* Image content */}
            <div className=" h-1/2 md:w-1/2 md:h-full relative">
              <Image
                src={slide.img}
                className="object-cover"
                sizes="100%"
                alt="slider"
                fill
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 rounded-full bg-gray-500 mx-2 ${
              index === current ? "opacity-100" : "opacity-50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
