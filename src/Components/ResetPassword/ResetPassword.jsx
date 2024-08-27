import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function ResetPassword() {
 let [loading, setLoading] = useState(false)
 let nav = useNavigate()
 let validationSchema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    newPassword: yup.string()
      .matches(/^[A-Z]\w{5,10}$/, 'Password must start with an uppercase letter and be between 6 and 11 characters long')
      .required('New password is required'),
  })

 let form = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        console.log('Submitting:', values);  
       let response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
        console.log('Response:', response);  
        if(response.data.token){
          nav('/login')
          setLoading(false)
        }
        
      
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        setLoading(false)
      }
    },
  })

  return  <>
    <Helmet>
      <title>ResetPassword</title>
    </Helmet>
      <h1 className="text-4xl font-bold text-center text-main mt-10">Reset Password:</h1>
      <div className='pt-8 w-1/2 mx-auto pb-8'>
        <form onSubmit={form.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input type="email" name="email" id="email"  value={form.values.email} onBlur={form.handleBlur} onChange={form.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
          </div>
          {form.errors.email && form.touched.email && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {form.errors.email}
            </div>
          )}
          <div className="relative z-0 w-full mb-5 group">
             <input type="password" name="newPassword" id="newPassword"  value={form.values.newPassword} onBlur={form.handleBlur} onChange={form.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
            <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Password</label>
        
          </div>
          {form.errors.newPassword && form.touched.newPassword && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {form.errors.newPassword}
            </div>
          )}
            {loading ? <button type="button" className="text-white bg-emerald-700 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg--emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-400">
          <i className='fas fa-spinner fa-spin-pulse'></i>
        </button> : <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg--emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-400">Update Password</button>}

        </form>
      </div>

   
   
    </>
  
}
