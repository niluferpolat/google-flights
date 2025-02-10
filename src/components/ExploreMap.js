import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@mui/material";

function ExploreMap() {
  return (
    <div style={{ position: "relative", height: "400px", width: "100%", borderRadius: "8px", overflow: "hidden" }}>
        <Button
        variant="contained"
        color="primary"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff",
          color: "#1976d2",
          fontWeight: "bold",
          padding: "10px 20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#e3f2fd",
          },
        }}
      >
        Explore destinations
      </Button>
      <MapContainer
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        center={[0, 0]} 
        zoom={3}         
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>

      
    </div>
  );
}

export default ExploreMap;
