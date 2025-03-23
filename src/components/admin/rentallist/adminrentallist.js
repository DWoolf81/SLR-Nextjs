"use client";
import { rentalTypes } from "@/components/client/universal";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Removerentalform from "../removerentalform";

const removeItem = (rvid) => {
  console.log("ready to remove botch", rvid);
};

const Adminrentallist = ({ allrentals }) => {
  const rentals = allrentals;

  const [show, setShow] = useState(false);

  const [rental, setRental] = useState({});

  const refs = useRef([]);

  const cancel = (item) => {
    console.log("what is the item", item);
    if (refs.current[rental.index]) refs.current[rental.index].style.backgroundColor = "";
  };

  useEffect(() => {
    console.log("Use effect ran", rental, show);

    if (rental?.index > -1) {
      refs.current[rental.index].style.backgroundColor = "aliceblue";
    } else {
      console.log("Remove the color");
    }
  }, [rental]);

  // console.log("runnit", show)

  return (
    <>
      <Removerentalform
        show={{ isShow: show, rental: rental }}
        onClick={cancel}
      />
      <div>
        <div style={{display: "flex", padding: "10px 0px"}}>
          <p style={{display: "flex"}}><span className="aid-bubble active-aid"></span>Active</p>
          <p style={{display: "flex"}}><span className="aid-bubble inactive-aid"></span>Inactive</p>
          <p style={{display: "flex"}}><span className="aid-bubble deleted-aid"></span>Deleted</p>
        </div>
        <ul className={"admin-flex-list admin-flex-list-head"}>
          <li>#</li>
          <li>Name</li>
          <li>Renting</li>
          <li>Location</li>
          <li>Type</li>
          <li>Rates</li>
          <li>Links</li>
        </ul>
      </div>
      <div>
        {rentals &&
          rentals.map((el, index) => {
            const prime = index % 2 == 0 ? "acct-history-item" : "";

            let renting = " -- ";
            let location = " -- ";
            let nextdate = " -- ";
            let moveout = " -- ";

            if (el.renting !== undefined) {
              renting = el.renting.rid;
            } else renting = "Available";

            let aid = ""

            if (el.status){
              if (el.status == 1) aid = "active-aid"
              if (el.status == 2) aid = 'inactive-aid'
              if (el.status == 3) aid = 'deleted-aid'

            } else aid = "active-aid"

            if (el.location.loc_id) location = el.location.loc_id;

            return (
              <ul
                key={index}
                className={"admin-flex-list admin-flex-list-content"}
                ref={(el) => (refs.current[index] = el)}
              >
                <li><p className={`aid-bubble ${aid}`}> </p>{el.rvid}</li>
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
                          <span className="material-symbols-outlined">
                            visibility
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/admin/rentals/${el.rvid}/edit`}>
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </Link>{" "}
                      </li>
                      <li>
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            setRental({
                              rvid: el.rvid,
                              name: el.name,
                              index: index,
                            });
                            setShow(true);
                          }}
                          href={""}
                        >
                          <span className="material-symbols-outlined">
                            menu
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            );
          })}
      </div>
    </>
  );
};

export default Adminrentallist;
