import SidebarEstudiante from "./SidebarEstudiante";

function EstudianteTemplate({ children }) {
  return (
    <div className="flex">
      <SidebarEstudiante />
      <main className="flex-1 w-full h-screen overflow-auto bg-white">
        {children}
      </main>
    </div>
  );
}

export default EstudianteTemplate;
