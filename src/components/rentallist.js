import React, { useEffect, useState } from "react";

const RentalListSelect = ( props ) => {
  const empty = [];

  //console.log("Rentql list ready", props.list)
  
  const setRental = (e) => {
    // console.log("These are the props", props, e.target.value)
    props.onChange(e.target.value)
    setDefVal(e.target.value)
    // props.onChange("Bitches and hoes are my thang")
  }

  const [rvs, setRvs] = useState(props.list);

  const [defval, setDefVal] = useState(props.select)

  useEffect(()=> {

    if (props.select) setDefVal(props.select)


  }, [props.select])



  return (
    <>
    <label htmlFor="rental">Select a rental property</label>
    <select name="rental" value={defval} onChange={setRental}>
      <option value={0}>Select A Rental</option>
      {props.list && props.list.map((el, index) => (
        <option key={index} value={el.rvid}>
          {el.name} - {el.rvid}
        </option>
      ))}
    </select>
    </>
    
  );
};

export default RentalListSelect;
