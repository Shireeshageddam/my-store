// app/components/DeleteCategoryButton.js
"use client";

import { useRouter } from "next/navigation";

export default function DeleteCategoryButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;

    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh(); // Re-fetch server data
    } else {
      alert("Failed to delete category");
    }
  };

  return (
    <button onClick={handleDelete} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded">
      Delete
    </button>
  );
}
