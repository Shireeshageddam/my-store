"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CategoryForm from "@/components/CategoryForm";



export default function NewCategoryPage() {
  const router = useRouter();
  const handleSubmit = async (data) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });


    if (res.ok) {
      router.push("/admin/categories");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Category</h2>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}