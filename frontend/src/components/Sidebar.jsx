import { NavLink } from "react-router-dom";

function Sidebar() {
  const links = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Upload",
      path: "/upload",
    },
    {
      name: "Documents",
      path: "/documents",
    },
    {
      name: "AI Chat",
      path: "/chat",
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        📄 DocuMind AI
      </h1>

      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;