"use client";
import StateSelect from "@/components/stateslist";
import { admin_server_action, admin_server_action_test } from "@/lib/admin_actions";
import { decrypt, encrypt } from "@/lib/sessions";
import bcrypt from "bcryptjs/dist/bcrypt";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";



const handleSubmit = async (prev, formData) => {

    const res = await admin_server_action_test(formData);

    if (res) {
      //router.push("/login");

    } else {
      console.error("Registration failed");
    }
  };


export default function RegisterPage() {

  


 const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [dob, setDob] = useState("");

  const [dl, setDL] = useState("");
  const [phone, setPhone] = useState("");


  const [error, formAction ] = useFormState(handleSubmit, null)

  const router = useRouter();

  useEffect(() => {
    
  }, []);

  

  return (
    <div
    className="uniform-box" >
      <form className={"uniform-form"} action={ formData => { formAction(formData)}}>
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
          type="password"
          name="password"
          placeholder="Password for renter. Use DOB"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
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
        <StateSelect />
        
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
  );
}
