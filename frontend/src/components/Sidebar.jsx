import { NavLink } from "react-router-dom";
import { LayoutDashboard, UploadCloud, FileText } from "lucide-react";

function Sidebar() {
  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Upload",
      path: "/upload",
      icon: UploadCloud,
    },
    {
      name: "Documents",
      path: "/documents",
      icon: FileText,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-lg">
          📄
        </div>

        <div>
          <h1 className="text-lg font-bold leading-tight">
            DocuMind AI
          </h1>

          <p className="text-xs text-slate-400">
            Document Intelligence
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-900/40"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <p className="text-xs text-slate-500 text-center leading-relaxed">
          DocuMind AI v1.0
          <br />
          FastAPI · React · Gemini
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
