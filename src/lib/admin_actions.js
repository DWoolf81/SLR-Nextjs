"use server";
import bcrypt, { hash } from "bcryptjs";
import Renter from "@/models/renters";
import { redirect } from "next/navigation";
import Camper from "@/models/rental";
import Location from "@/models/locations";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import Rental from "@/models/rental";

const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

// obj should have 4 properties
// { rvid: value, list: value, img: value, pos: value}
export const changeImgPosition = async (obj) => {
  // We need to rmove the img from the list first
  const origg = obj.list.filter((num) => num != obj.img);

  // Create a new array to holder the list of images
  let arr = [];

  // Create a counter to
  let count = 0;

  // Map of the images with the remove images
  if (origg.length == obj.pos) {
    arr = [...origg, obj.img];
  } else {
    origg.map((img) => {
      // once the count gets the the new postion
      // add the new image
      // increase the counter by one
      if (count == obj.pos) {
        arr[count] = obj.img;
        count++;
      }

      // continue to add images to arr
      arr[count] = img;
      // increase the counter on every iteration

      count++;
    });
  }

  // Update the rental with new pictures arra
  const res = await Rental.updateOne({ rvid: obj.rvid }, { pictures: arr });

  if (res.matchedCount) {
    console.log("Image position has changed");
    // revalidate path to see the
    revalidatePath("/admin/rentals/[rvid]/images");
    redirect(`/admin/rentals/${obj.rvid}/images`);
  } else {
    console.log("Images postion did not update");
  }
};

export const deleteImgS = async (obj) => {
  const filterImg = obj.images.filter((imgs) => imgs !== obj.remove);

  const imgDir = `./public/assets/rentals/uploads/${obj.rvid}/${obj.remove}`;

  await fs.access(imgDir, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File does not exist:", err);
      return;
    }
  });

  console.log("File exists!");

  const res = await Rental.updateOne(
    { rvid: obj.rvid },
    { pictures: filterImg }
  );

  if (res.matchedCount) {
    await fs.unlink(imgDir, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });

    revalidatePath("/admin/rentals/[rvid]/images", "page");
  } else console.log("No image was removed");
};

const getFileExtension = (file) => {
  let ext = "";

  console.log("The file extension", file.type.toLowerCase());

  if (
    file.type.toLowerCase() == "image/jpeg" ||
    file.type.toLowerCase() == "image/jpg"
  ) {
    ext = ".jpg";
  } else if (file.type.toLowerCase() == "image/png") {
    ext = ".png";
  } else if (file.type.toLowerCase() == "image/gif") {
    ext = ".gif";
  } else ext = false;

  return ext;
};

export const imageUpload = async (formData, rental) => {
  // console.log("We are here ready for image uploads", formData);

  const imgDir = "./public/assets/rentals/uploads/";

  const images = [];

  const mkDir = rental.rvid && `${imgDir}${rental.rvid}`;

  try {
    let i = 0;
    for (const files of formData) {
      const file = formData.get(`file[${i}]`);

      const ext = getFileExtension(file);

      //console.log("File name is", file);

      if (ext) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        // console.log("FIle is an image", file);

        await fs.mkdir(mkDir, { recursive: true });

        await fs.writeFile(`${mkDir}/${file.name}${ext}/`, buffer);

        rental.pictures.push(file.name + ext);

        i++;
      }
    }

    console.log("Do we have images", images, rental.pictures);
    const res = await Camper.updateOne(
      { rvid: rental.rvid },
      { pictures: rental.pictures }
    );

    if (res.matchedCount) {
      console.log("Images have been uploaded and insert in database");
      revalidatePath("/admin/rentals/[rvid]/images", "page");
    } else {
      throw new Error("images did not insert into database");
    }
  } catch (error) {
    console.log("error found", error);
  }
};

