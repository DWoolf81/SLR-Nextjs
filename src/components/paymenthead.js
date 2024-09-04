import React from "react";

const Paymenthead = () => {
  return (
    <div style={{ margin: "20px 0px" }}>
      <h2 style={{ textAlign: "center" }}>Next Payment</h2>
      <div className="acct-mid-content">
        <div>
          <p className="acct-big-bold-head-p">$856</p>
        </div>
        <div className="acct-mid-date-box"
        >
          <p>
            <span className="material-symbols-outlined">calendar_month</span>
          </p>
          <p style={{ fontSize: "1.8rem", margin: "-8px 0px" }}>Oct</p>
          <p className="acct-big-bold-head-p">08</p>
        </div>
      </div>
    </div>
  );
};

export default Paymenthead;
