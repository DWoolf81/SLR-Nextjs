import React from 'react'

const RentalType = ({ type }) => {

    const rentalTypes = (type) => {        
          const types = {
            camper : "RV/Camper",
            container : "Container Home",
            house: "House",
            condo: "Condo/High Rise",
            apartment: "Apartment",
            townhome: "Town Home"
        
          }
        
          return types[type]
        
        }
  return rentalTypes(type)
}

export default RentalType