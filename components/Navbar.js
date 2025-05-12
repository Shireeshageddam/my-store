'use client';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cartStore';
import { FaShoppingCart } from 'react-icons/fa';

import { useSession } from 'next-auth/react'; 

export default function Navbar() {
  const { items } = useCartStore();
  const totalCount = items.length;
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        MyStore
      </Link>


       <div className="flex items-center gap-4">
        <div className="relative">
        <Link href="/cart" className="flex items-center space-x-1 text-gray-800">
          <FaShoppingCart className="w-6 h-6" />
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
      {session?.user ? (
          <>
          </>
        ) : (
          <Link
            href="/admin/login"
            className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded"
          >
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
}
