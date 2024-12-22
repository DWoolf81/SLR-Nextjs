import { getLocationList } from "@/lib/admin_actions";
import React, { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  console.log(state, action);
  return { value: action.value };
};
const RentalListType = (props) => {
  const [state, dispatch] = useReducer(reducer, { value: "Default" });

  useEffect(() => {
    props.onClick(state);
  }, [state]);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          borderBottom: "solid 1px #fefefe",
          padding: "10px 0px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => dispatch({ value: "camper" })}
          className="admin-link"
          value={"RV/Camper"}
        >
          RV/Camper
        </button>
        <button
          onClick={() => dispatch({ value: "house" })}
          className="admin-link"
          value={"House"}
        >
          House
        </button>
        <button
          onClick={() => dispatch({ value: "condo" })}
          className="admin-link"
          value={"Condo"}
        >
          Condo
        </button>
        <button
          onClick={() => dispatch({ value: "apartment" })}
          className="admin-link"
          value={"Apartment"}
        >
          Apartment
        </button>
        <button
          onClick={() => dispatch({ value: "container" })}
          className="admin-link"
          value={"Container"}
        >
          Container Home
        </button>
        <button
          onClick={() => dispatch({ value: "townhome" })}
          className="admin-link"
          vlaue={"Townhome"}
        >
          Town Home
        </button>
      </div>
    </>
  );
};

export default RentalListType;
