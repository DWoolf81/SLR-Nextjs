"use server";
import bcrypt, { hash } from "bcryptjs";
import Renter from "@/models/renters";
import { redirect } from "next/navigation";
import Camper from "@/models/campers";
import Location from "@/models/locations";

const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0
}

const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  let compare = false

  if (date1 < date2) {
    console.log(`${d1} is less than ${d2}`);
    compare = "less"
  } else if (date1 > date2) {
    console.log(`${d1} is greater than ${d2}`);
    compare = "greater"
  } else {
    console.log(`Both dates are equal`);
    compare ="equal"
  }

  return compare
};

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
  const stockNum = makeid(10, "number");

  action.addon.stockNum = stockNum;

  const res = await Renter.updateOne(
    { rid: action.rid },
    { $push: { addon: action.addon } }
  );

  //const res = (await fetch("http://localhost:3000/db/amenities.json"));
  //const data = await res.json()

  console.log("Call a server action for ", action);

  redirect(`/admin/renters/${action.rid}/addons`);

  // return JSON.parse(JSON.stringify(action))
};

export const addRental = async (formData) => {
  const rid = formData.get("rid");
  const rv = await Camper.findOne({ rvid: rid });
  const loc = await Location.findOne({ loc_id: formData.get("location") });

  formData.set("rate", "corn");

  const error = {};

  console.log("Check if object is empty", isObjectEmpty(error))

  if (!loc) error.loc = "This location ID is not listed";

  if (!rv) error.rv = "This camper ID is not listed";

  if (isNaN(formData.get("rate"))) error.rate = "Rate is too low or not a number"

  if (isNaN(formData.get('tenants')) || Number(formData.get("tenants")) < 1) error.tenants = "There needs to be at least 1 tenant"

  const now = new Date()


  if (compareDates(formData.get("nextdate"), `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`) == "less") error.nextdate = "Date has already passed"

  const kk = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`


  console.log("Check amount is good", formData.get("nextdate"), new Date(), compareDates(formData.get("nextdate"), `${now.getFullYear}-${now.getMonth}-${now.getDate()}`))

  if (isObjectEmpty(error)) {
    const res = Renter.updateOne(
      { rid: formData.get("rid") },
      {
        renting: {
          rv: formData.get("rv"),
          tenants: Number(formData.get("tenants")),
          rate: Number(formData.get("rate")),
          location: formData.get("location"),
          nextdate: formData.get("nextdate"),
          moveout: formData.get("movedate"),
          addon: [],
        },
      }
    );

    console.log("This is the value of res", (await res).matchedCount);

    redirect(`/admin/renters/${rid}`);
  }

  return error;
};

export const deleteAddon = async (formData) => {
  const renter = await Renter.findOne({ rid: formData.get("rid") });

  const rid = formData.get("rid");

  console.log(renter);

  const addons = [
    { rid: 1, name: "one" },
    { rid: 2 },
    { rid: 3 },
    { rid: 4 },
    { rid: 5 },
    { rid: 6 },
    { rid: 7 },
  ];

  const filArr = renter.addon.filter(
    (el) => el.stockNum != formData.get("stock")
  );

  const updateAddon = await Renter.updateOne({ rid: rid }, { addon: filArr });

  console.log("Get data from a form", formData.get("aid"), filArr);
  redirect(`/admin/renters/${rid}/addons`);
};

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
