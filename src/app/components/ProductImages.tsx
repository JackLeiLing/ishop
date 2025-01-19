"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";

export default function ProductImages({ items }: { items: any }) {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url}
          layout="fill"
          objectFit="cover"
          sizes="50vw"
          alt=""
          className="rounded-md"
        />
      </div>
      <div className="flex gap-9">
        {items &&
          items.map((image: any, index: number) => (
            <div
              className="w-1/4 h-32 relative gap-4 mt-8"
              key={image.image.url}
            >
              <Image
                src={image.image?.url}
                layout="fill"
                objectFit="cover"
                sizes="50vw"
                alt=""
                className="rounded-md cursor-pointer"
                onClick={() => setIndex(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
