import Image from "next/image";
import Link from "next/link";
import React from "react";

const Amenitycard = ({ item }) => {
  //const add = await fetch("http://localhost:3000/db/amenities.json");

  //const amen = await add.json();

  // const item = amen.find(({ aid }) => aid === 1);

  const stock = item.instock === true ? "In stock":" Out Of Stock"
  const stockClass = item.instock === true ? "green":"red"

  console.log("This is item", item.aid)


  return (
    <>
      <div className="amenity-item-box-mini">
        <div className="amenity-image-box-mini">
          <Image
            src={`/assets/amenities/vectors/${item.image}`}
            className="amenity-list-image-big"
            width={0}
            height={0}
            alt={item.name}
            style={{ maxWidth: "150px" }}
            sizes="100vw"
          />
          <div className="amenity-image-box-shadow-mini"></div>
        </div>
        <div style={{ width: "100%", fontWeight: "bold" }}>
          <p>{item.name}</p>
        </div>

        <div className="amenity-cost-box-mini">
          <div>
            <p style={{ fontSize: "24px" }}>${item.rate}<span style={{ color: "grey", fontSize: "12px" }}>/mo</span></p>
            <p style={{  fontSize: "12px" }} className={stockClass}>{ stock }</p>
          </div>
          <div style={{ paddingTop: "5px" }}>
            <Link className="amenity-button-mini add-btn" href={`./${item.aid}`}>
              View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Amenitycard;
