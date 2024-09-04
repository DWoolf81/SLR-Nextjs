"use server";
import { cookies } from "next/headers";
import jose, { jwtDecrypt, jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";


const key = new TextEncoder().encode(process.env.SECRET_PHRASE);

// const keyDecode = jose.base64url.decode(key)




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

export const getSession = async () => {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
  };
  
  export const updateSession = async (request) => {
    const session = await setCookie(request);
  
    if (!session) return null;
  
    console.log("Session was updated");
  
    return session;
  };



export const logout = () => {
  cookies().set("session", "", { expires: new Date(0) });
};


