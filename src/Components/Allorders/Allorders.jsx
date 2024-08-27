import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import { Helmet } from 'react-helmet'

export default function Allorders() {
  let { clearCart } = useContext(CartContext)
  let navigate = useNavigate()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  let handleGoHome = () => {
    navigate('/')
  }

  return  <>
      <Helmet>
        <title>Allorders</title>
      </Helmet>

      <div className="text-center mb-6">
        <h1 className="text-6xl font-bold text-main my-14">All Orders</h1>


        <div className="flex justify-center space-x-6 mb-8">
          <div className="text-4xl text-gray-700 hover:text-green-600 cursor-pointer">
            <i className="fas fa-box"></i>
            <p className="mt-2 text-sm">Orders</p>
          </div>
          <div className="text-4xl text-gray-700 hover:text-green-600 cursor-pointer">
            <i className="fas fa-check-circle"></i>
            <p className="mt-2 text-sm">Completed</p>
          </div>
          <div className="text-4xl text-gray-700 hover:text-green-600 cursor-pointer">
            <i className="fas fa-exclamation-circle"></i>
            <p className="mt-2 text-sm">Pending</p>
          </div>
        </div>


        <div className="text-center mt-6">
          <button
            onClick={handleGoHome}
            className="text-white bg-emerald-500 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            <i className="fas fa-home mr-2"></i>
            Go to Home
          </button>
        </div>
      </div>
    </>
  
}
