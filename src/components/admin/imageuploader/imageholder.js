"use client";
import { changeImgPosition, deleteImgS } from "@/lib/admin_actions";
import Image from "next/image";
import React, { useRef, useState } from "react";

const Imageholder = ({ imageObj, index }) => {
  const image = imageObj.image
    ? `/assets/rentals/uploads/${imageObj.rvid}/${imageObj.image}`
    : "/assets/rentals/default_camper.jpg";

  const ref = useRef("Default");

  const pos = index + 1


  if (ref.current.value) ref.current.value = "Default";

  const clickMe = (img) => {
    deleteImgS({
      rvid: imageObj.rvid,
      images: imageObj.images,
      remove: imageObj.image,
    });
  };

  const changeImagePosition = (pos) => {
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
              value={pos}
            >
              {imageObj.images.map((img, index) => (
                <option alue={index}>{++index}</option>
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