const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  let compare = false;

  if (date1 < date2) {
    console.log(`${d1} is less than ${d2}`);
    compare = "less";
  } else if (date1 > date2) {
    console.log(`${d1} is greater than ${d2}`);
    compare = "greater";
  } else {
    console.log(`Both dates are equal`);
    compare = "equal";
  }

  return compare;
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
  const rv = await Rental.findOne({ rvid: formData.get("rv") });
  const loc = await Location.findOne({ loc_id: formData.get("location") });

  const error = {};

  console.log("Check if object is empty", formData.get("rate"));

  if (!loc) error.loc = "This location ID is not listed";

  if (!rv) error.rv = "This camper ID is not listed";

  if (isNaN(formData.get("rate")))
    error.rate = "Rate is too low or not a number";

  if (isNaN(formData.get("tenants")) || Number(formData.get("tenants")) < 1)
    error.tenants = "There needs to be at least 1 tenant";

  const now = new Date();

  if (
    compareDates(
      formData.get("nextdate"),
      `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    ) == "less"
  )
    error.nextdate = "Date has already passed";

  const kk = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

  console.log("Check amount is good", kk);

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

export const admin_server_action_rental = async (formData) => {
  const rvid = makeid(10, "number");

  // console.log("This is the form data", formData);

  // return "This aint working"


  if (formData.get("formType") == "insert") {
    const res = await Rental.create({
      rvid: rvid,
      name: formData.get("name"),
      year: formData.get("year"),
      length: formData.get("length"),
      type: formData.get("type"),
      sleeps: formData.get("sleeps"),
      details: {
        year: formData.get("year"),
        containers: formData.get("containers"),
        stories: formData.get("stories"),
        sqtft: formData.get("sqtft"),
        make: formData.get("make"),
        model: formData.get("model"),
        beds: formData.get("beds"),
        baths: formData.get("baths"),
        sleeps: formData.get("sleeps"),
      },
      location: {
        loc_id: formData.get("loc_id"),
        address: formData.get("address"),
        city: formData.get("city"),
        state: formData.get("state"),
        zip: formData.get("zip"),
        site: formData.get("site"),
        map: formData.get("map"),
      },
      desc: formData.get("desc"),
      amenities: formData.get("amenities").split(", "),
      addons: formData.get("addons").split(", "),
      available: formData.get("available"),
      rate: {
        day: formData.get("day"),
        week: formData.get("week"),
        month: formData.get("month"),
      },
      promo_rate: {
        day: formData.get("promo_day"),
        week: formData.get("promo_week"),
        month: formData.get("promo_month"),
      },
    });

    if (res instanceof Rental) {
      console.log("What is the updated results", res);

      revalidatePath(`./admin/rentals/new-rental`, "page");
      return {
        success: true,
        mess: `successfully inserted ${formData.get("type")}`,
      };

      // redirect(`./admin/rentals/${rvid}/edit`);
    } else {
      console.log("Rental was not inserted", result);
    }
  } else if (formData.get("formType") == "update") {
    const rvid = formData.get("rvid");

    console.log("Updating camper info");
    const res = Rental.updateOne(
      { rvid: formData.get("rvid") },
      {
        name: formData.get("name"),
        year: formData.get("year"),
        length: formData.get("length"),
        type: formData.get("type"),
        sleeps: formData.get("sleeps"),
        details: {
          year: formData.get("year"),
          make: formData.get("make"),
          model: formData.get("model"),
          sqtft: formData.get("sqtft"),
          stories: formData.get("stories"),
          beds: formData.get("beds"),
          baths: formData.get("baths"),
          sleeps: formData.get("sleeps"),
        },
        location: {
          loc_id: formData.get("loc_id"),
          address: formData.get("address"),
          city: formData.get("city"),
          state: formData.get("state"),
          zip: formData.get("zip"),
          site: formData.get("site"),
          map: formData.get("map"),
        },
        desc: formData.get("desc"),
        amenities: formData.get("amenities").split(", "),
        addons: formData.get("addons").split(", "),
        available: formData.get("available"),
        rate: {
          day: formData.get("day"),
          week: formData.get("week"),
          month: formData.get("month"),
        },
        promo_rate: {
          day: formData.get("promo_day"),
          week: formData.get("promo_week"),
          month: formData.get("promo_month"),
        },
      }
    ).then((result) => {
      console.log("What is the updated results", result);
      if (result.matchedCount) {
        revalidatePath(`./admin/rentals/[rvid]/edit`, "page");
        // redirect(`./admin/rentals/${rvid}/edit`);
        return {
          success: true,
          mess: `successfully updated ${formData.get("type")}`,
        };
      } else {
        console.log("Rental not updated");
      }
    });

    return res;
  }
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

export const getLocationList = async (searchObj) => {
  const locations = await Location.find({ searchObj });

  return JSON.parse(JSON.stringify(locations));
};
