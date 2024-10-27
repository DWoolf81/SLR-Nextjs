import { findUserFromSession } from "@/lib/actions";
import Payment from "@/models/payments";
import Link from "next/link";
import React from "react";

const findPayment = async (pid) => {

  const renter = await findUserFromSession()

  const payment = await Payment.findOne({  rid : renter.rid, pid: pid })
  
  return payment;
};



const Item = async ({ params }) => {
  const payment = await findPayment(params.item);


  const type = "Credit Card";

  const sample = {
    name : "Turd",
    age: "47",
    gender: "boy",
    hair: "green"
    }

    const pm = payment.payment

  const pmx = Object.entries(pm);

  console.log("WHat about payment", pm, payment)


  return (
    <>
      <div className="back-btn-box">
              <Link className="back-btn" href={`/account/history`}>
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
            </div>
      <div className="acct-history-item-top-box">
        <div className="ahitop-left"></div>
        <div className="ahitop-mid">
          <p>Pay Method</p>
        </div>
        <div className="ahitop-right"></div>
      </div>
      <div style={{ margin: "10px 50px" }}>
        <h2 style={{ borderBottom: "solid 1px grey", paddingBottom: "10px" }}>
          Payment Details: {params.item}{" "}
        </h2>

        <article className="pay-item-details-box">
          <p>
            #: <span> {payment.pid}</span>
          </p>
          <p>
            RVID: <span> {payment.rvid}</span>
          </p>
          <p>
            Date: <span> {payment.date}</span>
          </p>
          <p>
            Payment Type: <span> {type}</span>
          </p>
          <p>
            Amount: <span> {payment.amount}</span>
          </p>
        </article>
        <h2 style={{ borderBottom: "solid 1px grey", paddingBottom: "10px" }}>
          Method: {payment.method}
        </h2>
        <article className="pay-item-method-box">
          {pmx.map(([k, v], index) => (
            <p key={index}>
              {k}: <span>{v}</span>
            </p>
          ))}
        </article>
      </div>
    </>
  );
};

export default Item;
