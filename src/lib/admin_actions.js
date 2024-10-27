"use server";
import bcrypt, { hash } from "bcryptjs";
import Renter from "@/models/renters";
import { redirect } from "next/navigation";

export const getRenter = async (id) => Renter.findOne({ rid: id });

export const updateRenter = async (formData) => {
  /* const fab = Renter.updateOne({rid: "0005"}, {
    name: "Penis Pump",
  }); */

  const rid = formData.get("rid");

  const res = Renter.updateOne(
    { rid: formData.get("rid") },
    {
      email: formData.get("email"),
      name: formData.get("name"),
      location: {
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
      },
      dob: formData.get("dob"),
      phone: formData.get("phone"),
      dl: formData.get("dl"),
    }
  );

  console.log("This is the value of res", (await res).matchedCount);

  if (res) redirect(`/admin/renters/${rid}`);
  else return false;
};

export const addAddon = async (action = {}) => {

  const stockNum = makeid(10, "number")

  action.addon.stockNum = stockNum;

  const res = await Renter.updateOne({rid: action.rid}, { $push: {addon: action.addon}})

  //const res = (await fetch("http://localhost:3000/db/amenities.json"));
  //const data = await res.json()

  console.log("Call a server action for ", action)

  redirect(`/admin/renters/${action.rid}/addons`);

  // return JSON.parse(JSON.stringify(action))


}















export const addRental = async (formData) => {
  /* const fab = Renter.updateOne({rid: "0005"}, {
     name: "Penis Pump",
   }); */

  const rid = formData.get("rid");

  const res = Renter.updateOne(
    { rid: formData.get("rid") },
    {
      renting: {
        rv: formData.get("rv"),
        tenants: formData.get("tenants"),
        rate: formData.get("rate"),
        location: formData.get("location"),
        nextdate: formData.get("nextdate"),
        moveout: formData.get("movedate"),
        addon: [],
      },
    }
  );

  console.log("This is the value of res", (await res).matchedCount);

  if (res) redirect(`/admin/renters/${rid}`);
  else return false;
};






export const deleteAddon = async (formData) => {

  const renter = await Renter.findOne({rid: formData.get("rid")})

  const rid = formData.get("rid")

  console.log(renter)

  const  addons = [{rid: 1, name: "one" }, {rid: 2}, {rid: 3}, {rid: 4},{rid: 5}, {rid: 6}, { rid: 7}]

  const filArr = renter.addon.filter(el => el.stockNum != formData.get('stock'))

  const updateAddon = await Renter.updateOne({rid: rid}, {addon : filArr})

  console.log("Get data from a form", formData.get("aid"), filArr)
  redirect(`/admin/renters/${rid}/addons`)
}









export const admin_server_action_test = async (formData) => {
  // const renters = await Renter.find( {rid: "9999" })

  //const last = renters.pop()

  const id = makeid(10, "number");

  const hashPassword = await bcrypt.hash(formData.get("password"), 10);

  const res = Renter.create({
    rid: id,
    email: formData.get("email"),
    password: hashPassword,
    name: formData.get("name"),
    location: {
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
    },
    dob: formData.get("dob"),
    phone: formData.get("phone"),
    dl: formData.get("dl"),
  });

  console.log("This is a server action test", formData.get("state"));

  return { test: "Good" };
};




















export const admin_server_action = async () => {
  const res = Renter.create({
    rid: "000045",
    email: "shitstain@dookie.com",
    password: "abcsded",
    name: "Moe Lester",
  });

  console.log("This is a server action", await res.json(), typeof res);

  return res;
};















function makeid(length, type = "any") {
  let result = "";
  let characters = "";

  if (type == "string")
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  else if (type == "num" || type == "number") characters = "0123456789";
  else
    characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

















export const formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ("" + str).replace(/\D/g, "");

  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }

  return null;
};
