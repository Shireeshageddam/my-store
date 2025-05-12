"use client";

import Link from "next/link";

export default function ProductRow({ product }) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const res = await fetch(`/api/products/${product.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Product deleted successfully.");
      window.location.reload();
    } else {
      const error = await res.json();
      alert(`Error deleting product: ${error.message}`);
    }
  };

  return (
    <tr>
      <td className="border p-2">{product.name}</td>
      <td className="border p-2">{product.category?.name}</td>
      <td className="border p-2">
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-2 rounded"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-semibold  px-2 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
