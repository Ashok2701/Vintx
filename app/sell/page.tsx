"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SellForm from "@/components/sell/SellForm";
import SellGuide from "@/components/sell/SellGuide";

export default function SellPage() {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && !isSignedIn) {
    redirect("/sign-in?redirect_url=/sell");
  }

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sell Your Items
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Turn your pre-loved items into cash. It's easy, safe, and sustainable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <SellForm />
        <SellGuide />
      </div>
    </div>
  );
}