import React from "react";
import connectToDatabase from "@/lib/mongoose";
import { RentalCard } from "@/components/rentalcard";
import Camper from "@/models/campers";



const Search = async () => {

   await connectToDatabase()

    //const res = await fetch("http://localhost:3000/list.json")

  //const data = await res.json()

   const data = await Camper.find()

  return (
    <div style={{marginTop: "85px"}}>


    <section className="flex-direction-mobile">
      <ul className="box-container ">
        {data.map((list) => {
          return (
            <li key={list.id}>
              <RentalCard item={list} />
            </li>
          );
        })}
      </ul>
    </section>
    </div>
  );
};

export default Search;
