import React, { useContext, useEffect } from 'react'
import { CartContext } from '../components/context/CartContext';

export default function Success() {


  const { clearCart } = useContext(CartContext);

  useEffect(() => {

    clearCart();
  }, []);


  return (
    <div className='pt-56 flex justify-center'>Success!</div>
  )
}
