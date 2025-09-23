import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchFRAPattas } from "../api";

const MapPage = () => {
  const [fraData, setFraData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchFRAPattas();
      console.log("GeoJSON from backend:", res);
      setFraData(res); // should return full GeoJSON FeatureCollection
    };
    loadData();
  }, []);

  const onEachFeature = (feature, layer) => {
    const props = feature.properties;
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

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>FRA Map</h2>
      <MapContainer
        center={[23.745127, 91.746826]}
        zoom={5}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {fraData && (
          <GeoJSON
            data={fraData}
            style={{ color: "green", weight: 2, fillOpacity: 0.3 }}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;
