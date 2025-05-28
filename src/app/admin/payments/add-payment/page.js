"use client";
import RentalListSelect from "@/components/rentallist";
import { getAllRvs, getAllRenters } from "@/lib/actions";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { payment_create_action } from "@/lib/payment/payment_actions";
import RenterSelectList from "@/components/renterselectlist";
import { getRenterById } from "@/lib/admin_actions";

const handleSubmit = async (prev, formData) => {
  // console.log("What is the payment form", formData);
  const res = await payment_create_action(formData);

  if (res.success) {
    //router.push("/login");
    console.log("It fucking worked");
    redirect(`/admin/payments/?r=${res.pid}`);
  } else if (res.error) {
    console.error("Registration failed badly");
    return res;
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

  const [error, formAction] = useFormState(handleSubmit, {});

  const [errorMess, setErrorMess] = useState(null);

  const router = useRouter();

  const errorRef = useRef(null);

  useEffect(() => {
    const test = async () => {
      const rvs = await getAllRvs();

      const renters = await getAllRenters();

      setRenters(renters);
      setRvs(rvs);
    };

    test();

    if (renter) {
      const renterDetails = async () => {
        const r = await getRenterById(renter);

        const today = new Date();
        
        const nextMonth =
          today.getMonth().length > 1
            ? today.getMonth() + 1
            : `0${today.getMonth() + 2}`;
            const currentMonth =
          today.getMonth().length > 1
            ? today.getMonth() + 1
            : `0${today.getMonth() + 1}`;
        const year =
          today.getMonth() == 12
            ? today.getFullYear() + 1
            : today.getFullYear();
        const nextPayDate = `${year}-${nextMonth}`;
        const currentPayDate = `${year}-${currentMonth}`


        const todayFormatted = `${today.getFullYear()}-${currentMonth}-${today.getDate().length > 1 ? today.getDate() : `0${today.getDate()}`}`

        console.log("We have a renter", renter, r, "Date", todayFormatted);

        setDate(todayFormatted)

        if (r.renting && r.renting !== "false") {
          const renting = r.renting;

          setRv(renting.rv);
          setAmount(renting.rate);
          const nextDate = renting.nextdate.split("T");
          setOnTime(1);
          setMonth(nextPayDate);
          setPaymentType(4);
          setPaymentType(4);
          setPaymentStatus(2);
        } else {
          setRv(0);
          setAmount(0);
          setOnTime(0);
          setMonth(currentPayDate);
          setPaymentType(null);
          setPaymentType(0);
          setPaymentStatus(0);
        }
      };

      renterDetails();
    }

    if (error.error) {
      const errMess = error.mess.split(" - ");
      setErrorMess(errMess[0].trim());

      const errorClass = errorRef.current;

      errorClass.className = `${errorClass.className} ${error.type} showError`;
    }
  }, [error?.mess, renter]);

  if (errorMess != null)
    setTimeout(() => {
      const errorClass = errorRef.current;
      errorClass.className = `adminError`;
    }, 6000);

  return (
    <div className="uniform-box">
      <div className="adminError" ref={errorRef}>
        <p style={{ margin: "10px 15px" }}>{errorMess}</p>
      </div>
      <form
        className={"uniform-form"}
        action={(formData) => {
          setErrorMess(null);
          formAction(formData);
        }}
      >
        <RenterSelectList list={renters} onChange={setTheRenter} />
        <RentalListSelect list={rvs} select={rv} onChange={setRental} />
        <label htmlFor="amount">Enter the rent amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <label htmlFor='date'>Enter date of payment</label>
        <input
          type="date"
          name="date"
          placeholder="date of payment"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label htmlFor='isOnTime'>Is payment on time?</label>
        <select name="isOnTime" value={onTime} onChange={isOnTime}>
          <option value={0}>Payment On Time?</option>
          <option value={1}>On Time</option>
          <option value={2}>Late</option>
        </select>
        <label htmlFor="month">Rental Month</label>
        <input
          type="month"
          name="month"
          placeholder="Rental month"
          value={pm}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
        <label htmlFor="method">Payment method</label>
        <select name="method" value={method} onChange={changePaymentMethod}>
          <option value={0}>Payment Method?</option>
          <option value={1}>Cash</option>
          <option value={2}>Zelle</option>
          <option value={3}>Cash App</option>
          <option value={4}>Apple Pay</option>
          <option value={5}>Venmo</option>
          <option value={6}>PayPal</option>
        </select>
        <label htmlFor="paymentType">What's the payment for?</label>
        <select
          name="paymentType"
          value={paymentType}
          onChange={changePaymentType}
        >
          <option value={0}>Payment Type</option>
          <option value={1}>Deposit</option>
          <option value={2}>Pro-rated</option>
          <option value={3}>Partial</option>
          <option value={4}>Full</option>
        </select>
        <label htmlFor="paymentTerm">What's the rental terms</label>
        <select
          name="paymentTerm"
          value={paymentTerm}
          onChange={changePaymentTerm}
        >
          <option value={0}>Payment Term</option>
          <option value={1}>Daily</option>
          <option value={2}>Weekly</option>
          <option value={3}>Bi-Weekly</option>
          <option value={4}>Monthly</option>
        </select>
        <label htmlFor="paymentStatus">Status of payment</label>
        <select
          name="paymentStatus"
          value={paymentStatus}
          onChange={changePaymentStatus}
        >
          <option value={0}>Payment Status</option>
          <option value={1}>Pending</option>
          <option value={2}>Complete</option>
        </select>
<label htmlFor="extra">Extra details about payment</label>
        <textarea
          name="extra"
          defaultValue="Extra details about payment"
        ></textarea>
        <div className="sticky-submit-box">

                  <button type="submit">Add Payment</button>

        </div>
      </form>
    </div>
  );
}
