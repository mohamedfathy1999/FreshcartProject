import React, { useState } from 'react'
import style from './Loading.module.css'
import { CirclesWithBar } from 'react-loader-spinner'

export default function Loading() {



    
  return <>
    
    <CirclesWithBar
  height="150"
  width="150"
  color="#4fa94d"
  outerCircleColor="#4fa94d"
  innerCircleColor="#4fa94d"
  barColor="#4fa94d"
  ariaLabel="circles-with-bar-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
  
  </>
}
