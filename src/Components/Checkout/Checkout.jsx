import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../Context/CartContext';
import { Helmet } from 'react-helmet';



export default function Checkout() {



  let { checkout } = useContext(CartContext);
  let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    onSubmit: checkout

  })



  return <>

    <Helmet>
      <title>checkout</title>
    </Helmet>
    <div className='pt-8 w-1/2 mx-auto pb-8'>
      <h1 className="text-4xl font-bold text-center text-main mb-6 ">Checkout Now:</h1>
      <form onSubmit={formik.handleSubmit} className="">
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="details" id="details" value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="city" id="city" value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city:</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="tel" name="phone" id="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone:</label>
        </div>
        <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg--emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-400">CheckOut</button>
      </form>
    </div>




  </>
}
