import React from "react";
import Image from "next/image";
import Link from "next/link";


export const RentalCard = ({ item }) => {

  let isAvail = ''
  let isAvailClass = 'is-avail-small '

  
    if (item.available === 0) {
      let isAvail = "Unavailable";
    } else if (item.available === 1) {
      isAvailClass = isAvailClass + "avail";
      isAvail = "Available";
    } else if (item.available === 2) {
      isAvailClass = isAvailClass + "soon";
      isAvail = "Reserve";
    }




  const imgSrc = `/assets/campers/${item.id}/${item.images[0]}`

  return (
    <div className="div1">
      <div className="rv-img-box">
        <Image
          //src="/assets/campers/00001/357354480_7354658054556968_7586703221745730716_n.jpg"
          src={imgSrc}
          width={0}
          height={0}
          alt="2008 Fleetwood quantum 1"
          style={{width: "100%", height: "auto"}}
          sizes="100vw"
        />
      </div>
      <div className="rv-details-box">
        <section className="rv-title">
          <p>{ item.name }</p>
        </section>
        <section className="rv-type">
          <p>{item.type} | Sleeps { item.sleeps } | { item.length }th</p>
        </section>
        <section className="rv-loc-avail">
          <p>{ item.location.city} { item.location.state } | <span className={isAvailClass }>Reserve</span></p>
        </section>
        <section className="rv-rate">
          <p>
            <span className="rv-price">${item.rate.day}/day</span> starting
          </p>
          <p className="rv-rate-star">
            <span className="material-symbols-outlined">star</span> 5.0 (18)
          </p>
        </section>
        <Link href={{
          pathname: `/rental/${item.id}`,
        }} 
        className="green-link">View Item</Link>
      </div>
    </div>
  );
};
