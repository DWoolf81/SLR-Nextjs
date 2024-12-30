"use client";
import LocationListSelect from "@/components/locationlist";
import StateSelect from "@/components/stateslist";
import Universalformcomponent from "@/components/universalformcomponent";
import { admin_server_action_camper } from "@/lib/admin_actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";



const handleSubmit = async (prev, formData) => {

    const res = await admin_server_action_camper(formData);



    if (res) {
      //router.push("/login");

    } else {
      console.error("Registration failed");
    }
  };


export default function Container(props) {

  console.log(props)



  const [ street, setStreet ] = useState("")
  const [ city, setCity ] = useState("")
  const [ zip, setZip ] = useState("")
  const [ map, setMap ] = useState("")
  const [ state, setState ] = useState("")
  const [ site, setSite ] = useState("")
  const [ loc_id, setLoc ] = useState("")

  const clickLocation = async (val) => {
    console.log("What is the location?", val)
    const loc =  props.locations.find((el) => el.loc_id == val)

    console.log(loc)

    if (loc){
      setStreet(loc.location.street)
      setCity(loc.location.city)
      setState(loc.location.state)
      setZip(loc.location.zip)
      setMap(loc.location.map)
      setLoc(val)
      setSite(loc.name)
    }


  }




console.log("Getting the locations", props.locations)

  const [error, formAction ] = useFormState(handleSubmit, null)

  const router = useRouter();

  useEffect(() => {


    
  }, []);

  

  return (
    <div
    className="uniform-box" >
      <form className={"uniform-form"} action={ formData => { formAction(formData)}}>
        <input type="hidden" name="type" value={"camper"} />
        <input type="hidden" name="formType" value={props.type} />
        <input type="hidden" name="loc_id" value={loc_id} />
        
        <input
          type="text"
          name="name"
          placeholder="Make, model and year of camper"
          required
         
        />
        <p>Details</p>
        <input
          type="text"
          name="year"
          placeholder="Year of RV/Camper"
          required
          
        />
        <input
          type="text"
          name="make"
          placeholder="Brand or make of camper"
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Model of camper"
          required
        />
        <input
          type="text"
          name="length"
          placeholder="Length of RV/Camper"
          required
        />
         <input
          type="text"
          name="sleeps"
          placeholder="How many people it sleeps"
          required
        />
        <input
          type="number"
          name="beds"
          placeholder="Number of bed room"
          required
        />
        <input
        type="number"
        name="baths"
        placeholder="Number of bath room"
        required
      />
        
        <p>Location: Camper ground or resort</p>
        <LocationListSelect search={props.locations} onChange={clickLocation} />
        <input
          type="text"
          name="street"
          placeholder="Street address of camper"
          value={street}
          required
        />
        <div style={{
          display: "flex",
          gap: "20px"
        }}>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          required
        />
        <StateSelect selected={state} />
        <input
          type="text"
          name="zip"
          placeholder="Zip Code"
          value={zip}
          required
        />
        </div>
        
        <input
          type="text"
          name="map"
          placeholder="Input map url"
          value={map}
        />
        <input
          type="text"
          name="site"
          placeholder="Input the name of the site or resort"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <Universalformcomponent placeholders={{ desc: "Add a description for this camper"}} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
