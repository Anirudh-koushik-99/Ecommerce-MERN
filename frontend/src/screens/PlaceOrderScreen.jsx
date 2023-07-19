import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { Button } from 'react-bootstrap'

const PlaceOrderScreen = () => {
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
      <h1>Place Order</h1>
      <Button type='submit' variant='primary'>Place Order</Button>
      
    </div>
  )
}

export default PlaceOrderScreen
