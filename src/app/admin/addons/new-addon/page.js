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


export default function NewAddon() {

 const [photo, setsetPhoto] = useState("");
  const [name, setName] = useState("");

  const [price, setprice] = useState("");
  const [instock, setInstock] = useState(1);
  const [desc, setDesc] = useState("");

  const [dl, setDL] = useState("");


  const [error, formAction ] = useFormState(handleSubmit, null)


  useEffect(() => {
    
  }, []);

  

  return (
    <div
    className="uniform-box" >
      <form className={"uniform-form"} action={ formData => { formAction(formData)}}>
        <label htmlFor='name'>Photo of addon</label>
        <input
          type="file"
          name="photo"
          placeholder="Photo of add-on"
          value={photo}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor='name'>Name of addon</label>
        <input
          type="text"
          name="name"
          placeholder="Name of add-on"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="price">Monthly rate</label>
        <input
          type="text"
          name="price"
          placeholder="What is the price of add on"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          required
        />
        <label htmlFor="instock">Instock?</label>
        <select name="instock" value={instock} onChange={() => setInstock(e.target.value)}>
          <option value={1}>Instock</option>
          <option value={0}>Not Instock</option>
        </select>
        <label htmlFor="desc">Add on description</label>
        <textarea rows={10}
          name="desc"
          defaultValue="Extra details about payment"
        ></textarea>
        
    <div className="fixed-bottom-btn-box">
        <button type="submit">Create New Addon</button>
    </div>
        
      </form>
    </div>
  );
}
