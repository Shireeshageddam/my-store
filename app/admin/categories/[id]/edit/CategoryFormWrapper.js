'use client';

import { useRouter } from 'next/navigation';
import CategoryForm from '@/components/CategoryForm'; // adjust path if needed

export default function CategoryFormWrapper({category,id }) {
  const router = useRouter();

  const handleSubmit = async (data) => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/admin/categories');
    } else {
      alert('Failed to create category');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/admin/categories');
    } else {
      alert('Delete failed');
    }
  };

   return (
    <div className="space-y-4">
      <CategoryForm onSubmit={handleSubmit} defaultValues={category} />
      <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
        Delete Category
      </button>
    </div>
  );
}