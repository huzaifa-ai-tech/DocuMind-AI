function Navbar() {
  return (
    <header className="bg-white shadow px-8 py-5 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-gray-500">
          AI-Powered Document Intelligence Platform
        </p>
      </div>

      <div className="flex items-center gap-4">
        <input
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-64 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          H
        </div>
      </div>
    </header>
  );
}

export default Navbar;