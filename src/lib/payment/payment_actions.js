'use server'
import Payment from "@/models/payments";
import { createId, makeid } from "../admin_actions";
import { isOnTimeObj, paymentMethodObj, paymentStatusObj, paymentTermObj, paymentTypeObj } from "./payment_array";

export const payment_create_action = async (formData) => {
  // const renters = await Renter.find( {rid: "9999" })

  //const last = renters.pop()

  

  const pid = createId(10, "number");

  for (const value of formData.values()) {
    console.log(value);
  }



  const paymentObj = {
    pid: "0909090990",
    rvid: formData.get("renter"), // Rental ID
    rid: formData.get("rental"), // Renters ID
    date: formData.get("date"),
    amount: formData.get("amount"),
    isOnTime: isOnTimeObj[formData.get("isOnTime")].abbr,
    pm: formData.get("month"), // The payment month
    method: paymentMethodObj[formData.get("method")].abbr,
    pas: paymentTypeObj[formData.get("paymentType")].abbr,
    term: paymentTermObj[formData.get("paymentTerm")].abbr,
    status: paymentStatusObj[formData.get("paymentStatus")].abbr,
    desc: formData['extra']
  
  }

  const res = Payment.create(paymentObj);
  // const res = false; // For testing puposes

  if (res instanceof Payment) {
    console.log("What is the updated results", res);

    revalidatePath(`./admin/payment/add-payment`, "page");
    return {
      success: true,
      mess: `successfully inserted ${pid}`,
    };
  } else {
    console.log("Payment was not inserted", res);
   
  }

};
