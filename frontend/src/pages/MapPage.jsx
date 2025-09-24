import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchFRAPattas } from "../api";

const MapPage = () => {
  const [fraData, setFraData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchFRAPattas();
        console.log("API Response:", res);
        if (res && res.features && Array.isArray(res.features)) {
          setFraData(res);
        } else {
          console.error("Invalid GeoJSON format", res);
        }
      } catch (err) {
        console.error("Error fetching FRA Pattas:", err);
      }
    };

    loadData();
  }, []);

  const onEachFeature = (feature, layer) => {
    const props = feature.properties;

    layer.on({
      click: () => setSelectedFeature(props),
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
      <b>Holder:</b> ${props.holder_name}<br/>
      <b>Village:</b> ${props.village}<br/>
      <b>District:</b> ${props.district}<br/>
      <b>Status:</b> ${props.claim_status}<br/>
      <b>Claim Type:</b> ${props.claim_type}<br/>
      <b>Survey No:</b> ${props.survey_no}<br/>
      <b>Area:</b> ${props.area} acres
    `);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear auth token
    navigate("/login"); // Redirect to login
  };

  const navButtons = [
    { label: "Upload FRA", route: "/upload" },
    { label: "FRA Docs", route: "/fra-docs" },
    { label: "Analytics", route: "/analytics" },
    { label: "Logout", action: handleLogout }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Navbar */}
      <div style={{
        flex: "0 0 auto",
        backgroundColor: "#1F2A38",
        color: "#fff",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ margin: 0, fontWeight: "600", cursor: "pointer" }} onClick={() => navigate("/")}>
          FRA Dashboard
        </h2>
        <div style={{ display: "flex", gap: "12px" }}>
          {navButtons.map(btn => (
            <button
              key={btn.label}
              style={btnStyle}
              onClick={btn.action ? btn.action : () => navigate(btn.route)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: "1 1 auto", display: "flex", minHeight: 0 }}>
        {/* Left Panel */}
        <div style={leftPanelStyle}>
          <h3 style={{ marginTop: 0 }}>Navigation</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Dashboard", "FRA Maps", "Reports", "Settings"].map(item => (
              <li key={item} style={navItemStyle}>{item}</li>
            ))}
          </ul>
          <hr style={{ borderColor: "#7F8C8D" }} />
          <h4>Filters</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button style={filterBtnStyle}>Show Approved</button>
            <button style={filterBtnStyle}>Show Pending</button>
          </div>
        </div>

        {/* Map */}
        <div style={{ flex: "1 1 auto", minHeight: 0 }}>
          <MapContainer
            center={[23.745127, 91.746826]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
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
        <div style={rightPanelStyle}>
          <h3>Plot Details</h3>
          {selectedFeature ? (
            <div style={plotDetailStyle}>
              {Object.entries(selectedFeature).map(([key, value]) => (
                <p key={key}><b>{key.replace("_", " ").toUpperCase()}:</b> {value}</p>
              ))}
            </div>
          ) : (
            <p>Click on a plot to see details here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const btnStyle = {
  padding: "8px 16px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#2980B9",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.3s",
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
};
const filterBtnStyle = {
  ...btnStyle,
  backgroundColor: "#16A085",
  fontWeight: "500",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
};
const navItemStyle = {
  padding: "10px 8px",
  marginBottom: "8px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.2s",
  backgroundColor: "#3E556E",
};
const leftPanelStyle = {
  width: "220px",
  backgroundColor: "#34495E",
  color: "#ECF0F1",
  padding: "20px",
  overflowY: "auto",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
};
const rightPanelStyle = {
  width: "300px",
  backgroundColor: "#ECF0F1",
  padding: "20px",
  overflowY: "auto",
  boxShadow: "-2px 0 5px rgba(0,0,0,0.1)"
};
const plotDetailStyle = {
  padding: "15px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

export default MapPage;
