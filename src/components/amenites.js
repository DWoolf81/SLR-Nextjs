import { findUser, getRv, findUserById } from "@/lib/actions";
import Link from "next/link";
import React from "react";
import Backbtn from "./backbtn";
import Image from "next/image";
import Amenitycard from "./amenitycard";

const Amenities = async ({ title, list }) => {
  try {
    const r = Math.round((list.length + 3) / 5);

    const rvs = new Array();

    for (let i = 0; i < r; i++) {
      const rvi = list.slice(i * 5, (i + 1) * 5);

      rvs.push(rvi);
    }

    return (
      <>
        <div>
          <h2>{title}</h2>
        </div>
        <div className="amenity_list_item">
          {rvs.map((arr) => {
            return (
              <ul>
                {arr.map((el, index) => (
                  <li key={index}>{el}</li>
                ))}
              </ul>
            );
          })}
        </div>
      </>
    );
  } catch (e) {
    console.log("We have an error");
  }
};

export const PaidAddons = async ({ rid }) => {
  try {
    const renter = await findUserById(rid);

    let sum = 0;

    renter.addon.forEach((rate) => (sum += rate.rate));

    return (
      <>
        <div style={{ marginBottom: "100px" }}>
          <h2>
            Paid Add-Ons | <strong>Cost ${sum}/month</strong>{" "}
          </h2>
          <div className="amenity_list_item">
            <ul>
              {renter.addon.map((el, index) => (
                <li key={index}>
                  {el.name} | ${el.rate}
                </li>
              ))}
            </ul>
          </div>
          <div className="amenity-add-remove-btn-box">
            <Link className="acct-payment-btn" href="amenities/addons/">
              Add/Remove Amenites
            </Link>
          </div>
        </div>
      </>
    );
  } catch (e) {
    console.log("We have an error somewhere", e);
  }
};

export const AddRemove = async () => {
  const add = await fetch("http://localhost:3000/db/amenities.json");

  const amen = await add.json();

  // console.log(amen);

  return (
    <>
      <Backbtn link="./" />
      <div style={{ margin: "20px 10px" }}>
        <h2>Add/Remove Amenites</h2>
        <div style={{ fontSize: "12px", padding: "20px" }}>
          <p>
            Charges for amenites will be added the day the item is issued on the
            next monthtly rental date.{" "}
          </p>
          <p>
            Items that have been removed will not be charged to you if item has
            not been picked up after the monthly rental date
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {amen.map((el) => (
          <div key={el.aid}>
            <Amenitycard item={el} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Amenities;

export const oldAmenList = ({ all, renters = [] }) => {
  return (
    <div className="addon-grid-column-list">
      <div className="grid-column-header">
        <p>Pic</p>
      </div>
      <div className="grid-column-header">
        <p>Name</p>
      </div>
      <div className="grid-column-header">
        <p>Rate</p>
      </div>
      <div className="grid-column-header">
        <p>Renting</p>
      </div>
      <div className="grid-column-header">
        <p>In stock</p>
      </div>
      <div className="grid-column-header">
        <p>Links</p>
      </div>

      {amen.map((el, index) => {
        const prime = index % 2 == 0 ? "acct-addon-item" : "";
        let type = el.instock === true ? "check" : "close";
        let color = el.instock === true ? "green" : "red";

        const renting =
          index % 2 == 0 ? "radio_button_unchecked" : "radio_button_checked";
        const rentingColor = index % 2 == 0 ? "grey" : "green";

        return (
          <>
            <div
              key={index}
              className={prime}
              style={{
                borderStartStartRadius: "10px",
                borderEndStartRadius: "10px",
              }}
            >
              <p>
                <Image
                  src={`/assets/amenities/vectors/${el.image}`}
                  className="amenity-list-image"
                  width={0}
                  height={0}
                  alt={el.name}
                  sizes="100vw"
                />
              </p>
            </div>
            <div className={prime}>
              <p>{el.name}</p>
            </div>
            <div className={prime}>
              <p>${el.rate}</p>
            </div>
            <div className={prime}>
              <p>
                <span class={`material-symbols-outlined ${rentingColor}`}>
                  {renting}
                </span>
              </p>
            </div>
            <div className={prime}>
              <p>
                <span class={`material-symbols-outlined ${color}`}>{type}</span>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderStartEndRadius: "10px",
                borderEndEndRadius: "10px",
              }}
            >
              <Link
                className="acct-details-btn"
                href={`/account/amenities/${el.aid}`}
              >
                Link
              </Link>
            </div>
          </>
        );
      })}
    </div>
  );
};
