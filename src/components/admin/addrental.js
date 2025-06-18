"use client";
import { getRentedRv } from "@/lib/actions";
import {
  addRental
} from "@/lib/admin_actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";

const handleSubmit = async (prev, formData) => {
  const res = await addRental(formData);

  if (res) {
    console.log(res.error, "Previous state", prev);
    return res;
  }
};

export default function Addrental({ edit, terms }) {
  console.log("The renter", edit)
  const [renter, setRenter] = useState("");

  const [rid, setRid] = useState(edit.rid);
  const [name, setName] = useState(edit.name);

  const [rv, setRv] = useState(edit.renting && edit.renting.rv);
  const [rate, setRate] = useState(edit.renting && edit.renting.rate);
  const [term, setTerm] = useState("");
  const [newTerm, setNewTerm] = useState(terms);
  const [tenants, setTenants] = useState(edit.renting && edit.renting.tenants);
  const [location, setLocation] = useState(
    edit.renting && edit.renting.location
  );
  const [nextdate, setNextdate] = useState(() => {
    const date = new Date(edit.renting && edit.renting.nextdate);

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  });
  const [moveout, setMoveout] = useState(edit.renting && edit.renting.moveout);

  const [error, formAction] = useFormState(handleSubmit, false);

  const [errorMess, setErrorMess] = useState(null);

  const [isAvailable, setIsAvailable] = useState("default");

  const router = useRouter();




  const findingCamper = async (rv) => {
    const camper = await getRentedRv(rv);

    if (camper) {
      camper.isAvailable
        ? setIsAvailable("Available")
        : setIsAvailable("Taken");

      console.log("These are the camper rates", camper.rate.month);

      camper.location ? setLocation(camper.location) : setLocation("");

      camper.rate ? setRate(camper.rate.day) : setRate("");

      setNewTerm(camper.rate)

      setTerm("daily");

      setTenants(1);
    } else {
      setIsAvailable("");
      setTenants("");
    }

    console.log("Checking camper", camper.isAvailable);
  };


  const tesset = (rv) => {
    console.log("Hit it")
    setRv(rv)
    findingCamper(rv)
  }







  useEffect(() => {
    console.log("Check this error as well", error);

    console.log("This is term", term, newTerm);

    if (term == 'daily') setRate(newTerm.day)
    else if (term == 'weekly') setRate(newTerm.week)
    else if (term == 'monthly') setRate(newTerm.month)

   
  }, [term, error, term]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <h1>Add/Edit Rental: {name}</h1>
      </div>
      <div className="uniform-box">
        <form
          className={"uniform-form"}
          action={(formData) => {
            formAction(formData);
          }}
        >
          <input type="hidden" name="rid" value={rid} />
          <p>Input rental ID: {isAvailable}</p>{" "}
          {error.rv && <p className="error-mess-bubble">{error.rv}</p>}
          <input
            type="text"
            name="rv"
            placeholder="Input rental ID"
            value={rv}
            onChange={e => tesset(e.target.value)}
            required
          />
          <p>Please input rate including add-ons or discounts</p>
          {error.rate && <p className="error-mess-bubble">{error.rate}</p>}
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <input
              type="number"
              name="rate"
              placeholder="Add rate. ex. 1100"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
            />
            <select
              onChange={(e) => setTerm(e.target.value)}
              name="term"
              value={term}
            >
              <option value="daily">Daily </option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <p>How many tenants for this rental</p>
          {error.tenants && (
            <p className="error-mess-bubble">{error.tenants}</p>
          )}
          <input
            type="text"
            name="tenants"
            placeholder="Number of tenants"
            value={tenants}
            onChange={(e) => setTenants(e.target.value)}
            required
          />
          <p>Enter the ID of the location of rental</p>
          {error.loc && <p className="error-mess-bubble">{error.loc}</p>}
          <input
            type="text"
            name="location"
            placeholder="Location of rental"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <p>Next payment date: Currently {nextdate}</p>
          {error.nextdate && (
            <p className="error-mess-bubble">{error.nextdate}</p>
          )}
          <input
            type="date"
            name="nextdate"
            placeholder="Next payment date"
            value={nextdate}
            onChange={(e) => setNextdate(e.target.value)}
            required
          />
          <p>Move out date</p>
          <input
            type="date"
            name="moveout"
            placeholder="Move out date"
            value={moveout}
            onChange={(e) => setMoveout(e.target.value)}
          />
          <button type="submit">Add Rental</button>
        </form>
      </div>
    </>
  );
}
