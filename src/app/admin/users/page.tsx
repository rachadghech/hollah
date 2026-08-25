"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../AdminContext";
import { api } from "../api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const { user, loading: authLoading } = useAdmin();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/admin/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    api.get("/api/auth/users").then((data) => {
      setUsers(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user]);

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
        <h1 className="font-serif-brand text-2xl sm:text-3xl font-semibold text-burgundy">Users</h1>
        <p className="text-sm text-gray-500 mt-1">{users.length} registered users</p>
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-cream p-10 text-center text-gray-400 text-sm">
          No users found
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-cream overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream bg-cream/30">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">User</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Role</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-cream/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy text-sm font-bold">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-burgundy">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{u.email}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                        u.role === "admin" ? "bg-wine/10 text-wine" : "bg-cream text-burgundy/70"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-3">
            {users.map((u) => (
              <div key={u._id} className="bg-white rounded-2xl border border-cream p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy font-bold">
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-burgundy">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                    u.role === "admin" ? "bg-wine/10 text-wine" : "bg-cream text-burgundy/70"
                  }`}>
                    {u.role}
                  </span>
                  <span className="text-xs text-gray-500">
                    Joined {new Date(u.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
