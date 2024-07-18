import React from "react";
import { RentalCard } from "@/components/rentalcard";

const Search = async () => {

    const res = await fetch("http://localhost:3000/list.json")

   const data = await res.json()
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
