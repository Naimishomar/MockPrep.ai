import React, { useRef } from "react";
import { Upload } from "lucide-react";

export default function FileUploadBox() {
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      console.log("Dropped file:", file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <div className="flex items-center gap-4 mb-4">
      </div>
      <h2 className="text-2xl font-semibold mb-6">Upload Resume</h2>
      <div onDrop={handleDrop} onDragOver={handleDragOver} className="border-2 border-dashed border-gray-300 rounded-xl w-full max-w-md p-8 flex flex-col items-center justify-center text-center">
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange}/>
        <button onClick={handleBrowseClick} className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-6 py-3 rounded-full mb-3">
          <Upload size={20} /> Browse files
        </button>
        <p className="text-gray-500">or drag and drop it here</p>
      </div>
    </div>
  );
}
