import React, { useState } from 'react'

const Univeralformcomponent = ({ placeholders }) => {

  const [desc, setDesc ] = useState(placeholders.desc ?? placeholders.desc)

  return (
    <>
    <textarea
          name="desc"
          placeholder={desc}
          required
        ></textarea>
        <input
          type="text"
          name="amenities"
          placeholder="Standard amenities Ex. 1 bedroom, 2 bath rooms,"
          required
        />
        <input
          type="text"
          name="addons"
          placeholder="Addons Ex. Smart TV, Amazon Firestick, Bluetooth speaker"
        />
        <input
          min="0"
          max="3"
          type="number"
          name="available"
          placeholder="0=Unavailable, 1=Available, 2=Reserve (Soon to be available)"
          required
        />
        <p>Rates (Current Rates)</p>
        <div style={{
          display: "flex",
          gap: "20px"
        }}>

          <input
          type='text'
          name='day'
          placeholder='Day'
          style={{ width: "30%" }}
          required
          />
          <input
          type='text'
          name='week'
          placeholder='Weekly'
          style={{ width: "30%" }}
          required
          />
          <input
          type='text'
          name='month'
          placeholder='Monthly'
          style={{ width: "30%" }}
          required
          />
          </div>
          <p>Special Rates (Promotional Rates)</p>
        <div style={{
          display: "flex",
          gap: "20px"
        }}>

          <input
          type='text'
          name='promo_day'
          placeholder='Day'
          style={{ width: "30%" }}
          />
          <input
          type='text'
          name='promo_week'
          placeholder='Weekly'
          style={{ width: "30%" }}
          />
          <input
          type='text'
          name='promo_month'
          placeholder='Monthly'
          style={{ width: "30%" }}
          />
        </div>
    
    </>
    
  )
}

export default Univeralformcomponent