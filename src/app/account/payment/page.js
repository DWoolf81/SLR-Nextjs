import Link from "next/link";
import React from "react";


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

const Payment = () => {
  return (
    <div className="acct-main-box">
        <div style={phStyles.backBox}>
              <Link style={phStyles.backBtn} href={`/account/history`}>
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Back</span>
              </Link>
            </div>
      <div style={{ textAlign: "center", margin: "20px 10px" }}>
        <h2
          style={{
            marginBottom: "30px",
            paddingBottom: "10px",
            borderBottom: "solid 1px #e2e2e2",
            color: "var(--main-link-color)",
            fontSize:"24px"
          }}
        >
          2 ways to pay
        </h2>
        <article>
          <p
            style={{
              color: "#77a05f",
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            Mobile Pay
          </p>
          <p>Pay your rent any of the various mobile payment services</p>
          <p>Accepted Mobile Services</p>
          <Link className="acct-payment-btn" href="#">
            Mobile Payment Services
          </Link>
        </article>

        <article>
          <p
            style={{
              color: "#77a05f",
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            Credit Card
          </p>
          <p>Pay your rent using a credit and set up auto pay</p>
          <Link className="acct-payment-btn" href="#">
            Payment with Credit Card
          </Link>
        </article>
      </div>
    </div>
  );
};

export default Payment;
