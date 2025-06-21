"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function HomeContent2() {
  const { userId } = useAuth();

  if (!userId) {
    return (
      <div className="relative w-full h-[400px]">
        <Image
          src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"
          alt="Closet Banner"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            Declutter. Resell. Refresh your style.
          </h2>

          <Link href="/sell">
            <button className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800 transition">
              Sell now
            </button>
          </Link>

          <Link href="/learn" className="text-sm text-white mt-3 underline hover:text-gray-200">
            Learn how it works
          </Link>
        </div>   
      </div>
    );
  }

  return null;
}