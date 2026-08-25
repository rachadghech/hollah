"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../AdminContext";
import { api } from "../api";

interface OrderItem {
  product: { _id: string; name: string; image: string } | null;
  color: { name: string; hex: string; image: string };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  fullName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  subtotal: number;
  status: string;
  createdAt: string;
}

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { user, loading: authLoading } = useAdmin();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!authLoading && !user) router.replace("/admin/login");
  }, [user, authLoading, router]);

  const fetchOrders = () => {
    api.get("/api/orders").then((data) => {
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/api/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-burgundy border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif-brand text-2xl sm:text-3xl font-semibold text-burgundy">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">{orders.length} total orders</p>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${filter === "all" ? "bg-burgundy text-white" : "bg-white text-burgundy border border-cream hover:border-burgundy/30"}`}>
          All ({orders.length})
        </button>
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap capitalize ${filter === s ? "bg-burgundy text-white" : "bg-white text-burgundy border border-cream hover:border-burgundy/30"}`}>
            {s} ({orders.filter((o) => o.status === s).length})
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-cream p-10 text-center text-gray-400 text-sm">
          No orders found
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl border border-cream overflow-hidden">
              {/* Order Header */}
              <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer" onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-cream flex items-center justify-center text-burgundy text-sm font-bold shrink-0">
                    {order.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-burgundy truncate">{order.fullName}</p>
                    <p className="text-xs text-gray-500">{order.phone} &middot; {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-12 sm:ml-0">
                  <span className="text-xs text-gray-500">{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-gold">{order.subtotal.toLocaleString()} DZD</span>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === order._id && (
                <div className="px-5 pb-5 border-t border-cream pt-4">
                  {/* Address */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Shipping Address</p>
                    <p className="text-sm text-burgundy">{order.address}</p>
                  </div>

                  {/* Items */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Items</p>
                    <div className="flex flex-col gap-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-cream/30 rounded-xl px-3 py-2">
                          <img src={item.product?.image || item.color.image} alt="" className="w-10 h-12 object-cover rounded-lg" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-burgundy truncate">{item.product?.name || "Product removed"}</p>
                            <p className="text-xs text-gray-500">{item.color.name} &middot; Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-bold text-gold shrink-0">{(item.price * item.quantity).toLocaleString()} DZD</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Update Status</p>
                    <div className="flex gap-2 flex-wrap">
                      {statuses.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(order._id, s)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${
                            order.status === s ? "bg-burgundy text-white" : "bg-white text-burgundy border border-cream hover:border-burgundy/30"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
