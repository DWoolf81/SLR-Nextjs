"use server";
import { cookies } from "next/headers";
import jose, { jwtDecrypt, jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "Living made simple";
const key = new TextEncoder().encode(secretKey);

// const keyDecode = jose.base64url.decode(key)

const findUser = async (e, p) => {
  const res = await fetch("http://localhost:3000/db/renters.json");

  const arr = await res.json();

  const find = arr.find(({ email, password }) => email === e && password === p);

  return find;
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
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return payload;
};

const setCookie = async (request) => {

  const getCookie = request.cookies.get("session")?.value;

  if (!getCookie) return

  const res = await decrypt(getCookie);

  res.expires = new Date(Date.now() + 60 * 1000); // Ten seconds

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
};

const authenticate = async (formData) => {
 // console.log(formData);
  const email = formData.get("email");
  const password = formData.get("pass");

  const res = await findUser(email, password);

  if (res) {
    const match = `Hey! Is this ${res.name} from ${res.location.city}`;

    const renter = { id: formData.get("id"), email: res.email, name: res.name };

    const expires = new Date(Date.now() + 60 * 1000); // Ten seconds
    const session = await encrypt({ renter, expires });

    //console.log("Cookie", session, renter);

    cookies().set("session", session, { expires, httpOnly: true }); // read

    return `Found a match! ${match} with ${JSON.stringify(
      await decrypt(session)
    )}`;
  }

  return "No match found";
};

export const logout = () => {
  cookies().set("session", "", { expires: new Date(0) });
};

export const getSession = async () => {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
};

export const updateSession = async (request) => {
  const session = await setCookie(request);

  if (!session) return null;

  return session;
};

export default authenticate;
