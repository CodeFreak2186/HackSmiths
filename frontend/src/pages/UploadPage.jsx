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

  const styles = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .upload-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #333;
    }

    .navbar {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding: 20px 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .navbar h2 {
      color: #2d3748;
      font-weight: 700;
      font-size: 1.75rem;
      letter-spacing: -0.5px;
    }

    .main-layout {
      display: flex;
      flex: 1;
      min-height: 0;
      gap: 0;
    }

    .sidebar {
      width: 280px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      padding: 30px 25px;
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow-y: auto;
    }

    .sidebar::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea, #764ba2);
    }

    .sidebar h3 {
      color: #2d3748;
      margin-bottom: 20px;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .sidebar ul {
      list-style: none;
      space-y: 12px;
    }

    .sidebar li {
      color: #4a5568;
      margin-bottom: 12px;
      padding-left: 20px;
      position: relative;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .sidebar li::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      position: absolute;
      left: 0;
      font-size: 1.2rem;
    }

    .content-area {
      flex: 1;
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      overflow-y: auto;
    }

    .upload-controls {
      background: white;
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      margin-bottom: 30px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      width: 100%;
      max-width: 500px;
    }

    .file-input-wrapper {
      position: relative;
      display: inline-block;
      width: 100%;
      margin-bottom: 20px;
    }

    .file-input {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .file-input-label {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      border: 2px dashed #cbd5e0;
      border-radius: 12px;
      background: #f7fafc;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #4a5568;
      font-weight: 500;
      min-height: 80px;
    }

    .file-input-label:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.05);
      color: #667eea;
      transform: translateY(-2px);
    }

    .upload-btn {
      width: 100%;
      padding: 15px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .upload-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    }

    .upload-btn:active {
      transform: translateY(0);
    }

    .upload-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .status-message {
      margin-top: 15px;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      text-align: center;
    }

    .status-success {
      background: rgba(72, 187, 120, 0.1);
      color: #38a169;
      border: 1px solid rgba(72, 187, 120, 0.3);
    }

    .status-error {
      background: rgba(245, 101, 101, 0.1);
      color: #e53e3e;
      border: 1px solid rgba(245, 101, 101, 0.3);
    }

    .status-loading {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      border: 1px solid rgba(102, 126, 234, 0.3);
    }

    .preview-container {
      width: 100%;
      max-width: 700px;
      margin-top: 20px;
    }

    .preview-iframe {
      width: 100%;
      height: 500px;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      background: white;
    }

    .preview-image {
      width: 100%;
      max-width: 100%;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      background: white;
      padding: 10px;
    }

    .info-panel {
      width: 350px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 30px 25px;
      overflow-y: auto;
      border-left: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .info-panel::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #764ba2, #667eea);
    }

    .info-panel h3 {
      color: #2d3748;
      margin-bottom: 20px;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .info-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }

    .info-card p {
      margin-bottom: 8px;
      color: #4a5568;
      line-height: 1.5;
    }

    .info-card p:last-child {
      margin-bottom: 0;
    }

    .info-card b {
      color: #2d3748;
      font-weight: 600;
    }

    .no-data-message {
      color: #718096;
      font-style: italic;
      text-align: center;
      padding: 20px;
    }

    .loading-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff40;
      border-radius: 50%;
      border-top-color: #ffffff;
      animation: spin 1s ease-in-out infinite;
      margin-right: 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 1024px) {
      .main-layout {
        flex-direction: column;
      }
      
      .sidebar, .info-panel {
        width: 100%;
      }
      
      .content-area {
        padding: 20px;
      }
    }
  `;

  const getStatusClass = () => {
    if (uploadStatus.includes("successful")) return "status-success";
    if (uploadStatus.includes("Uploading")) return "status-loading";
    return "status-error";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="upload-container">
        {/* Navbar */}
        <div className="navbar">
          <h2>FRA Document Upload Portal</h2>
        </div>

        <div className="main-layout">
          {/* Left panel */}
          <div className="sidebar">
            <h3>📋 Instructions</h3>
            <ul>
              <li>Select a PDF or image file (PNG/JPG)</li>
              <li>Click "Upload Document" to submit</li>
              <li>Preview will appear in the main panel</li>
              <li>Extracted data will appear in the info panel</li>
            </ul>
          </div>

          {/* Main content */}
          <div className="content-area">
            <div className="upload-controls">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <div className="file-input-label">
                  {file ? `Selected: ${file.name}` : "📁 Choose file or drag & drop"}
                </div>
              </div>
              
              <button
                onClick={() => handleUpload(file)}
                className="upload-btn"
                disabled={!file || uploadStatus.includes("Uploading")}
              >
                {uploadStatus.includes("Uploading") && <span className="loading-spinner"></span>}
                {uploadStatus.includes("Uploading") ? "Processing..." : "Upload Document"}
              </button>

              {uploadStatus && (
                <div className={`status-message ${getStatusClass()}`}>
                  {uploadStatus}
                </div>
              )}
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="preview-container">
                {file.type === "application/pdf" ? (
                  <iframe
                    src={previewUrl}
                    title="PDF Preview"
                    className="preview-iframe"
                  ></iframe>
                ) : (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="preview-image"
                  />
                )}
              </div>
            )}
          </div>

          {/* Right panel */}
          <div className="info-panel">
            <h3>📄 File Information</h3>
            {file ? (
              <div className="info-card">
                <p><b>Name:</b> {file.name}</p>
                <p><b>Size:</b> {(file.size / 1024).toFixed(2)} KB</p>
                <p><b>Type:</b> {file.type}</p>
              </div>
            ) : (
              <p className="no-data-message">No file selected</p>
            )}

            <h3>🔍 Extracted Data</h3>
            {extractedData ? (
              <div className="info-card">
                {Object.entries(extractedData).map(([key, value]) => (
                  <p key={key}>
                    <b>{key}:</b> {value}
                  </p>
                ))}
              </div>
            ) : (
              <p className="no-data-message">No data extracted yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;