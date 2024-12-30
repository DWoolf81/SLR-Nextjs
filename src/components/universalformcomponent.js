import React, { useState } from 'react'

const Univeralformcomponent = ({ placeholders }) => {

  // console.log("the placeholders", placeholders)

  const [desc, setDesc ] = useState(placeholders.desc ?? placeholders.desc)
  const [amenities, setAmenities ] = useState(placeholders.amenities ?? placeholders.amenities)
  const [addons, setAddons ] = useState(placeholders.addons ?? placeholders.addons?.toString())
  const [available, setAvailable ] = useState(placeholders.available ?? placeholders.available)
  const [rateDay, setRateDay ] = useState(placeholders.rateDay ?? placeholders.rateDay)
  const [rateWeek, setRateWeek ] = useState(placeholders.rateWeek ?? placeholders.rateWeek)
  const [rateMonth, setRateMonth ] = useState(placeholders.rateMonth ?? placeholders.rateMonth)
  const [promoDay, setPromoDay ] = useState(placeholders.promoDay ?? placeholders.promoDay)
  const [promoWeek, setPromoWeek ] = useState(placeholders.promoWeek ?? placeholders.promoWeek)
  const [promoMonth, setPromoMonth ] = useState(placeholders.promoMonth ?? placeholders.promoMonth)

  return (
    <>
    <textarea
          name="desc"
          defaultValue={desc}
          required
          rows={10}
        ></textarea>
        <input
          type="text"
          name="amenities"
          placeholder="Standard amenities Ex. 1 bedroom, 2 bath rooms,"
          required
          value={amenities}
          onChange={e => setAmenities(e.target.value)}
        />
        <input
          type="text"
          name="addons"
          placeholder="Addons Ex. Smart TV, Amazon Firestick, Bluetooth speaker"
          value={addons}
          onChange={e => setAddons(e.target.value)}
        />
        <input
          min="0"
          max="3"
          type="number"
          name="available"
          placeholder="0=Unavailable, 1=Available, 2=Reserve (Soon to be available)"
          value={available}
          onChange={e => setAvailable(e.target.value)}
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
          value={rateDay}
          onChange={(e) => setRateDay(e.target.value)}
          />
          <input
          type='text'
          name='week'
          placeholder='Weekly'
          style={{ width: "30%" }}
          required
          value={rateWeek}
          onChange={(e) => setRateWeek(e.target.value)}
          />
          <input
          type='text'
          name='month'
          placeholder='Monthly'
          style={{ width: "30%" }}
          required
          value={rateMonth}
          onChange={(e) => setRateMonth(e.target.value)}
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
          value={promoDay}
          onChange={(e) => setPromoDay(e.target.value)}
          />
          <input
          type='text'
          name='promo_week'
          placeholder='Weekly'
          style={{ width: "30%" }}
          value={promoWeek}
          onChange={(e) => setPromoWeek(e.target.value)}
          />
          <input
          type='text'
          name='promo_month'
          placeholder='Monthly'
          style={{ width: "30%" }}
          value={promoMonth}
          onChange={(e) => setPromoMonth(e.target.value)}
          />
        </div>
    
    </>
    
  )
}

export default Univeralformcomponent