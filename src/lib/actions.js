"use server";
import { cookies } from "next/headers";
import jose, { jwtDecrypt, jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";
import bcrypt, { hash } from "bcryptjs";
import { getSession } from "./sessions";
import Renter from "@/models/renters";
import Addon from "@/models/addons";
import Camper from "@/models/rental";



const key = new TextEncoder().encode(process.env.SECRET_PHRASE);

// const keyDecode = jose.base64url.decode(key)


export const rentalTypes = (type) => {
'use client'

  const types = {
    camper : "RV/Camper",
    container : "Container Home",
    house: "House",
    condo: "Condo/High Rise",
    apartment: "Apartment",
    townhome: "Town Home"

  }

  return types[type]

}


export const addOnAmounts = ({ items }) => {

  console.log("Get actions for amounts")


    let sum = 0;

   //return  items.forEach((rate) => (sum += rate.rate));

}



export const findUser = async (e, p) => {

  const renter = await Renter.findOne({email: e})

  if (renter) {

    const isPass = await bcrypt.compare(p, renter.password)

    return isPass ? renter : false

  } 
  
  return false
  
};
export const findUserById = async (id) => {

  const renter = await Renter.findOne({_id: id})

  return renter;
};

export const findUserFromSession = async () => {
  let renter = false;
  const session = await getSession();

  if (session) renter = await Renter.findOne({email: session.renter.email})

  return renter;
};

export const findAmenityById = async (a) => {

  const find = await Addon.findOne({ aid: a })

  const findAll = await Addon.find()

  

  console.log("This item from actions", findAll, a)


  //const res = await fetch("http://localhost:3000/db/amenities.json");

  //const arr = await res.json();

  //const find = arr.find(({ aid }) => aid === a);

  return find;
};

export const getRv = async (id) => JSON.parse(JSON.stringify(await Camper.findOne({rvid: id})))

export const getRentedRv = async (id) => {

  const rv = await getRv(id)

  if (rv) {

    const check = { rv: rv.rvid, rate: rv.rate, location: rv.location.loc_id }

    const rented = await Renter.findOne({"renting.rv": id})

    if (rented) check.isAvailable = false
    else check.isAvailable = true

    return JSON.parse(JSON.stringify(check))



  }

  return false
  
  

}

export const encrypt = async (payload) => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("60 sec from now")
    .sign(key);
  return jwt;
};

export const decrypt = async (input) => {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    console.log(e);
  }
};



const authenticate = async (formData) => {
  // console.log(formData);
  const email = formData.get("email");
  const password = formData.get("pass");

  const res = await findUser(email, password);

    
  if (res) {
    
    const match = `Hey! Is this ${res.name} from ${res.location.city}`;

    const renter = { id: res.id, email: res.email, name: res.name };

    const expires = new Date(Date.now() + 60 * 1000); // Ten seconds
    const session = await encrypt({ renter, expires });

    //console.log("Cookie", session, renter);

    cookies().set("session", session, { expires, httpOnly: true }); // read

    redirect("/account");

    return `Found a match! ${match}`;
  }

  return "Email and password do not match";
};

export const logout = () => {
  cookies().set("session", "", { expires: new Date(0) });
};





export default authenticate;
