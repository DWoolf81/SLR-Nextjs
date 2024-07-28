import Link from "next/link";
import React from "react";

const findPayment = async (rvid) => {
  const res = await fetch(`http://localhost:3000/db/payments/payments.json`);

  const arr = await res.json();

  const find = arr.find((rvid) => rvid === rvid);

  console.log(find.payment);

  return find;
};


const phStyles = {

  backBox: {
    display: "flex",
    height: "50px",
    top: "75px",
    left: "0px",
    background: "rgba(119, 160, 95, .5)",
    width: "100%",
    alignItems: "center"

  },

  backBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    width: "100%",
    fontSize: "20px !important",
    alignItems: "center",
    gap: "6px",
    marginLeft: "10px",
    color: "white",
  },
};
const Item = async ({ params }) => {
  const payment = await findPayment(params.item);

  const type = "Credit Card";

  const pm = Object.entries(payment.payment);


  return (
    <div className="history-item-box">
      <div style={phStyles.backBox}>
              <Link style={phStyles.backBtn} href={`/account/history`}>
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
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
          Method:{" "}
        </h2>
        <article className="pay-item-method-box">
          {pm.map(([k, v], index) => (
            <p key={index}>
              {k}: <span>{v}</span>
            </p>
          ))}
        </article>
      </div>
    </div>
  );
};

export default Item;
