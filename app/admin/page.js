import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminLayout from "../../components/AdminLayout";


export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-black">Welcome to Admin Dashboard</h1>
      <p className=" text-black">Manage your products, categories, and more!</p>
    </AdminLayout>
  );
}
