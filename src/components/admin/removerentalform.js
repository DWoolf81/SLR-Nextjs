"use client";
import { deleteRental } from "@/lib/admin_actions";
import Link from "next/link";
import React, { use, useEffect, useRef, useState } from "react";

const Removerentalform = (props) => {
  const rental = props.show.rental;

  const [some, setSome] = useState("");

  const [itemHead, setItemHead] = useState("");

  const [closeBtn, setCloseBtn] = useState("Cancel");

  const theForm  = useRef(null)

  const formAction = async () => {
    console.log("Does this work", theForm.current.rvid);

    const formData = new FormData(theForm.current)

    console.log("This is the form data", formData.get("type"))


    const res = await deleteRental(formData);

    //console.log("Result of the delete", res);

    setItemHead(res.mess);

    setCloseBtn("Close");
  };

  useEffect(() => {
    if (!itemHead) props.show.isShow = false;
  }, [itemHead]);

  const cancel = (e) => {
    e.preventDefault();

    setSome({ isShow: false, rvid: some.rvid });
    props.show.isShow = false;
    props.show.rvid = null;

    setItemHead("");

    props.onClick();
  };

  const itemName = itemHead ? itemHead : `${rental?.rvid} - ${rental?.name}`;

  return (
    <>
      {props.show.isShow && (
        <div className="remove-item-confirm-box">
          <div className="remove-item-inner-box">
            <p style={{ margin: "30px 0px", fontWeight: "bold" }}>
                {itemName}
              </p>
            <form ref={theForm}>
              
              {!itemHead && (
                <>
                  <input type="hidden" name="rvid" value={rental?.rvid} />
                  <select className="form-action-type" name="type" onChange={(formData) => formAction(formData)}>

                    <option value={0}>Select A Type</option>
                    <option value={1}>Active</option>
                    <option value={2}>Inactive</option>
                    <option value={3}>Remove</option>
                  </select>
                </>
              )}
              <br />
              <Link
                style={{
                  display: "block",
                  padding: "10px 30px",
                  marginTop: "20px",
                  fontWeight: "bold",
                  color: "#8bc34a",
                }}
                href=""
                onClick={(e) => cancel(e)}
              >
                {closeBtn}
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Removerentalform;
