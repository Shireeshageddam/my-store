'use client';

import { useForm } from "react-hook-form";

export default function CategoryForm({ defaultValues = {}, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Category Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Category Name"
          className="w-full border p-2"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>

      <button className="bg-blue-600 text-white py-2 px-4 rounded">
        Save
      </button>
    </form>
  );
}
