import React from 'react'

const PaymentForm = () => {
  return (
    <>
    <form name='form'>
        <p><input type='text' name='name' placeholder='Name on card' /></p>
        <p><input type='text' name='cardNum' placeholder='Name on card' /></p>
        <p><input type='text' name='expire' placeholder='Name on card' /></p>
        <p><input type='text' name='cc' placeholder='Card Number' /></p>
    </form>
    </>
  )
}

export default PaymentForm