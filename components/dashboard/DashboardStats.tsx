"use client";

import { useState, useEffect } from "react";
import { Package, DollarSign, Eye, Heart } from "lucide-react";

interface Stats {
  totalListings: number;
  totalSales: number;
  totalViews: number;
  totalLikes: number;
  totalEarnings: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalListings: 0,
    totalSales: 0,
    totalViews: 0,
    totalLikes: 0,
    totalEarnings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with actual API
    setTimeout(() => {
      setStats({
        totalListings: 12,
        totalSales: 8,
        totalViews: 1247,
        totalLikes: 89,
        totalEarnings: 567.50,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: "Active Listings",
      value: stats.totalListings,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Sales",
      value: stats.totalSales,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Likes",
      value: stats.totalLikes,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Earnings Card */}
      <div className="bg-primary rounded-lg p-6 text-white md:col-span-2 lg:col-span-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/80 mb-1">Total Earnings</p>
            <p className="text-3xl font-bold">${stats.totalEarnings.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-primary-foreground/80 text-sm">This Month</p>
            <p className="text-xl font-semibold">$127.50</p>
          </div>
        </div>
      </div>
    </div>
  );
}