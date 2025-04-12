"use client";
import RentalListSelect from "@/components/rentallist";
import StateSelect from "@/components/stateslist";
import { getAllRvs, getAllRenters } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { payment_create_action } from "@/lib/payment/payment_actions";
import RenterSelectList from "@/components/renterselectlist";

const handleSubmit = async (prev, formData) => {

  console.log("What is the payment form", formData)
  const res = await payment_create_action(formData);

  if (res) {
    //router.push("/login");
  } else {
    console.error("Registration failed");
  }
};

export default function RegisterPage() {


  const setTheRenter = (val) => {
    console.log("The renter that's clicked", val)
    setRenter(val)
  } 
  
  const setRental = (val) => {
    console.log("The rv that's clicked", val)
    setRv(val)
  }
  const isOnTime = (e) => {
    setOnTime(e.target.value)
  }
  
  const changePaymentType = (e) => {
    setPaymentType(e.target.value)
  }
  
  const changePaymentTerm = (e) => {
    setPaymentTerm(e.target.value)
  }

  
  const [rv, setRv] = useState();
  const [rvs, setRvs] = useState();
  const [renter, setRenter] = useState();
  const [renters, setRenters] = useState();
  const [date, setDate ] = useState()
  const [amount, setAmount] = useState("");
  const [onTime, setOnTime] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");


  const [error, formAction] = useFormState(handleSubmit, null);

  const router = useRouter();

  useEffect(() => {
    const test = async () => {
      const rvs = await getAllRvs();

      const renters = await getAllRenters();

      setRenters(renters)
      setRvs(rvs)

      console.log("All rvs listed", rvs);
      console.log("All rvs listed", renters);
    };

    test();
  }, []);

  return (
    <div className="uniform-box">
      <form
        className={"uniform-form"}
        action={formData => formAction(formData) }
      >
        <RenterSelectList list={renters} onChange={setTheRenter} />
        <RentalListSelect list={rvs} onChange={setRental} />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="date of payment"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select value={onTime}  onChange={isOnTime}>
      <option value={0}>Payment On Time?</option>
        <option value={1}>On Time</option>
        <option value={2}>Late</option>
    </select>
    <select value={paymentType} onChange={changePaymentType}>
      <option value={0}>Payment Type</option>
        <option value={1}>Pro-rated</option>
        <option value={2}>Partial</option>
        <option value={3}>Full</option>
    </select>
    <select value={paymentTerm} onChange={changePaymentTerm}>
      <option value={0}>Payment Term</option>
        <option value={1}>Daily</option>
        <option value={2}>Weekly</option>
        <option value={3}>Bi-Weekly</option>
        <option value={4}>Monthly</option>
    </select>
       
        <textarea
          name="extra"
          placeholder="Date of birth ex 10/09/1981"
        > </textarea>
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
