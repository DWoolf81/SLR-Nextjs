import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import React from "react";

const findUser = async (e, p) => {
  const res = await fetch("http://localhost:3000/db/renters.json");

  const arr = await res.json();

  const find = arr.find(({ email, password }) => email === e && password === p);

  return find;
};

const authenticate = async (int, formData) => {
  console.log(formData);
  const email = formData.get("email");
  const password = formData.get("pass");

  console.log("The values are ", email, password);

  const res = await findUser(email, password);

  if (res) {
    const match = `Hey! Is this ${res.name} from ${res.location.city}`;

    return `Found a match! ${match}`;
  }

  return "No match found";
};

export default authenticate;
