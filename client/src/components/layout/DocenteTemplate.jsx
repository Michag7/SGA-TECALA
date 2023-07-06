import SidebarDocente from "./SidebarDocente";

function DocenteTemplate({ children }) {
  return (
    <div className="flex">
      <SidebarDocente></SidebarDocente>
      <main className="flex-1 w-full h-screen overflow-auto bg-white">
        {children}
      </main>
    </div>
  );
}

export default DocenteTemplate;
