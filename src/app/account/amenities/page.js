import { findUserById, getRv, getSession } from "@/app/lib/actions";
import Amenites, { AddRemove, PaidAddons } from "@/components/amenites";
import Backbtn from "@/components/backbtn";
import React from "react";

const Addons = async () => {
  const session = await getSession();
  if (!session)  toad = ""
    const renter = await findUserById(session.renter.id);

    console.log("We found a renter", renter);

    
  
const rv = await getRv(renter.renting.rv);
  return (
    <div style={{ padding: "20px" }}>
      <Backbtn link="./" />
      <Amenites title={"Standard Amenities"} list={rv.amenities} />
      <Amenites title={"Free Add-On Amenities"} list={rv.addons} />
      <PaidAddons rid={renter.id} />
    </div>
  );
};

export default Addons;
