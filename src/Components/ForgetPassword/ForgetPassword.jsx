import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function ForgetPassword() {
 let [errmsg, setErrmsg] = useState('')
 let [formStatus, setFormStatus] = useState(true)
 let [loading, setLoading] = useState(false)
 let navigate = useNavigate()

 let validationSchema = Yup.object({
    email: Yup.string().required('Email Required').email('Enter Valid Email'),
  })

 let validationSchema2 = Yup.object({
    resetCode: Yup.string()
      .required('Reset Code Required')
      .matches(/^[0-9]{5,6}$/, 'Enter Valid Code'),
  })

 let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
       let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
        if (response.data.statusMsg === 'success') {
          setFormStatus(false)
          setLoading(false)
        } else {
          setErrmsg('Failed to send reset link')
        }
      } catch (err) {
        setErrmsg(err.response?.data?.message || 'An error occurred')
        setLoading(false)
      }
    },
  })

 let formik2 = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema: validationSchema2,
    onSubmit: async (values) => {
      try {
        setLoading(true)
       let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
        if (response.data.status === 'Success') 
          {
          navigate('/ResetPassword') 
          setLoading(false)
        } else {
          setErrmsg('Verification failed')
        
        }
      } catch (err) {
        setErrmsg(err.response?.data?.message || 'An error occurred')
        setLoading(false)
      }
    },
  })
  

  return <>
  
    <Helmet>
      <title>ForgetPassword</title>
    </Helmet>
      <h1 className="text-5xl text-center text-main my-4">Forget Password</h1>
      <div className="pt-8 w-1/2 mx-auto pb-8">
        {errmsg && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errmsg}
          </div>
        )}

        {formStatus ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input type="email" name="email" id="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.email}
              </div>
            )}
            {loading ? <button type="button" className="text-white bg-emerald-700 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg--emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-400">
          <i className='fas fa-spinner fa-spin-pulse'></i>
        </button> : <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg--emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-400">Send</button>}

          </form>
        ) : (
          <form onSubmit={formik2.handleSubmit}>

              <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="resetCode" id="resetCode"  value={formik2.values.resetCode} onBlur={formik2.handleBlur} onChange={formik2.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
                <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Code</label>
              </div>
            {formik2.errors.resetCode && formik2.touched.resetCode && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik2.errors.resetCode}
              </div>
            )}
              
        {loading ? <button type="button" className="text-white bg-emerald-700 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg--emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-400">
          <i className='fas fa-spinner fa-spin-pulse'></i>
        </button> : <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg--emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-400">Verify Code</button>}

          </form>

        )}
      </div>

  
    </>
  
}
