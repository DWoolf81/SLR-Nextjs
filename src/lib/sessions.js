"use server";
import { cookies } from "next/headers";
import jose, { jwtVerify, SignJWT } from "jose";
import { NextResponse } from "next/server";

const getKey = () => new TextEncoder().encode(process.env.SECRET_PHRASE);

// const keyDecode = jose.base64url.decode(key)

export const encrypt = async (payload) => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("60 secs from now")
    .sign(getKey());
  return jwt;
};

export const decrypt = async (input) => {
  try {
    const { payload } = await jwtVerify(input, getKey(), {
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

    console.log("This is the cookie", res.expires)

    res.expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const expires = res.expires;

    const renter = {
      id: res.renter.id,
      email: res.renter.email,
      name: res.renter.name,
    };

    const enc = await encrypt({ renter, expires });
    
    const resp = NextResponse.next();

    const setCookie = resp.cookies.set("session", enc, {
      expires,
      httpOnly: true,
    });
    console.log("Cookie has been set")

    return resp;
  } catch (e) {
    console.log("We have an error somewhere", e);
  }
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

export const logout = () => {
  cookies().set("session", "", { expires: new Date(0) });
};
