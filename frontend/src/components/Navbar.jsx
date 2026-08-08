import { Search, Bell } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          DocuMind AI
        </h2>

        <p className="text-sm text-slate-500">
          AI-Powered Document Intelligence Platform
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search
            size={18}
            className="absolute left-3 top-2.5 text-slate-400"
          />

          <input
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 w-64 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        <button className="relative w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition">
          <Bell size={18} className="text-slate-500" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-indigo-500 rounded-full" />
        </button>

        <div
          className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-xl shadow-md"
          title="User"
        >
          🧑‍💻
        </div>
      </div>
    </header>
  );
}

export default Navbar;
