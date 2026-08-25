"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "./AdminContext";
import { api } from "./api";

interface Order {
  _id: string;
  fullName: string;
  phone: string;
  address: string;
  items: { product: { name: string; image: string }; color: { name: string }; quantity: number; price: number }[];
  subtotal: number;
  status: string;
  createdAt: string;
}

interface Product {
  _id: string;
}

interface User {
  _id: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAdmin();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/admin/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      api.get("/api/orders").catch(() => ({ length: 0 })),
      api.get("/api/products").catch(() => ({ length: 0 })),
      api.get("/api/auth/users").catch(() => ({ length: 0 })),
    ]).then(([o, p, u]) => {
      setOrders(Array.isArray(o) ? o : []);
      setProducts(Array.isArray(p) ? p : []);
      setUsers(Array.isArray(u) ? u : []);
      setLoading(false);
    });
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-burgundy border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.subtotal, 0);

  const stats = [
    { label: "Total Orders", value: orders.length, color: "bg-wine/10 text-wine" },
    { label: "Pending Orders", value: pendingOrders, color: "bg-amber-50 text-amber-700" },
    { label: "Total Products", value: products.length, color: "bg-blue-50 text-blue-700" },
    { label: "Total Users", value: users.length, color: "bg-green-50 text-green-700" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif-brand text-2xl sm:text-3xl font-semibold text-burgundy">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-cream p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color} rounded-lg inline-block px-2 py-0.5`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue Card */}
      <div className="bg-white rounded-2xl border border-cream p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Total Revenue</p>
        <p className="font-serif-brand text-3xl font-bold text-gold">
          {totalRevenue.toLocaleString()} DZD
        </p>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-cream">
        <div className="px-5 py-4 border-b border-cream flex items-center justify-between">
          <h2 className="font-serif-brand text-lg font-semibold text-burgundy">Recent Orders</h2>
          <button
            onClick={() => router.push("/admin/orders")}
            className="text-xs font-medium text-gold hover:text-gold-dark transition-colors"
          >
            View All
          </button>
        </div>
        {orders.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">No orders yet</div>
        ) : (
          <div className="divide-y divide-cream">
            {orders.slice(0, 5).map((order) => (
              <div key={order._id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-burgundy truncate">{order.fullName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""} &middot; {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-gold whitespace-nowrap">
                    {order.subtotal.toLocaleString()} DZD
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
