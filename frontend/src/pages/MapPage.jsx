import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchFRAPattas } from "../api";

const SCHEMES = [
  "Eligible for PM-KISAN benefits",
  "Recommended for Jal Jeevan Mission (Water Supply)",
  "Check forest conservation incentives",
  "Consider solar pump subsidy",
  "Eligible for MGNREGA land development work",
  "Soil health card scheme applicable",
  "Crop insurance under PMFBY recommended"
];

const getRandomRecommendations = () => {
  const shuffled = [...SCHEMES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 2);
};

const MapPage = () => {
  const [fraData, setFraData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedDSS, setSelectedDSS] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFRA = async () => {
      try {
        setIsLoading(true);
        const res = await fetchFRAPattas();
        if (res?.features) setFraData(res);
        else console.error("Invalid GeoJSON:", res);
      } catch (err) {
        console.error("Error fetching FRA Pattas:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadFRA();
  }, []);

  const onEachFeature = (feature, layer) => {
    const props = feature.properties;

    layer.on({
      click: () => {
        setSelectedFeature(props);
        setSelectedDSS(getRandomRecommendations());
      },
      mouseover: () => {
        layer.setStyle({ weight: 3, color: "#FF5733", fillOpacity: 0.5 });
        layer.openPopup();
      },
      mouseout: () => {
        layer.setStyle({ weight: 2, color: "#27AE60", fillOpacity: 0.3 });
        layer.closePopup();
      },
    });

    layer.bindPopup(`
      <div style="font-family: 'Inter', sans-serif; padding: 4px;">
        <div style="font-weight: 600; font-size: 14px; color: #1e293b; margin-bottom: 8px;">
          📍 ${props.holder_name}
        </div>
        <div style="font-size: 12px; color: #64748b; line-height: 1.4;">
          <div><strong>Village:</strong> ${props.village}</div>
          <div><strong>District:</strong> ${props.district}</div>
          <div><strong>Status:</strong> <span style="color: ${props.claim_status === 'Approved' ? '#10b981' : '#f59e0b'}">${props.claim_status}</span></div>
          <div><strong>Area:</strong> ${props.area} acres</div>
        </div>
      </div>
    `);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const navButtons = [
    { label: "Upload FRA", route: "/upload", icon: "📁" },
    { label: "FRA Docs", route: "/fra-docs", icon: "📋" },
    { label: "Analytics", route: "/analytics", icon: "📊" },
    { label: "Logout", action: handleLogout, icon: "🚪" },
  ];

  const sidebarItems = [
    { name: "Dashboard", icon: "🏠", active: false },
    { name: "FRA Maps", icon: "🗺️", active: true },
    { name: "Reports", icon: "📈", active: false },
    { name: "Settings", icon: "⚙️", active: false }
  ];

  return (
    <div className="dashboard-container">
      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow: hidden;
        }

        .navbar {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          color: white;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 1000;
        }

        .navbar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          z-index: -1;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          cursor: pointer;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: all 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05);
          text-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
        }

        .nav-buttons {
          display: flex;
          gap: 12px;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }

        .main-content {
          flex: 1;
          display: flex;
          min-height: 0;
          position: relative;
        }

        .sidebar {
          width: ${sidebarCollapsed ? '70px' : '280px'};
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(20px);
          color: #e2e8f0;
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%);
          z-index: -1;
        }

        .sidebar-toggle {
          position: absolute;
          top: 20px;
          right: -15px;
          background: rgba(59, 130, 246, 0.9);
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .sidebar-toggle:hover {
          background: rgba(59, 130, 246, 1);
          transform: scale(1.1);
        }

        .sidebar-section {
          margin-bottom: 32px;
          opacity: ${sidebarCollapsed ? '0' : '1'};
          transition: opacity 0.3s ease;
        }

        .sidebar-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #f8fafc;
          ${sidebarCollapsed ? 'display: none;' : ''}
        }

        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          margin-bottom: 8px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          position: relative;
          overflow: hidden;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .nav-item:hover::before {
          left: 100%;
        }

        .nav-item:hover {
          background: rgba(59, 130, 246, 0.2);
          transform: translateX(8px);
          color: #60a5fa;
        }

        .nav-item.active {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
          color: #60a5fa;
          border-left: 3px solid #60a5fa;
        }

        .nav-icon {
          font-size: 18px;
          width: 24px;
          text-align: center;
        }

        .filter-section {
          ${sidebarCollapsed ? 'display: none;' : ''}
        }

        .filter-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .filter-btn {
          padding: 12px 16px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.8));
          color: white;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 14px;
          position: relative;
          overflow: hidden;
        }

        .filter-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .filter-btn:hover::before {
          left: 100%;
        }

        .filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
        }

        .filter-btn:active {
          transform: translateY(0);
        }

        .map-container {
          flex: 1;
          position: relative;
          border-radius: 0;
          overflow: hidden;
        }

        .map-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          z-index: 1000;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .right-panel {
          width: 350px;
          background: rgba(248, 250, 252, 0.95);
          backdrop-filter: blur(20px);
          padding: 24px;
          overflow-y: auto;
          border-left: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .right-panel::-webkit-scrollbar {
          width: 6px;
        }

        .right-panel::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        .right-panel::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          border-radius: 3px;
        }

        .panel-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .plot-details {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
          animation: slideInUp 0.5s ease;
          position: relative;
          overflow: hidden;
        }

        .plot-details::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #60a5fa, #a78bfa, #10b981);
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
          animation: fadeInLeft 0.5s ease forwards;
          opacity: 0;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-item:nth-child(1) { animation-delay: 0.1s; }
        .detail-item:nth-child(2) { animation-delay: 0.2s; }
        .detail-item:nth-child(3) { animation-delay: 0.3s; }
        .detail-item:nth-child(4) { animation-delay: 0.4s; }
        .detail-item:nth-child(5) { animation-delay: 0.5s; }

        .detail-label {
          font-weight: 600;
          color: #475569;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-weight: 500;
          color: #1e293b;
          text-align: right;
          font-size: 14px;
        }

        .recommendations-section {
          margin-top: 24px;
          animation: slideInUp 0.6s ease;
        }

        .recommendations-title {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .recommendations-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .recommendation-item {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05));
          padding: 12px 16px;
          margin-bottom: 8px;
          border-radius: 10px;
          border-left: 3px solid #60a5fa;
          font-size: 14px;
          color: #475569;
          transition: all 0.3s ease;
          animation: fadeInRight 0.5s ease forwards;
          opacity: 0;
          position: relative;
          overflow: hidden;
        }

        .recommendation-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.8s ease;
        }

        .recommendation-item:hover::before {
          left: 100%;
        }

        .recommendation-item:nth-child(1) { animation-delay: 0.2s; }
        .recommendation-item:nth-child(2) { animation-delay: 0.3s; }
        .recommendation-item:nth-child(3) { animation-delay: 0.4s; }
        .recommendation-item:nth-child(4) { animation-delay: 0.5s; }

        .recommendation-item:hover {
          transform: translateX(8px);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #64748b;
          font-size: 16px;
          animation: fadeIn 0.5s ease;
        }

        .loading-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1001;
          background: rgba(255, 255, 255, 0.9);
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid #60a5fa;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes fadeInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }

        @keyframes fadeInRight {
          from { 
            opacity: 0; 
            transform: translateX(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }

        @media (max-width: 768px) {
          .main-content {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            height: auto;
          }
          
          .right-panel {
            width: 100%;
          }
        }
      `}</style>

      {/* Navbar */}
      <div className="navbar">
        <h2 className="logo" onClick={() => navigate("/")}>
          FRA Dashboard
        </h2>
        <div className="nav-buttons">
          {navButtons.map(btn => (
            <button
              key={btn.label}
              className="nav-btn"
              onClick={btn.action ? btn.action : () => navigate(btn.route)}
            >
              <span>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Navigation</h3>
            <ul className="sidebar-nav">
              {sidebarItems.map(item => (
                <li 
                  key={item.name} 
                  className={`nav-item ${item.active ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!sidebarCollapsed && item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <hr style={{ borderColor: '#475569', margin: '24px 0' }} />
            <h4 className="sidebar-title">Filters</h4>
            <div className="filter-buttons">
              <button className="filter-btn">✅ Show Approved</button>
              <button className="filter-btn">⏳ Show Pending</button>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="map-container">
          {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          )}
          <MapContainer center={[23.745127, 91.746826]} zoom={6} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and others'
            />
            {fraData && (
              <GeoJSON
                data={fraData}
                style={{ color: "#27AE60", weight: 2, fillOpacity: 0.3, cursor: "pointer" }}
                onEachFeature={onEachFeature}
              />
            )}
          </MapContainer>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <h3 className="panel-title">
            <span>📊</span>
            Plot Details
          </h3>
          
          {selectedFeature ? (
            <div className="plot-details">
              {Object.entries(selectedFeature).map(([key, value]) => (
                <div key={key} className="detail-item">
                  <span className="detail-label">
                    {key.replace("_", " ")}
                  </span>
                  <span className="detail-value">{value ?? "N/A"}</span>
                </div>
              ))}

              <div className="recommendations-section">
                <h4 className="recommendations-title">
                  <span>🎯</span>
                  DSS Recommendations
                </h4>
                {selectedDSS.length > 0 ? (
                  <ul className="recommendations-list">
                    {selectedDSS.map((rec, idx) => (
                      <li key={idx} className="recommendation-item">
                        {rec}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-state">No recommendations available.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
              <p>Click on a plot to see details and DSS recommendations here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;