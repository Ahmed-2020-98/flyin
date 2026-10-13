"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";

export default function HotelGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div>
      <div className="aspect-[16/9] overflow-hidden rounded-2xl">
        <SmartImage
          src={main}
          alt={alt}
          label={alt}
          className="h-full w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`aspect-[16/10] w-24 overflow-hidden rounded-lg border-2 transition ${
                active === i ? "border-brand-500" : "border-transparent"
              }`}
            >
              <SmartImage
                src={img}
                alt={alt}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
