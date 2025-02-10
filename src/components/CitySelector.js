import React, { useState } from "react";
import { Chip } from "@mui/material";

function CitySelector({selectedCity,setSelectedCity
}) {
 
  const cities = ["İstanbul", "Tekirdağ", "Çanakkale", "Bursa"];

  const handleChipClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <div style={{ display: "flex", gap: "10px",alignSelf:"flex-start" }}>
      {cities.map((city) => (
        <Chip
          key={city}
          label={city}
          clickable
          onClick={() => handleChipClick(city)}
          sx={{
            backgroundColor: selectedCity === city ? "#e0f7fa" : "#fff",
            border:  selectedCity === city ? "none":"1px solid #ccc",
            fontWeight: selectedCity === city ? "bold" : "normal",
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          }}
        />
      ))}
    </div>
  );
}

export default CitySelector;
