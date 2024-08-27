import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { Helmet } from 'react-helmet';


export default function Login() { 

  

  let [apiError, setApiError] = useState(null);
  let [loading, setLoading] = useState(false)
  
let {setUserData} = useContext(UserContext)

  let navigate = useNavigate()

  async function Login(values) {
    try {

      setLoading(true)

      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      localStorage.setItem('userToken', data.token)
      navigate('/')
      setUserData(data.token)

      setLoading(false)

    } catch (err) {

      setApiError(err.response.data.message)
      setLoading(false)
    }


  }

  let validationSchema = yup.object().shape({
    email: yup.string().email('email invalid').required('email is required'),
    password: yup.string().matches(/^[A-Z]\w{5,10}$/, 'password invalid ex(Mohamed123)').required('password is required'),
 
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema
    , onSubmit: Login


  })


    
  return <>


  <Helmet>
        <title>login</title>
      </Helmet>
     
  
    <div className='pt-8 w-1/2 mx-auto pb-8'>
    <h1 className="text-4xl font-bold text-center text-main mb-6">Login Now:</h1>

      <form onSubmit={formik.handleSubmit} className="">

        {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div>}



        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" id="email"  value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
        </div>
        {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>}

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" id="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your password:</label>
        </div>
        {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
        </div>}
        <div>
        <Link className='' to="/forget-password">Forgot Password?</Link>
        </div>
       
       
        {loading ? <button type="button" className="text-white bg-emerald-700 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg--emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-400">
          <i className='fas fa-spinner fa-spin-pulse'></i>
        </button> : <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg--emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-400 my-3">Submit</button>}




      </form>
    </div>

  

  
  </>
}
