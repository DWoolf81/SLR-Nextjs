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

    return res
      
  };


export default function House(props) {

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

  const [message, formAction] = useFormState(handleSubmit, {});
    const [show, setShow ] = useState(false)
  
  console.log("there error", message)
  
    const router = useRouter();
  
    useEffect(() => {
  
      console.log("What is the message", message)
  
     if (message.success){
        setShow(true)
        setTimeout(()=> {
          setShow(false)
          console.log("remove success message")
        }
          , 5000)
     }
  
    }, [message]);
  

  return (
    <div
    className="uniform-box" >
              { show && <p className="success-mess"> { message.mess }</p>}

      <form className={"uniform-form"} action={ formData => { formAction(formData)}}>
        <input type="hidden" name="type" value={props.item} />
        <input type="hidden" name="formType" value={props.type} />
        <input type="hidden" name="loc_id" value={loc_id} />
        
        <input
          type="text"
          name="name"
          placeholder={`Give your ${props.item} an unique name`}
          required
         
        />
        <p>Details</p>
        <input
          type="text"
          name="year"
          placeholder="Year built"
          required
          
        />
        <input
          type="number"
          name="stories"
          placeholder="How many stories"
          required
        />
        <input
          type="number"
          name="sqtft"
          placeholder={`What's the square footage of the ${props.item}`}
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
          placeholder="Number of bed rooms"
          required
        />
        <input
        type="number"
        name="baths"
        placeholder="Number of bath rooms"
        required
      />
        
        <p>Location: Camper ground or resort</p>
        <LocationListSelect search={props.locations} onChange={clickLocation} />
        <input
          type="text"
          name="street"
          placeholder={`Street address of ${props.item}`}
          value={street}
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
        />
        <StateSelect selected={state} />
        <input
          type="text"
          name="zip"
          placeholder="Zip Code"
          value={zip}
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