import Link from "next/link";
import React from "react";

const Backbtn = ({ link }) => {
  return (
    <div className="back-btn-box">
      <Link className="back-btn" href={link}>
        <span className="material-symbols-outlined">arrow_back</span>
      </Link>
    </div>
  );
};

export default Backbtn;
