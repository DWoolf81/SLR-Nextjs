import Backbtn from "@/components/backbtn";
import Image from "next/image";
import React from "react";

const Mobile = () => {
  return (
    <>
      <Backbtn link="../payment" />
      <div style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px", color: "var(--main-link-color)" }}> Accepted Payment</h2>
        <p>SLR accepts any of the below mobile payment services</p>
        <p>Send all payments to (718) 999 - 1010</p>
        <p>Please add in the note area your Renters ID for processing. For payments like Apple Pay, just add the renters ID in the text message</p>
        <ul
          className="mobile-pay-list"
          style={{
            margin: "50px 10px",
          }}
        >
          <li>
            <Image
              src="/assets/logo/mpl/Apple-Pay-logo-500.png"
              width={0}
              height={0}
              alt="Simply Living Logo"
              sizes="100vw"
              style={{ width: "10%", height: "auto" }}
            />
            Apple Pay
          </li>
          <li><Image
              src="/assets/logo/mpl/Cash-App-Logo-500.png"
              width={0}
              height={0}
              alt="Simply Living Logo"
              sizes="100vw"
              style={{ width: "10%", height: "auto" }}
            />Cash App</li>
          <li><Image
              src="/assets/logo/mpl/Paypal-Logo-500.png"
              width={0}
              height={0}
              alt="Simply Living Logo"
              sizes="100vw"
              style={{ width: "10%", height: "auto" }}
            />Zelle</li>
          <li><Image
              src="/assets/logo/mpl/Venmo-Logo-500.png"
              width={0}
              height={0}
              alt="Simply Living Logo"
              sizes="100vw"
              style={{ width: "10%", height: "auto" }}
            />Venmo</li>
          <li><Image
              src="/assets/logo/mpl/Zelle-Logo-500.png"
              width={0}
              height={0}
              alt="Simply Living Logo"
              sizes="100vw"
              style={{ width: "10%", height: "auto" }}
            />Paypal</li>
        </ul>
      </div>
    </>
  );
};

export default Mobile;
