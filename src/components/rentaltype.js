// components/YearSelect.js
import React from "react";

const RentalTypeSelect = () => {
  const types = [
    {
      name: "RV/Camper",
      value: "rv/camper",
    },
    {
      name: "Container Home",
      value: "container",
    },
    {
      name: "House",
      value: "house",
    },
    {
      name: "Condo",
      value: "condo",
    },
    { name: "Apartment", value: "apartmeent" },
  ];

  return (
    <select>
      {types.map((el, index) => (
        <option key={index} value={el.value}>
          {el.name}
        </option>
      ))}
    </select>
  );
};

export default RentalTypeSelect;
