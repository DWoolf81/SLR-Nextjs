"use client";
import LocationListSelect from "@/components/locationlist";
import StateSelect from "@/components/stateslist";
import Universalformcomponent from "@/components/universalformcomponent";
import { admin_server_action_rental } from "@/lib/admin_actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";

const handleSubmit = async (prev, formData) => {
  const res = await admin_server_action_rental(formData);

  return res;
};

export default function Container(props) {
  console.log(props);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [map, setMap] = useState("");
  const [state, setState] = useState("");
  const [site, setSite] = useState("");
  const [loc_id, setLoc] = useState("");

  const clickLocation = async (val) => {
    console.log("What is the location?", val);
    const loc = props.locations.find((el) => el.loc_id == val);

    console.log(loc);

    if (loc) {
      setStreet(loc.location.street);
      setCity(loc.location.city);
      setState(loc.location.state);
      setZip(loc.location.zip);
      setMap(loc.location.map);
      setLoc(val);
      setSite(loc.name);
    }
  };

  console.log("Getting the locations", props.locations);

  console.log("Getting the locations", props.locations);

  const [message, formAction] = useFormState(handleSubmit, {});
  const [show, setShow] = useState(false);

  console.log("there error", message);

  const router = useRouter();

  useEffect(() => {
    console.log("What is the message", message);

    if (message.success) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        console.log("remove success message");
      }, 5000);
    }
  }, [message]);

  return (
    <div className="uniform-box">
      {show && <p className="success-mess"> {message.mess}</p>}

      <form
        className={"uniform-form"}
        action={(formData) => {
          formAction(formData);
        }}
      >
        <input type="hidden" name="type" value={"container"} />
        <input type="hidden" name="formType" value={props.type} />
        <input type="hidden" name="loc_id" value={loc_id} />

        <input
          type="text"
          name="name"
          placeholder="Give your container an unique name"
        />
        <p>Details</p>
        <input type="text" name="year" placeholder="Year of RV/Camper" />
        <input type="number" name="stories" placeholder="How many stories" />
        <input
          type="number"
          name="containers"
          placeholder="How many containers"
        />
        <input type="text" name="length" placeholder="Length of RV/Camper" />
        <input
          type="text"
          name="sleeps"
          placeholder="How many people it sleeps"
        />
        <input type="number" name="beds" placeholder="Number of bed room" />
        <input type="number" name="baths" placeholder="Number of bath room" />

        <p>Location: Camper ground or resort</p>
        <LocationListSelect search={props.locations} onChange={clickLocation} />
        <input
          type="text"
          name="address"
          placeholder="Street address of camper"
          onChange={(e) => setAddress(e.target.value)}
          value={street}
        />
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <StateSelect selected={state} />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            onChange={(e) => setZip(e.target.value)}
            value={zip}
          />
        </div>

        <input type="text" name="map" placeholder="Input map url" value={map} />
        <input
          type="text"
          name="site"
          placeholder="Input the name of the site or resort"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <Universalformcomponent
          placeholders={{ desc: "Add a description for this camper" }}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
