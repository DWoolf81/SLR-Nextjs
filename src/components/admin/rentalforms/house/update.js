"use client";
import LocationListSelect from "@/components/locationlist";
import StateSelect from "@/components/stateslist";
import Universalformcomponent from "@/components/universalformcomponent";
import { admin_server_action_camper } from "@/lib/admin_actions";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { useFormState } from "react-dom";

const handleSubmit = async (prev, formData) => {
  const res = await admin_server_action_camper(formData);


  return res
};

const init = {
  mess: ""
}
export default function UpdateHouse(props) {
  // console.log(props);





  const rental = props.rental;

  const [name, setName] = useState(rental.name);
  const [year, setYear] = useState(rental.details?.year);
  const [stories, setStories] = useState(rental.details?.stories);
  const [sqtft, setSqrFeet] = useState(rental.details?.sqtft);
  const [sleeps, setSleeps] = useState(rental.details?.sleeps);
  const [beds, setBeds] = useState(rental.details?.beds);
  const [baths, setBath] = useState(rental.details?.baths);

  const noLoc = rental.location.address == undefined ? true : false;

  const [address, setAddress] = useState(!noLoc ? rental.location.address : "");
  const [city, setCity] = useState(!noLoc ? rental.location.city : "");
  const [zip, setZip] = useState(!noLoc ? rental.location.zip : "");
  const [map, setMap] = useState(!noLoc ? rental.location.map : "");
  const [state, setState] = useState(!noLoc ? rental.location.state : "");
  const [site, setSite] = useState(!noLoc ? rental.location.site : "");
  const [loc_id, setLoc] = useState(!noLoc ? rental.location.loc_id : "");

  const clickLocation = async (val) => {
    const loc = props.locations.find((el) => el.loc_id == val);

    if (loc) {
      setAddress(loc.location.street);
      setCity(loc.location.city);
      setState(loc.location.state);
      setZip(loc.location.zip);
      setMap(loc.location.map);
      setSite(loc.name);
      setLoc(val);
    }
  };

  const placeholders = {
    desc: rental.desc,
    amenities: rental.amenities,
    addons: rental.addons,
    available: rental.available,
    rateDay: rental.rate.day,
    rateWeek: rental.rate.week,
    rateMonth: rental.rate.month,
    promoDay: rental.promo_rate?.day,
    promoWeek: rental.promo_rate?.week,
    promoMonth: rental.promo_rate?.month,
  };

  //console.log("Getting the locations", props.locations);

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
    <div className="uniform-box">
        <h1>Editing: <span style={{  color: "grey" }}>{ name }</span> - { props.rental.rvid }</h1>
        { show && <p className="success-mess"> { message.mess }</p>}
      <form
        className={"uniform-form"}
        action={(formData) => {
          formAction(formData);
        }}
      >
        <input type="hidden" name="type" value={props.item} readOnly />
        <input type="hidden" name="rvid" value={props.rental.rvid} readOnly />
        <input type="hidden" name="formType" value={props.type} readOnly />
        <input type="hidden" name="loc_id" value={loc_id} readOnly />

        <input
          type="text"
          name="name"
          placeholder="Give your container an unique name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Details</p>
        <input
          type="text"
          name="year"
          placeholder="Year of RV/Camper"
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          name="stories"
          placeholder="How many stories"
          required
          value={stories}
          onChange={(e) => setStories(e.target.value)}
        />
        <input
          type="text"
          name="sqtft"
          placeholder="Square footage of the home"
          required
          value={sqtft}
          onChange={(e) => setSqrFeet(e.target.value)}
        />
        
        <input
          type="text"
          name="sleeps"
          placeholder="How many people it sleeps"
          required
          value={sleeps}
          onChange={(e) => setSleeps(e.target.value)}
        />
        <input
          type="number"
          name="beds"
          placeholder="Number of bed room"
          required
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
        />
        <input
          type="number"
          name="baths"
          placeholder="Number of bath room"
          required
          value={baths}
          onChange={(e) => setBath(e.target.value)}
        />

        <p>Location: Camper ground or resort</p>
        <LocationListSelect search={props.locations} onChange={clickLocation} />
        <input
          type="text"
          name="address"
          placeholder="Street address of camper"
          value={address}
          readOnly
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
            value={city}
            readOnly
          />
          <StateSelect selected={state} />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={zip}
            readOnly
          />
        </div>

        <input type="text" name="map" placeholder="Input map url" value={map} readOnly />
        <input
          type="text"
          name="site"
          placeholder="Input the name of the site or resort"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <Universalformcomponent placeholders={placeholders} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}