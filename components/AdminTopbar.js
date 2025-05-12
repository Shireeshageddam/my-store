import LogoutButton from "@/components/LogoutButton";

export default function AdminTopbar() {
  return (
    <div className="bg-gray-800 text-white flex items-center justify-between p-4">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <div>
        <LogoutButton/>
      </div>
    </div>
  );
}
