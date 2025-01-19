"use client";

import React, { useEffect, useState } from "react";
import { products } from "@wix/stores";
import Add from "./Add";

export default function CustomizeProduct({
  productId,
  productOptions,
  productVarians,
}: {
  productId: string;
  productOptions: products.ProductOption[];
  productVarians: products.Variant[];
}) {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const [selectedVariant, setSelectedVariant] = useState<products.Variant>({});

  useEffect(() => {
    const variant = productVarians.find((v) => {
      const variantChoices = v.choices;
      return (
        variantChoices &&
        Object.entries(selectedOptions).every(
          ([key, value]) => variantChoices[key] === value
        )
      );
    });

    variant && setSelectedVariant(variant);
  }, [selectedOptions, productVarians]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVarianInstock = (choices: { [key: string]: string }) => {
    return productVarians.some((variant, index) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      // console.log(Object.entries(choices));
      // console.log(variant);
      return Object.entries(choices).every(([key, value]) => {
        return variantChoices[key] === value && variant.stock?.quantity;
      });
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* <pre>{JSON.stringify(selectedOptions, null, 2)}</pre> */}
      {productOptions.map((option) => (
        <div className="" key={option.name}>
          <h4>{option.name}</h4>
          <ul className="flex items-center gap-4">
            {option.choices?.map((choice) => {
              const disabled = !isVarianInstock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });
              const selected =
                selectedOptions[option.name!] === choice.description;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);
              return option.name === "Color" ? (
                <li
                  key={choice.description}
                  onClick={clickHandler}
                  className="w-8 h-8 ring-1 ring-gray-300 cursor-pointer relative rounded-full"
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                >
                  {selected && (
                    <div
                      className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      "
                    ></div>
                  )}
                  {disabled && (
                    <div
                      className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      "
                    ></div>
                  )}
                </li>
              ) : (
                <li
                  className="ring-1 ring-red-500 rounded-md py-1 px-4 text-sm"
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selected
                      ? "#f35c7a"
                      : disabled
                      ? "#fbcfe8"
                      : "white",
                    color: selected || disabled ? "white" : "#f35c7a",
                  }}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              );
            })}
            <li>
              {" "}
              <button
                className="rounded-full bg-orange-700 text-white px-4 py-1"
                onClick={() => setSelectedOptions({})}
              >
                Reset
              </button>
            </li>
          </ul>
        </div>
      ))}

      <Add
        productId={productId}
        variantId={selectedVariant._id || "000000-0000-0000-0000-0000000000"}
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
    </div>
  );
}
