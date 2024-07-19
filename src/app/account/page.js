import { redirect } from "next/navigation";
import React from "react";

const Account = () => {
     // Logic to determine if a redirect is needed
  const accessDenied = false
  if (accessDenied) {
    redirect("/login")
  }
  return (
    <div className="container flex-center">
      <div>Protected Account Page</div>
    </div>
  );
};

export default Account;
