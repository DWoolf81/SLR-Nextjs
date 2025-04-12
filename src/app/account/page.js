import React from "react";
// import { getSession } from "@/lib/sessions";
import Link from "next/link";

const Account = async () => {
  // Logic to determine if a redirect is needed

  

  return (
    <div style={{ 
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div>
        <div className="acct-link-box">
          <Link className="acct-link" href="/account/payment">Make<br /> Payment</Link>
          <Link className="acct-link" href="/account/history">View <br />Payment<br /> History</Link>
          <Link className="acct-link" href="/account/amenities">Amenities</Link>
          <Link className="acct-link" href="/account/moveout">Schedule<br /> Move-out</Link>



        </div>
      </div>
        
    </div>
  );
};

export default Account;
