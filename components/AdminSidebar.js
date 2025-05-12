"use client";

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold text-center text-white">Admin Panel</h2>
      </div>
      <ul className="space-y-4 p-4">
        <li>
          <Link href="/admin" className="text-white hover:bg-gray-700 p-2 block rounded">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/products" className="text-white hover:bg-gray-700 p-2 block rounded">Products</Link>
        </li>
        <li>
          <Link href="/admin/categories" className="text-white hover:bg-gray-700 p-2 block rounded">Categories</Link>
        </li>
      </ul>
    </div>
  );
}
