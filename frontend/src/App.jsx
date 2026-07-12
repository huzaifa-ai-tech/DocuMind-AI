import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";


import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import DocumentDetails from "./pages/DocumentDetails";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/documents/:id" element={<DocumentDetails />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;