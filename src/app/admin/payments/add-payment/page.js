"use client";
import RentalListSelect from "@/components/rentallist";
import { getAllRvs, getAllRenters } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { payment_create_action } from "@/lib/payment/payment_actions";
import RenterSelectList from "@/components/renterselectlist";

const handleSubmit = async (prev, formData) => {
  console.log("What is the payment form", formData);
  const res = await payment_create_action(formData);

  if (res) {
    //router.push("/login");
  } else {
    console.error("Registration failed");
  }
};

export default function RegisterPage() {
  const setTheRenter = (val) => {
    console.log("The renter that's clicked", val);
    setRenter(val);
  };

  const setRental = (val) => {
    console.log("The rv that's clicked", val);
    setRv(val);
  };
  const isOnTime = (e) => {
    setOnTime(e.target.value);
  };

  const changePaymentType = (e) => {
    setPaymentType(e.target.value);
  };

  const changePaymentTerm = (e) => {
    setPaymentTerm(e.target.value);
  };
  
  const changePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  
  const changePaymentStatus = (e) => {
    setPaymentStatus(e.target.value);
  };


  
  const [rv, setRv] = useState();
  const [rvs, setRvs] = useState();
  const [renter, setRenter] = useState();
  const [renters, setRenters] = useState();
  const [date, setDate] = useState();
  const [amount, setAmount] = useState("");
  const [onTime, setOnTime] = useState("");
  const [pm, setMonth] = useState("");
  const [method, setPaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const [error, formAction] = useFormState(handleSubmit, null);

  const router = useRouter();

  useEffect(() => {
    const test = async () => {
      const rvs = await getAllRvs();

      const renters = await getAllRenters();

      setRenters(renters);
      setRvs(rvs);

      console.log("All rvs listed", rvs);
      console.log("All rvs listed", renters);
    };

    test();
  }, []);

  return (
    <div className="uniform-box">
      <form
        className={"uniform-form"}
        action={(formData) => formAction(formData)}
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
        <select name='isOnTime'  value={onTime} onChange={isOnTime}>
          <option value={0}>Payment On Time?</option>
          <option value={1}>On Time</option>
          <option value={2}>Late</option>
        </select>
        <label htmlFor='month'>Rental Month</label>
        <input
          type="month"
          name="month"
          placeholder="Rental month"
          value={pm}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
        <select name='method'  value={method} onChange={changePaymentMethod}>
          <option value={0}>Payment Method?</option>
          <option value={1}>Cash</option>
          <option value={2}>Zelle</option>
          <option value={3}>Cash App</option>
          <option value={4}>Apple Pay</option>
          <option value={5}>Venmo</option>
          <option value={6}>PayPal</option>
        </select>
        <select name="paymentType" value={paymentType} onChange={changePaymentType}>
          <option value={0}>Payment Type</option>
          <option value={1}>Deposit</option>
          <option value={2}>Pro-rated</option>
          <option value={3}>Partial</option>
          <option value={4}>Full</option>
        </select>
        <select name="paymentTerm" value={paymentTerm} onChange={changePaymentTerm}>
          <option value={0}>Payment Term</option>
          <option value={1}>Daily</option>
          <option value={2}>Weekly</option>
          <option value={3}>Bi-Weekly</option>
          <option value={4}>Monthly</option>
        </select>
        
        <select name="paymentStatus" value={paymentStatus} onChange={changePaymentStatus}>
          <option value={0}>Payment Status</option>
          <option value={1}>Pending</option>
          <option value={2}>Complete</option>
        </select>

        <textarea name="extra" defaultValue="Extra details about payment">
        </textarea>

        <button type="submit">Add Payment</button>
      </form>
    </div>
  );
}
