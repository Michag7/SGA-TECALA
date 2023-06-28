import SidebarDocente from "./SidebarDocente";

function AdminDocente({ children }) {
  return (
    <div className="flex">
      <SidebarDocente></SidebarDocente>
      <main className="flex-1 w-full h-full overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}

export default AdminDocente;
