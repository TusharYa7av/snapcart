'use client'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '@/redux/cardSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { ArrowLeft, Minus, Plus, ShoppingBasket, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const CartPage = () => {

  const { cartData, subTotal, deliveryFee } =
    useSelector((state: RootState) => state.cart)

  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className='w-[95%] sm:w-[90%] md:w-[80%] mx-auto mt-8 mb-24 relative'>

      {/* BACK BUTTON */}
      <Link
        href={"/"}
        className='absolute -top-2 left-0 flex items-center gap-2 text-green-700 hover:text-green-800 font-medium'
      >
        <ArrowLeft size={20} />
        <span className='hidden sm:inline'>Back to home</span>
      </Link>

      {/* HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 text-center mb-10'
      >
        🛒 Your Shopping Cart
      </motion.h2>

      {/* EMPTY CART */}
      {cartData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center py-20 bg-white rounded-2xl shadow-md'
        >
          <ShoppingBasket className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <p className='text-gray-600 text-lg mb-6'>
            Your Cart is empty
          </p>

          <Link
            href={"/"}
            className='bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 inline-block'
          >
            Continue Shopping
          </Link>
        </motion.div>

      ) : (

        /* MAIN GRID */
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>

          {/* CART ITEMS */}
          <div className='lg:col-span-2 space-y-5'>

            <AnimatePresence>
              {cartData.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className='flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-md p-5 border'
                >

                  <div className='relative w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-gray-50'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className='object-contain p-3'
                    />
                  </div>

                  <div className='flex-1 sm:ml-4 text-center sm:text-left'>
                    <h3 className='font-semibold text-gray-800'>
                      {item.name}
                    </h3>

                    <p className='text-gray-500 text-sm'>
                      {item.unit}
                    </p>

                    <p className='text-green-700 font-bold'>
                      ₹ {Number(item.price) * item.quantity}
                    </p>
                  </div>

                  {/* QUANTITY */}
                  <div className='flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-full mt-3 sm:mt-0'>

                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className='bg-white p-1.5 rounded-full border'
                    >
                      <Minus size={14} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className='bg-white p-1.5 rounded-full border'
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* DELETE */}
                  <Trash2
                    size={18}
                    className='text-red-500 ml-4 cursor-pointer'
                    onClick={() => dispatch(removeFromCart(item._id))}
                  />

                </motion.div>
              ))}
            </AnimatePresence>

          </div>


          {/* ORDER SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className='bg-white rounded-2xl shadow-xl p-6 sticky top-24 flex flex-col self-start border'
          >

            <h2 className='text-xl font-bold mb-4'>
              Order Summary
            </h2>

            <div className='space-y-3'>

              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>₹ {subTotal}</span>
              </div>

              <div className='flex justify-between'>
                <span>Delivery Fee</span>
                <span>₹ {deliveryFee}</span>
              </div>

              <hr />

              <div className='flex justify-between font-bold text-lg'>
                <span>Total</span>
                <span>₹ {subTotal + deliveryFee}</span>
              </div>

            </div>

            {/* PUSH BUTTON DOWN */}
            <div className='grow' />

            {/* ✅ FIXED BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className='w-full mt-6 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition font-semibold shadow-md'
            >
              Proceed to Checkout
            </motion.button>

          </motion.div>

        </div>
      )}

    </div>
  )
}

export default CartPage