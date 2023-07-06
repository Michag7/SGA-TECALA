import SidebarAdmin from "./SidebarAdmin";

function AdminTemplate({ children }) {
  return (
    <div className="flex">
      <SidebarAdmin></SidebarAdmin>
      <main className="flex-1 w-full h-screen overflow-auto bg-white">
        {children}
      </main>
    </div>
  );
}

export default AdminTemplate;
