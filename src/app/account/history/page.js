import Link from "next/link";
import React from "react";



const data1 = async () => {
  const res = await fetch(`http://localhost:3000/db/payments/payments.json`,
    {
      cache: "no-cache"
    }
  );

  const data = await res.json();

  return data;
};

const phStyles = {

  backBox: {
    display: "flex",
    height: "50px",
    top: "175px",
    left: "0px",
    background: "rgba(119, 160, 95, .5)",
    alignItems: "center",
    position: "fixed",
    padding: "0px 10px"

  },

  backBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    width: "100%",
    fontSize: "20px !important",
    alignItems: "center",
    gap: "6px",
    marginLeft: "10px",
    color: "white",
  },
};

const History = async () => {

  const rv = await data1();


const rvs = [...Array(25)]
  return (
    <div className="history-item-box">
      <div className="back-btn-box">
              <Link className="back-btn" href={`/account/`}>
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
            </div>
      <div className="history-grid-column-list">
        <div>
          <p>#</p>
        </div>
        <div>
          <p>Date</p>
        </div>
        <div>
          <p>Rv</p>
        </div>
        <div>
          <p>Type</p>
        </div>
        <div>
          <p>Amount</p>
        </div>
        <div>
          <p>Links</p>
        </div>

        {

          rvs.map(index => {

            return (


rv.map((el, index) => {
            const prime = index % 2 == 0 ? "acct-history-item" : ""
            let type = ""

          if (el.type == 1 ) type = "F"
          else if (el.type == 2) type = "P"
          else if (el.type == 3) type = "PF"

          return (
            <>
              <div key={index} className={prime} style={{ borderStartStartRadius: "10px", borderEndStartRadius: "10px" }}>
                <p>{el.pid}</p>
              </div>
              <div className={prime} >
                <p>{ el.date }</p>
              </div>
              <div className={prime}>
                <p><Link href={`/rental/${el.rvid}`}>{ el.rvid }</Link>
                </p>
              </div>
              <div className={prime}>
                <p>{ type }</p>
              </div>
              <div className={prime}>
                <p>${ el.amount }</p>
              </div>
              <div style={{display: "flex", flexDirection: "column", borderStartEndRadius: "10px", borderEndEndRadius: "10px" }}>
                  <Link className="acct-details-btn" href={`/account/history/${el.pid}`}>Link</Link>
              </div>
            </>
          );
        })





            )


          })
        
        
        
        
        
        }
      </div>
    </div>
  );
};

export default History;
