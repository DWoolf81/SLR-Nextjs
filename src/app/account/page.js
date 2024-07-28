import { redirect } from "next/navigation";
import React from "react";
import { getSession, updateSession, decrypt } from "../lib/actions";
import Link from "next/link";

const Account = async () => {
  // Logic to determine if a redirect is needed

  const session = await getSession();

  const res = JSON.stringify(session);

  return (
    <>
      <div style={{ margin: "10px" }}>
        <div>
          <h2>Next Payment</h2>
          <div className="acct-mid-content" >
            <div>
              <p className="acct-big-bold-head-p">$856</p>
              
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0px 30px" }}>
              <p>
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
              </p>
              <p style={{ fontSize: "1.8rem", margin: "-8px 0px" }}>Oct</p>
              <p className="acct-big-bold-head-p">08</p>
            </div>
          </div>
        </div>

        <div className="acct-link-box">
          <Link className="acct-link" href="/account/payment">Make<br /> Payment</Link>
          <Link className="acct-link" href="/account/history">View <br />Payment<br /> History</Link>
          <Link className="acct-link" href="/account/amenities">Add/Remove <br />Amenities</Link>
          <Link className="acct-link" href="/account/leave">Schedule<br /> Move-out</Link>



        </div>
      </div>
    </>
  );
};

export default Account;
