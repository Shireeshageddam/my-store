// components/AdminLayout.js

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li><a href="/admin" className="text-blue-600">Dashboard</a></li>
          <li><a href="/admin/products" className="text-blue-600">Products</a></li>
          <li><a href="/admin/categories" className="text-blue-600">Categories</a></li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
}
