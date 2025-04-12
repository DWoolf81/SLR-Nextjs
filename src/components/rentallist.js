import React, { useState } from "react";

const RentalListSelect = ( props ) => {
  const empty = [];

  console.log("Rentql list ready", props.list)
  
  const findLocation = (e) => {
    console.log("These are the props", props, e.target.value)
    props.onChange(e.target.value)
    setDefVal(e.target.value)
    // props.onChange("Bitches and hoes are my thang")
  }

  const [rvs, setRvs] = useState(props.list);

  const [defval, setDefVal] = useState(0)

  console.log("What are the rvs", rvs)


  return (
    <select name="rental" value={defval} onChange={findLocation}>
      <option value={0}>Select A Resort</option>
      {props.list && props.list.map((el, index) => (
        <option key={index} value={el.rvid}>
          {el.name}
        </option>
      ))}
    </select>
  );
};

export default RentalListSelect;
