import React from "react";

export const isOnTimeObj = {
  1: {
    name: "On Time",
    abbr: "OT",
  },
  2: {
    name: "Late",
    abbr: "L",
  },
};

export const paymentMethodObj = {
  1: { name: "Cash", abbr: "C" },
  2: { name: "Zelle", abbr: "Z" },
  3: { name: "Cash App", abbr: "CA" },
  4: { name: "Apple Pay", abbr: "AP" },
  5: { name: "Venmo", abbr: "V" },
  6: { name: "PayPal", abbr: "PP" },
};

export const paymentTypeObj = {
  1: { name: "Deposit", abbr: "D" },
  2: { name: "Pro-Rated", abbr: "PR" },
  3: { name: "Partial", abbr: "P" },
  4: { name: "Full", abbr: "F" },
};

export const paymentTermObj = {
  1: { name: "Daily", abbr: "D" },
  2: { name: "Weekly", abbr: "W" },
  3: { name: "Bi-Weekly", abbr: "BI" },
  4: { name: "Monthly", abbr: "M" },
};

export const paymentStatusObj = {
  1: { name: "Pending", abbr: "P" },
  2: { name: "Complete", abbr: "C" },
};
