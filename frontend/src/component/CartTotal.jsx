import React from 'react'
import { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { cartData, getCartAmount, currency, delivery_fee } = useContext(shopDataContext);
  
  return (
    <div className='w-full lg:ml-[30px]'>
      <div className='text-xl py-[10px]'>
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      
      <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[1px] border-gray-200 bg-white rounded-xl shadow-sm'>
        
        <div className='flex justify-between text-gray-600 text-[18px] p-[10px]'>
          <p>Subtotal</p>
          <p className='font-medium text-gray-800'>{currency} {getCartAmount()}.00</p>
        </div>
        
        <hr className='border-gray-200' />
        
        <div className='flex justify-between text-gray-600 text-[18px] p-[10px]'>
          <p>Shipping Fee</p>
          <p className='font-medium text-gray-800'>{currency} {delivery_fee}</p>
        </div>
        
        <hr className='border-gray-200' />
        
        <div className='flex justify-between text-gray-900 text-[20px] p-[10px] mt-2'>
          <b>Total</b>
          <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
        </div>
        
      </div>
    </div>
  )
}

export default CartTotal;