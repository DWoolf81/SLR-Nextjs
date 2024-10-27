"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Error = (error, reset) => {

    useEffect(() => {
        console.error(error)
    }, [error])
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        width: "100%",
        top: "0px",
        flexDirection: "column"
      }}
    >
      <p>There was a error somewhere</p>
      <div>
              <Link href="../../search">Go Back</Link>

      </div>
    </div>
  );
};

export default Error;
