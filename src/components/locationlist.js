import { getLocationList } from "@/lib/admin_actions";
import React, { useEffect, useState } from "react";

const LocationListSelect = ( props ) => {
  const empty = [];

  const findLocation = (e) => {
    console.log("These are the props", props, e.target.value)
    props.onChange(e.target.value)
    // props.onChange("Bitches and hoes are my thang")
  }

  const [locations, setLocations] = useState(props.search);

  const [defval, setDefVal] = useState("")


  return (
    <select value={defval} onChange={findLocation}>
      <option value={0}>Select A Resort</option>
      {locations && locations.map((el, index) => (
        <option key={index} value={el.loc_id}>
          {el.name}
        </option>
      ))}
    </select>
  );
};

export default LocationListSelect;
