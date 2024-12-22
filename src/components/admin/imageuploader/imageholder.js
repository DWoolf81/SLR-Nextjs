"use client";
import { changeImgPosition, deleteImgS } from "@/lib/admin_actions";
import Image from "next/image";
import React, { useRef, useState } from "react";

const Imageholder = ({ imageObj, index }) => {
  const image = imageObj.image
    ? `/assets/rentals/uploads/${imageObj.rvid}/${imageObj.image}`
    : "/assets/rentals/default_camper.jpg";

  const ref = useRef("Default");

  if (ref.current.value) ref.current.value = "Default";
  console.log("Testing render");

  const clickMe = (img) => {
    console.log("get rid of this image", img);
    deleteImgS({
      rvid: imageObj.rvid,
      images: imageObj.images,
      remove: imageObj.image,
    });
  };

  const changeImagePosition = (pos) => {
    console.log("Ther postion is ", pos);
    changeImgPosition({
      rvid: imageObj.rvid,
      list: imageObj.images,
      img: imageObj.image,
      pos: pos,
    });
  };

  return (
    <>
      <div id={index} className="image-box">
        <div className="image-action-box">
          <div>
            <span
              onClick={() => clickMe(image)}
              className="material-symbols-outlined"
            >
              delete
            </span>
          </div>
          <div className="select-box">
            <select
              ref={ref}
              name="pos"
              onChange={(e) => {
                changeImagePosition(e.target.value);
              }}
            >
              <option value={"Default"}>--</option>
              {imageObj.images.map((img, index) => (
                <option value={index}>{++index}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <Image
            src={image}
            unoptimized
            width={0}
            height={0}
            alt="rv"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default Imageholder;
