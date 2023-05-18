import SidebarAdmin from "./SidebarAdmin";

function AdminTemplate({ children }) {
  return (
    <div className="flex">
      <SidebarAdmin></SidebarAdmin>
      <main className="max-w flex-1">{children}</main>
    </div>
  );
}

export default AdminTemplate;
