"use server";
import Payment from "@/models/payments";
import { getUniqueId } from "../admin_actions";
import {
  isOnTimeObj,
  paymentMethodObj,
  paymentStatusObj,
  paymentTermObj,
  paymentTypeObj,
} from "./payment_array";
import { revalidatePath } from "next/cache";
import { someShit } from "@/components/client/universal";
import { redirect } from "next/navigation";

export const payment_create_action = async (formData) => {
  
  const _pid = await getUniqueId("payment", 10, "number");
  const _err = _pid.substring(0,5)



  try {
    const paymentObj = {
      pid: _pid,
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
      desc: formData["extra"],
    };

    const res = await Payment.create(paymentObj);
    // const res = true; // For testing puposes

    if (res instanceof Payment) {

      // revalidatePath(`./admin/payment/add-payment`, "page");
      // redirect(`./admin/payment/add-payment`);
     return {
        success: true,
        mess: `Successfully inserted payment ${_err}`,
        pid: _pid
      };
    } else {
      console.log("Payment was not inserted. Server error", res);
      return { error: true, type: "danger", mess: `There was a problem with inserting this payment. Check the admin logs for details - x${_err}`}
    }
  } catch (e) {
    console.log("ERROR FOUND", e.message);
    return { error: true, type: "warning",  mess : `Please make sure to input all fields - x${_pid}`}
  }

  // return {success : true}
};
