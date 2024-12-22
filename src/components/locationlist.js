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


  return (
    <select onChange={findLocation}>
      {locations && locations.map((el, index) => (
        <option key={index} value={el.loc_id}>
          {el.name}
        </option>
      ))}
      <option key="4" value="ABCDC">Abdc</option>
    </select>
  );
};

export default LocationListSelect;
