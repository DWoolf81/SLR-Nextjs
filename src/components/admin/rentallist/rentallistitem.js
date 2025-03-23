import { rentalTypes } from "@/lib/actions";
import Link from "next/link";
import React from "react";

const Rentallistitem = ({ renting, el, index}) => {
  return (
    <ul key={index} className={"admin-flex-list admin-flex-list-content"}>
      <li>{el.rvid}</li>
      <li>{el.name}</li>
      <li>
        <Link href={`/admin/rentals/${renting}`}>{renting}</Link>
      </li>
      <li>{location}</li>
      <li>{rentalTypes(el.type)} </li>
      <li>{`$${el.rate.day}/$${el.rate.week}/$${el.rate.month}`}</li>
      <li>
        <div style={{ width: "100%" }}>
          <ul className={"admin-flex-list-links"}>
            <li>
              <Link href={`/admin/rentals/${el.rvid}`}>
                <span className="material-symbols-outlined">visibility</span>
              </Link>
            </li>
            <li>
              <Link href={`/admin/rentals/${el.rvid}/edit`}>
                <span className="material-symbols-outlined">edit</span>
              </Link>{" "}
            </li>
            <li>
              <Link href={""}>
                <span className="material-symbols-outlined">delete</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
};

export default Rentallistitem;
