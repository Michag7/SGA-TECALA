import SidebarAdmin from "./SidebarAdmin";

function AdminTemplate({ children }) {
  return (
    <div className="flex">
      <SidebarAdmin></SidebarAdmin>
      <main className="h-full w-full flex-1 overflow-auto bg-gray-50">{children}</main>
    </div>
  );
}

export default AdminTemplate;
