import Backbtn from "@/components/backbtn";
import YearSelect from "@/components/selectyear";
import { findUserFromSession } from "@/lib/actions";
import React from "react";

const Card = async () => {


    const renter = await findUserFromSession()


    const month = [...Array(13).keys()]
        month.shift()
  return (
    <>
      <Backbtn link="../payment" />
      <div>

<div style={{ 
        paddingLeft: "30px",
       }}>
        <h2 style={{  fontWeight: "bold" }}>Enter Credit Card</h2>
      </div>

      <div className="main-card-box">
        <div className="card-name">
          <p>Name</p>
          <input type="text" name="name" placeholder="Enter name on card" />
        </div>
        <div className="card-number">
          <p>Card Number</p>
          <input type="text" name="number" placeholder="Enter card number" />
        </div>
        <div className="card-expire">
          <div>
            <p>Expiration</p>
            <div className="card-date">
              <select>
                {month.map(index => {
                    const double = index.toString().length > 1 ? index:`0${index}`;
                    
                    return (
                  <option key={index} value={double}>
                    {double}
                  </option>
                )})}
              </select>
              <YearSelect />
            </div>
          </div>

          <div className="card-cvv">
            <p>CVV</p>
            <input type="text" name="cvv" maxLength={4} placeholder="CVV" />
          </div>
        </div>

        <div className="card-submit-box">
        <button>Submit</button>
      </div>
      </div>

      </div>
      

      
    </>
  );
};

export default Card;
