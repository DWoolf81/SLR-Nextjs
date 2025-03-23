import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Rentingheader = ({ rv, renter}) => {


    let rate = renter.renting.rate


  return (
    <div>
          <div className="acct-rv-top-box gap-20">
            <div>
              <div className="acct-rv-img">
                <Image
                  src="/assets/campers/00001/357354480_7354658054556968_7586703221745730716_n.jpg"
                  //src={imgSrc}
                  width={0}
                  height={0}
                  alt="2008 Fleetwood quantum 1"
                  style={{ width: "100%", height: "auto" }}
                  sizes="100vw"
                />
              </div>
            </div>
            <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
              <article>
                <p className="acct-sub-head-p">Renting From components</p>
                <p className="acct-bold-head-p">{ rv?.name }</p>
                <p style={{  display: "flex", alignItems: "center", gap: "5px" }}><span class="material-symbols-outlined green">
group
</span> <span>{ renter.name } + {renter.renting.tenants} </span></p>
              </article>
            </div>
            <div
              style={{
                padding: "0px 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p className="acct-bold-head-p">${ rate }</p>
              <p className="acct-sub-head-p" style={{ margin: "-5px 0px 10px" }}>month</p>
              <Link className="acct-details-btn" href={{
          pathname: `/rental/${rv?.rvid}`,
        }} >Details</Link>
            </div>
          </div>
        </div>
  )
}

export default Rentingheader