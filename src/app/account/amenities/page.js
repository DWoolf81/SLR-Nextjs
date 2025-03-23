import { findUserById, findUserFromSession, getRv } from "@/lib/actions";
import { getSession } from "@/lib/sessions";
import Amenities, { AddRemove, PaidAddons } from "@/components/amenites";
import Backbtn from "@/components/backbtn";
import React from "react";

const Addons = async () => {
  const renter = await findUserFromSession();

  // console.log("We found a renter", renter, renter.id);

  const rv = await getRv(renter.renting.rv);

  return (
    <div style={{ padding: "20px" }}>
      <Backbtn link="./" />
      {rv ? (
        <>
          <Amenities title={"Standard Amenities"} list={rv.amenities} />
          <Amenities title={"Free Add-On Amenities"} list={rv.addons} />
          <PaidAddons rid={renter.id} />
        </>
      ) : (
        <p style={{ display: "flex", justifyContent: "center" }}>
          No amenites to show
        </p>
      )}
    </div>
  );
};

export default Addons;
