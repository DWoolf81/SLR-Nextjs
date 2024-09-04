"use server";
import { cookies } from "next/headers";
import jose, { jwtDecrypt, jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import bcrypt, { hash } from "bcryptjs";
import { getSession } from "./sessions";
import Renter from "@/models/renters";



const key = new TextEncoder().encode(process.env.SECRET_PHRASE);

// const keyDecode = jose.base64url.decode(key)



export const findUser = async (e, p) => {

  const renter = await Renter.findOne({email: e})

  console.log("Renter from Model", renter, p)

  if (renter) {

    console.log("Hashed password", renter.password )


    const isPass = await bcrypt.compare(p, renter.password)

    return isPass ? renter : false

  } return false
  
  const res = await fetch("http://localhost:3000/db/renters.json");
  const rep = await fetch("http://localhost:3000/api");
  // console.log(rep)

  //const arr = await res.json();

  //const find = arr.find(({ email, password }) => email === e && password === p);

  // return find;

  return false
};
export const findUserById = async (rid) => {
  const res = await fetch("http://localhost:3000/db/renters.json");

  const arr = await res.json();

  const find = arr.find(({ id }) => id === rid);

  return find;
};

export const findUserFromSession = async () => {
  let renter = false;
  const session = await getSession();

  if (session) renter = await findUserById(session.renter.id);

  return renter;
};

export const findAmenityById = async (a) => {
  const res = await fetch("http://localhost:3000/db/amenities.json");

  const arr = await res.json();

  const find = arr.find(({ aid }) => aid === a);

  return find;
};

export const getRv = async (id) => {
  const res = await fetch(`http://localhost:3000/rt/${id}.json`);

  const arr = await res.json();

  return arr;
};

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

const setCookie = async (request) => {
  try {
    const getCookie = request.cookies.get("session")?.value;

    if (!getCookie) return;

    const res = await decrypt(getCookie);

    res.expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const expires = res.expires;

    const renter = {
      id: res.renter.id,
      email: res.renter.email,
      name: res.renter.name,
    };

    const resp = NextResponse.next();

    const enc = await encrypt({ renter, expires });

    const setCookie = resp.cookies.set("session", enc, {
      expires,
      httpOnly: true,
    });

    return resp;
  } catch (e) {
    console.log("We have an error somewhere", e);
  }
};

const authenticate = async (formData) => {
  // console.log(formData);
  const email = formData.get("email");
  const password = formData.get("pass");

  const res = await findUser(email, password);

  console.log("Res in auth", res)

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
