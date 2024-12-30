"use client";
import StateSelect from "@/components/stateslist";
import { admin_server_action, admin_server_action_test, updateRenter } from "@/lib/admin_actions";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";



const handleSubmit = async (prev, formData) => {

    const res = await updateRenter(formData);

    if (res) {
      //router.push("/login");

      console.log("Updated successfully")

     // revalidatePath("/admin/renter/[rid]/edit")

    } else {
      console.error("Update failed");
      return "There was a problem with updating the renter"
    }
  };


export default function Newrenter( { edit } ) {



    
console.log(edit)
  
const [ renter, setRenter ] = useState("")

const [rid, setRid] = useState(edit.rid);

 const [name, setName] = useState(edit.name);
  const [email, setEmail] = useState(edit.email);
  const [address, setAddress] = useState(edit.location.address);
  const [city, setCity] = useState(edit.location.city);
  const [state, setState] = useState(edit.location.state);
  const [dob, setDob] = useState(edit.dob);

  const [dl, setDL] = useState(edit.dl);
  const [phone, setPhone] = useState(edit.phone);


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
        <h1>Edit Renter: {name}</h1>
        
      </div>
    <div
    className="uniform-box" >
      <form className={"uniform-form"} action={ formData => { formAction(formData)}}>
      <input
          type="hidden"
          name="rid"
          value={rid}
        />
        <input
          type="text"
          name="name"
          placeholder="Renters full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email for renter"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         <input
          type="text"
          name="address"
          placeholder="Street address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <StateSelect selected={edit.location.state} />
        
        </div>
        <input
          type="text"
          name="dob"
          placeholder="Date of birth ex 10/09/1981"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <input
          type="text"
          name="dl"
          placeholder="Driver Licence or ID number"
          value={dl}
          onChange={(e) => setDL(e.target.value)}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Ex. 723-555-5555"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
    </>
    
  );
}
