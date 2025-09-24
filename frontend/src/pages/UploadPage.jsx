import { useState } from "react";
import { uploadFRADocument } from "../api"; // fixed import

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [extractedData, setExtractedData] = useState(null);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setExtractedData(null); // reset previous data

    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    // Generate preview
    if (selectedFile.type === "application/pdf") {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else if (selectedFile.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      alert("Only PDF or image files are allowed!");
      setFile(null);
      setPreviewUrl(null);
    }
  };

  // Upload file and call backend
  const handleUpload = async (file) => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      const extracted = await uploadFRADocument(file);
      setExtractedData(extracted);
      setUploadStatus("Upload successful!");
    } catch (err) {
      setUploadStatus(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          flex: "0 0 auto",
          backgroundColor: "#2C3E50",
          color: "#fff",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Upload FRA Document</h2>
      </div>

      <div style={{ flex: "1 1 auto", display: "flex", minHeight: 0 }}>
        {/* Left panel */}
        <div
          style={{
            width: "220px",
            backgroundColor: "#34495E",
            color: "#ECF0F1",
            padding: "15px",
          }}
        >
          <h3>Instructions</h3>
          <ul>
            <li>Select a PDF or image (PNG/JPG)</li>
            <li>Click "Upload" to submit</li>
            <li>Preview will appear in the main panel</li>
            <li>Extracted data will appear in right panel</li>
          </ul>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: "1 1 auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            accept=".pdf,image/png,image/jpeg"
            onChange={handleFileChange}
            style={{ marginBottom: "20px" }}
          />
          <button
            onClick={() => handleUpload(file)} // ✅ fixed here
            style={{
              padding: "10px 20px",
              backgroundColor: "#2980B9",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Upload
          </button>

          {uploadStatus && <p>{uploadStatus}</p>}

          {/* Preview */}
          {previewUrl && (
            <div style={{ marginTop: "20px", width: "100%", maxWidth: "600px" }}>
              {file.type === "application/pdf" ? (
                <iframe
                  src={previewUrl}
                  title="PDF Preview"
                  width="100%"
                  height="500px"
                  style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                ></iframe>
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Right panel */}
        <div
          style={{
            width: "300px",
            backgroundColor: "#ECF0F1",
            padding: "15px",
            overflowY: "auto",
            boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>File Info</h3>
          {file ? (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              <p>
                <b>Name:</b> {file.name}
              </p>
              <p>
                <b>Size:</b> {(file.size / 1024).toFixed(2)} KB
              </p>
              <p>
                <b>Type:</b> {file.type}
              </p>
            </div>
          ) : (
            <p>No file selected</p>
          )}

          <h3>Extracted Data</h3>
          {extractedData ? (
            <div
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              {Object.entries(extractedData).map(([key, value]) => (
                <p key={key}>
                  <b>{key}:</b> {value}
                </p>
              ))}
            </div>
          ) : (
            <p>No data extracted yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
