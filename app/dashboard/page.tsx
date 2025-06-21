"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyListings from "@/components/dashboard/MyListings";
import MyPurchases from "@/components/dashboard/MyPurchases";
import MySales from "@/components/dashboard/MySales";
import DashboardStats from "@/components/dashboard/DashboardStats";

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && !isSignedIn) {
    redirect("/sign-in?redirect_url=/dashboard");
  }

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your listings, purchases, and sales</p>
      </div>

      <DashboardStats />

      <div className="mt-8">
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings" className="mt-6">
            <MyListings />
          </TabsContent>
          
          <TabsContent value="purchases" className="mt-6">
            <MyPurchases />
          </TabsContent>
          
          <TabsContent value="sales" className="mt-6">
            <MySales />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}