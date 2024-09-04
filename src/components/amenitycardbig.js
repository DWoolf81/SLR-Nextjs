"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useFormState, useActionState } from "react-dom";
import Modalbox from "./modelbox";

const increment = async (prev, formData) => {
  if (!formData) return false;

  const amenityName = formData.get('name')
 

  const aor = formData.get("aor");

  let mess = false
  if (aor == 'add') mess = `<span style="font-weight: bold;">${amenityName}</span> amenity has been added `
  if (aor == 'remove') mess = `<span style="font-weight: bold;">${amenityName}</span> amenity has been removed `
  if (!aor) mess = "There was a problem. Call SLR for assistance"
  

  await new Promise((res, rej) => {
    setTimeout(() => {
      console.log("Waited like forever")
      res("Promise kept")
      
    }, 10 * 1000);
  });

  return mess;
};

const Amenitycardbig = ({ item }) => {

  const amenityName = `<span style="font-weight: bold;"> ${ item.name } </span>`

  const [state, formAction] = useFormState(increment, null);

  const [move, setMove] = useState(false);

  const [modal, setModal] = useState(null);

  const changeModal = (text) => {
    
    setModal(text)
    setMove(true)

  }



  useEffect(() => {
    console.log("useeffect works", state);

    if (state) {
      setModal(state);
      formAction(false);

      //setTimeout(() => setMove(false), 1000);
    }
  }, [state]);

  const stock = item.instock === true ? "In stock" : " Out Of Stock";
  const stockClass = item.instock === true ? "green" : "red";
  return (
    <>
      <div className="amenity-item-box">
        <Modalbox move={move}>
          <p style={{  textAlign: "center" }} dangerouslySetInnerHTML={{ __html: modal }} />
        </Modalbox>
        <div className="amenity-image-box">
          <Image
            src={`/assets/amenities/vectors/${item.image}`}
            className="amenity-list-image-big"
            width={0}
            height={0}
            alt={item.name}
            sizes="100vw"
          />
          <div className="amenity-image-box-shadow"></div>
        </div>
        <div className="amenity-cost-box">
          <p style={{ fontSize: "24px" }}>${item.rate}</p>
          <p className={stockClass}>{stock}</p>
        </div>
        <div>
          <article className="amenity-info-box">
            <h3 style={{ fontWeight: "bold" }}>{item.name}</h3>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                margin: "20px 0px",
              }}
            >
              {item.desc}
            </p>
          </article>
        </div>

        <div className="amenity-forms-box">
          {item.instock && (
            <form
              action={(formData) => {
                formAction(formData);
              }}
              name="add"
            >
              <input type="hidden" name="aor" value={"add"} />
              <input type="hidden" name="amenity" value={item.aid} />
              <input type="hidden" name="name" value={item.name} />
              <button
                onClick={() => changeModal(`Adding ${amenityName} amenity, Please wait...`)}
                className="amenity-button add-btn"
              >
                Add
              </button>
            </form>
          )}
          <form
            action={(formData) => {
              formAction(formData);
            }}
            name="remove"
          >
            <input type="hidden" name="aor" value={"remove"} />
            <input type="hidden" name="amenity" value={item.aid} />
            <input type="hidden" name="name" value={item.name} />
            <button
              onClick={() => changeModal(`Removing ${amenityName} amenity, Please wait...`)}
              className="amenity-button remove-btn"
            >
              Remove
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Amenitycardbig;
