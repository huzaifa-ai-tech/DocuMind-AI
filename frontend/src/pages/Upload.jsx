import { useRef, useState } from "react";
import {
  UploadCloud,
  FileImage,
  X,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";

function Upload() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  function handleFile(selectedFile) {
    if (!selectedFile) return;

    setFile(selectedFile);
    setSuccess("");
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  async function uploadFile() {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setSuccess("");

    try {
      await api.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("✅ Document uploaded successfully!");

      setFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">

      <div className="bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold mb-2">
          Upload Document
        </h1>

        <p className="text-gray-500 mb-8">
          Upload invoices, passports or images and let AI analyze them.
        </p>

        <div
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
            dragging
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
          }`}
        >
          <UploadCloud
            size={70}
            className="mx-auto text-blue-600 mb-4"
          />

          <h2 className="text-2xl font-bold">
            Drag & Drop your file
          </h2>

          <p className="text-gray-500 mt-2">
            or click to browse
          </p>

          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {file && (
          <div className="mt-8 flex items-center justify-between bg-gray-100 rounded-xl p-5">

            <div className="flex items-center gap-4">

              <FileImage
                size={40}
                className="text-blue-600"
              />

              <div>
                <h3 className="font-bold">
                  {file.name}
                </h3>

                <p className="text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>

            </div>

            <button
              onClick={() => {
                setFile(null);

                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }}
            >
              <X className="text-red-500 hover:text-red-700" />
            </button>

          </div>
        )}

        <button
          onClick={uploadFile}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload to AI"}
        </button>

        {success && (
          <div className="mt-6 bg-green-100 text-green-700 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle />
            {success}
          </div>
        )}

      </div>

    </div>
  );
}

export default Upload;