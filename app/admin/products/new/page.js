
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ProductForm from "../ProductForm";

export default function NewProductPage() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

      if (!res.ok) {
        const error = await res.text();
        console.error("API Error:", error);
      } else {
        router.push("/admin/products");
      }
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <ProductForm
        onSubmit={handleSubmit}
        categories={categories}
      />
    </div>
  );
}
