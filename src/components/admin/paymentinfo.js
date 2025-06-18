'use client'
import React from 'react'
import Addlink from './addlink'

const PaymentInfo = ({ payment }) => {

    console.log("Client side payment", payment)
  return (
    <><div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <h1>Payment ID: {payment.pid}</h1>
        <Addlink
          linkpath={`/admin/renters/${payment.pid}/edit`}
          text={"Edit Payment"}
        />
      </div>

      <div className={"admin-info-box"}>

        <div className='payment-info-box'>
            <p>This the desc</p>
            <p>This the info</p>
        </div>

      </div></>
  )
}

export default PaymentInfo