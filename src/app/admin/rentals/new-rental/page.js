"use client";

import Camper from "@/components/admin/rentalforms/camper";
import RentalListType from "@/components/admin/rentaltypelist/rentallistype";
import { getLocationList } from "@/lib/admin_actions";
import { useEffect, useReducer, useState } from "react";


const reducer = (state, action ) => {


  console.log(state, action)
  return { value: action.value }
}



export default function RentalPage() {

  const orig = ['one', 'two', 'three', 'four', 'five', 'six']

  const remove = ['six', 3]

  

  const origg = orig.filter((num) => num != remove[0] )

  const arr = []

  let count = 0;

  origg.map((img) => {

    if (count == remove[1]) {
        arr[count] = remove[0]
        count++
    }

    arr[count] = img
    count++

  })

  console.log("Six should be at postion 3 now", arr)



  const clicked = (text) => {
    console.log("I've been clicked! Here's my message", text)
    setStated(text)
  }

  const [locations, setLocations] = useState("");

  const [ stated, setStated ] = useState({ value: "Default" })


  const [ state, dispatch ] = useReducer(reducer, {value: "Default"})


  useEffect(() => {
    const locationcomp = async () => {
      const res = await getLocationList();

      console.log("Location is NOT set", res)

      //setLocations(JSON.parse(JSON.stringify(res))); 

      setLocations(res)

      console.log("Location IS set")


      
    };

    locationcomp();



  }, [state]);

  

  return (
    <>
    <RentalListType onClick={clicked} />
      <div style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            borderBottom: "solid 1px #fefefe",
            padding: "10px 0px",
            marginBottom: "20px"
      }}>
        
        <button onClick={() => dispatch({value: "camper"})} className="admin-link" value={"RV/Camper"}>RV/Camper</button>
        <button onClick={() => dispatch({value: "house"})} className="admin-link" value={"House"}>House</button>
        <button onClick={() => dispatch({value: "condo"})} className="admin-link" value={"Condo"}>Condo</button>
        <button onClick={() => dispatch({value: "apartment"})} className="admin-link" value={"Apartment"}>Apartment</button>
        <button onClick={() => dispatch({value: "container"})} className="admin-link" value={"Container"}>Container Home</button>
        <button onClick={() => dispatch({value: "townhome"})} className="admin-link" vlaue={"Townhome"}>Town Home</button>

      </div>
      <div>
          <h2>New { state.value }</h2>
        </div>
      { state.value == 'camper' && <Camper locations={locations} type={"insert"} /> }
      { stated.value == 'camper' && <Camper locations={locations} type={"insert"} /> }
    <p>{ state.value }</p>
      

    </>
      
  );
}
