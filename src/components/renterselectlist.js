import React, { useEffect, useState } from "react";

const RenterSelectList = ( props ) => {
  const empty = [];

  const findLocation = (e) => {
    //console.log("These are the props", props, e.target.value)
    props.onChange(e.target.value)
    setDefVal(e.target.value)
    // props.onChange("Bitches and hoes are my thang")
  }

  console.log("selected renter", props.selected)

  const [renters, setRenters] = useState(props.list);

  const [defval, setDefVal] = useState(props.selected)

   useEffect(()=> {
  
      if (props.selected) setDefVal(props.selected)
  
  
    }, [props.selected])


  return (
    <>
    <label htmlFor='renter'>Select a renter</label>
    <select name="renter" value={defval} onChange={findLocation}>
      <option value={0}>Select A Renter</option>
      {props.list && props.list.map((el, index) => (
        <option key={index} value={el.rid}>
          {el.name} - {el.rid}
        </option>
      ))}
    </select>
    </>
    
  );
};

export default RenterSelectList;
