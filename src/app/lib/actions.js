'use server'
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";



const secretKey = "Living made simple"
const key = new TextEncoder().encode(secretKey)





const findUser = async (e, p) => {
  const res = await fetch("http://localhost:3000/db/renters.json");

  const arr = await res.json();

  const find = arr.find(({ email, password }) => email === e && password === p);

  return find;
};

export const encrypt = async (payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
};

export const decrypt = async (input) => {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    })

    return payload
}

const authenticate = async (formData) => {
  console.log(formData);
  const email = formData.get("email");
  const password = formData.get("pass");

  console.log("The values are ", email, password);

  const res = await findUser(email, password);

  if (res) {
    const match = `Hey! Is this ${res.name} from ${res.location.city}`;

    const renter = {id: formData.get("id"), email: res.email, name: res.name };

    const expires = new Date(Date.now() + 10 * 1000); // Ten seconds
    const session = await encrypt({ renter, expires });

    console.log("Cookie", session, renter)

    cookies().set("session", session, { httpOnly: true }); // read

    return `Found a match! ${match} with ${JSON.stringify(await decrypt(session))}`;
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
  const session = request.cookies.get("session")?.value;

  if (!session) return null;
};

export default authenticate;

