import { redirect } from "next/navigation";
import React from "react";
import { getSession } from "@/lib/sessions";
import Link from "next/link";
import Paymenthead from "@/components/paymenthead";

const Account = async () => {
  // Logic to determine if a redirect is needed

  const session = await getSession();

  const res = JSON.stringify(session);

  return (
    <>
        <Paymenthead />

        <div className="acct-link-box">
          <Link className="acct-link" href="/account/payment">Make<br /> Payment</Link>
          <Link className="acct-link" href="/account/history">View <br />Payment<br /> History</Link>
          <Link className="acct-link" href="/account/amenities">Amenities</Link>
          <Link className="acct-link" href="/account/moveout">Schedule<br /> Move-out</Link>



        </div>
    </>
  );
};

export default Account;
