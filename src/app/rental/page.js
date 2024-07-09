import React from 'react'

const Rental = ({ searchParams }  ) => {

    const params = searchParams;
    
  return (
    <div>Rental Dammit { params.rt } </div>
  )
}

export default Rental