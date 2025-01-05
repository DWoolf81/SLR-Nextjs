"use client";

import Camper from "@/components/admin/rentalforms/camper/insert";
import Container from "@/components/admin/rentalforms/container/insert";
import House from "@/components/admin/rentalforms/house/insert";
import RentalListType from "@/components/admin/rentaltypelist/rentallistype";
import RentalType from "@/components/admin/rentaltypelist/rentaltype";
import { getLocationList } from "@/lib/admin_actions";
import { useEffect, useReducer, useState } from "react";


const reducer = (state, action ) => {


  console.log(state, action)
  return { value: action.value }
}


const items = ['house', 'condo', "apartment", 'townhome']


export default function RentalPage() {

  



  const clicked = (text) => {
    console.log("I've been clicked! Here's my message", text)
    setState(text)
  }

  const [locations, setLocations] = useState("");

  const [ state, setState ] = useState({ value: "Default" })


  //const [ state, dispatch ] = useReducer(reducer, {value: "Default"})


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
      
      <div>
          <h2>New   <RentalType type={state.value } /> </h2>
        </div>
      { state.value == 'camper' && <Camper locations={locations} type={"insert"} /> }
      { state.value == 'container' && <Container locations={locations} type={"insert"} /> }
      { items.includes(state.value) && <House locations={locations} type={"insert"} item={state.value} /> }
      

    </>
      
  );
}
