import { findUserFromSession } from "@/lib/actions";
import Payment from "@/models/payments";
import Link from "next/link";
import React from "react";

const data1 = async () => {

 
  const res = await fetch(`http://localhost:3000/db/payments/payments.json`, {
    cache: "no-cache",
  });

  const data = await res.json();

  return data;
};

const History = async () => {


   const renter = await findUserFromSession()

  console.log("The renter for history", renter)

  const payments = await  Payment.find({ rid: renter.rid })

  console.log("Renters payments", payments)

  const rvs = [...Array(25)];
  return (
    <div style={{ marginTop: "75px"}}>
      <div className="back-btn-box">
        <Link className="back-btn" href={`/account/`}>
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>
      <div className="history-grid-column-list">
        <div>
          <p>#</p>
        </div>
        <div>
          <p>Date</p>
        </div>
        <div>
          <p>Rv</p>
        </div>
        <div>
          <p>Type</p>
        </div>
        <div>
          <p>Amount</p>
        </div>
        <div>
          <p>Links</p>
        </div>

        {payments.map((el, index) => {
          const prime = index % 2 == 0 ? "acct-history-item" : "";
          let type = "";

          if (el.type == 1) type = "F";
          else if (el.type == 2) type = "P";
          else if (el.type == 3) type = "PF";

          return (
            <>
              <div
                key={index}
                className={prime}
                style={{
                  borderStartStartRadius: "10px",
                  borderEndStartRadius: "10px",
                }}
              >
                <p>{el.pid}</p>
              </div>
              <div className={prime}>
                <p>{el.date}</p>
              </div>
              <div className={prime}>
                <p>
                  <Link href={`/rental/${el.rvid}`}>{el.rvid}</Link>
                </p>
              </div>
              <div className={prime}>
                <p>{type}</p>
              </div>
              <div className={prime}>
                <p>${el.amount}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderStartEndRadius: "10px",
                  borderEndEndRadius: "10px",
                }}
              >
                <Link
                  className="acct-details-btn"
                  href={`/account/history/${el.pid}`}
                >
                  Link
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default History;
