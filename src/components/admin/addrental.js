"use client";
import StateSelect from "@/components/stateslist";
import { addRental, admin_server_action, admin_server_action_test, updateRenter } from "@/lib/admin_actions";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";



const handleSubmit = async (prev, formData) => {

    const res = await addRental(formData);

    if (res) {
      //router.push("/login");

      console.log("Updated successfully")

     // revalidatePath("/admin/renter/[rid]/edit")

    } else {
      console.error("Update failed");
      return "There was a problem with updating the renter"
    }
  };


export default function Addrental( { edit } ) {



    

  
const [ renter, setRenter ] = useState("")

const [rid, setRid] = useState(edit.rid);
const [name, setName] = useState(edit.name);

 const [rv, setRv] = useState(edit.rid);
  const [rate, setRate] = useState(edit.renting.rate);
  const [tenants, setTenants] = useState(edit.renting.tenants);
  const [location, setLocation] = useState(edit.renting.location);
  const [nextdate, setNextdate] = useState(() => {

    const date = new Date(edit.renting.nextdate)

    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    
  
});
  const [moveout, setMoveout] = useState(edit.renting.moveout);


  const [error, formAction ] = useFormState(handleSubmit, null)

  const router = useRouter();

  useEffect( () => {

     console.log(error)


    
  }, []);

  

  return (
    <>

<div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <h1>Add Rental: {name}</h1>
        
      </div>
    <div
    className="uniform-box" >
      <form className={"uniform-form"} action={ formData => { formAction(formData)}}>
      <input
          type="hidden"
          name="rid"
          value={rid}
        />
        <p>Input rental ID</p>
        <input
          type="text"
          name="rv"
          placeholder="Input rental ID"
          value={rv}
          onChange={(e) => setRv(e.target.value)}
          required
        />
        <p>Please input rate including add-ons or discounts</p>
        <input
          type="number"
          name="rate"
          placeholder="Add rate. ex. 1100"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />
        <p>How many tenants for this rental</p>
         <input
          type="text"
          name="tenants"
          placeholder="Number of tenants"
          value={tenants}
          onChange={(e) => setTenants(e.target.value)}
          required
        />
        <p>Enter the ID of the location of rental</p>
        <input
          type="text"
          name="location"
          placeholder="Location of rental"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <p>Next payment date: Currently { nextdate }</p>
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
