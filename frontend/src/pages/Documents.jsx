import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Eye, FileText } from "lucide-react";
import api from "../services/api";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const response = await api.get("/documents/");
      setDocuments(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) =>
      doc.filename.toLowerCase().includes(search.toLowerCase())
    );
  }, [documents, search]);

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <h1 className="text-4xl font-bold">
          Documents
        </h1>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search document..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl border w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-5">File</th>

              <th className="text-left">Type</th>

              <th className="text-left">Status</th>

              <th className="text-left">Uploaded</th>

              <th className="text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredDocuments.map((doc) => (

              <tr
                key={doc.id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="p-5 flex items-center gap-3">

                  <FileText
                    size={22}
                    className="text-blue-600"
                  />

                  <span className="font-semibold">
                    {doc.filename}
                  </span>

                </td>

                <td>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                    {doc.document_type || "Unknown"}

                  </span>

                </td>

                <td>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                    {doc.status}

                  </span>

                </td>

                <td>

                  {new Date(doc.upload_time).toLocaleDateString()}

                </td>

                <td className="text-center">

                  <Link
                    to={`/documents/${doc.id}`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >

                    <Eye size={18} />

                    View

                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Documents;