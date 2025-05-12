import AdminSidebar from "../../components/AdminSidebar";
import AdminTopbar from "../../components/AdminTopbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1">
        <AdminTopbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
