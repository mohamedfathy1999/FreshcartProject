import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Products from './Components/Products/Products.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import UserContextProvider from './Components/Context/UserContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import { Toaster } from 'react-hot-toast'
import CartContextProvider from './Components/Context/CartContext.jsx'
import Checkout from './Components/Checkout/Checkout.jsx'
import Allorders from './Components/Allorders/Allorders.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishList from './Components/WishList/WishList.jsx'
import WishListContextprovider from './Components/Context/WishListContext.jsx'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx'
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'



let routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'forget-password', element: <ForgetPassword /> },
      { path: 'ResetPassword', element: <ResetPassword /> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ]
  }
])



let query = new QueryClient

function App() {

  return <CartContextProvider>
    <QueryClientProvider client={query}>
      <WishListContextprovider>
        <ReactQueryDevtools />
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster />
        </UserContextProvider>
      </WishListContextprovider>
    </QueryClientProvider>
  </CartContextProvider>


}

export default App
