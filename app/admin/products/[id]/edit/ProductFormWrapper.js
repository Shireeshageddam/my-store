'use client';

import ProductForm from '../../ProductForm';
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function ProductFormWrapper({ defaultValues, categories, productId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
      setLoading(true);
    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      alert("Error updating product.");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const res = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      const error = await res.json();
      alert(`Error deleting product: ${error.message}`);
    }
  };


  return (
     <div className="space-y-4">
    <ProductForm
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      categories={categories}
    />
    <button
        type="button"
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        disabled={loading}
      >
        Delete Product
      </button>
    </div>
  );
}
