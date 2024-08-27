import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import { CartContext } from '../Context/CartContext'
import { WishListContext } from '../Context/WishListContext'
import logo from '../../assets/images/freshcart-logo.svg'

export default function Navbar() {
  let [isMenuOpen, setIsMenuOpen] = useState(false)
  let { cart , getCart } = useContext(CartContext)
  let { wishlist } = useContext(WishListContext)
  let navigate = useNavigate()
  let { userData, setUserData } = useContext(UserContext)

  let [wishlistCount, setWishListCount] = useState(Number(localStorage.getItem('wishlistCount')) || 0)
  let [numOfCartItems, setNumOfCartItems] = useState(Number(localStorage.getItem('cartnumOfCartItems')) || 0);

  useEffect(() => {
    if (wishlist && wishlist.count !== undefined) {
      setWishListCount(wishlist.count)
      localStorage.setItem('wishlistCount', wishlist.count)
    }
  }, [wishlist])

  useEffect(() => {
    if (cart && cart.numOfCartItems  !== undefined) {
      setNumOfCartItems( cart .numOfCartItems);
      localStorage.setItem('cartnumOfCartItems', cart .numOfCartItems);
    }
  }, [cart]);

  let toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  function logout() {
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/login')
  }

 


  return <>
  <nav className='bg-gray-200 md:fixed top-0 inset-x-0 py-2 p-14 z-30 text-center capitalize'>
      <div className='container flex flex-col md:flex-row justify-between items-center text-gray-500 mt-3'>
        <div className='flex flex-col md:flex-row space-x-3 items-center'>
          <img src={logo} width={120} alt="" />
          <button type='button' className='text-white md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2' aria-controls='navbarSupportedContent' aria-expanded={isMenuOpen ? 'true' : 'false'} aria-label='Toggle navigation' onClick={toggleMenu}>
            <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
          {userData && (
            <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto hover:text-green-600`} id='navbarSupportedContent'>
              <ul className='flex flex-col md:flex-row space-x-2'>
                <li><NavLink className={'hover:text-green-600'} to=''>Home</NavLink></li>
                <li><NavLink className={'hover:text-green-600'} to='products'>Products</NavLink></li>
                <li><NavLink className={'hover:text-green-600'} to='categories'>Categories</NavLink></li>
                <li><NavLink className={'hover:text-green-600'} to='brands'>Brands</NavLink></li>
              </ul>
            </div>
          )}
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id='navbarSupportedContent'>
          <ul className='flex flex-col md:flex-row space-x-2 items-center'>
            {userData ? (
              <>
                <li className='relative'>
                  <NavLink to='wishlist'>
                    <i className='fa-solid fa-heart text-gray-600 text-3xl pr-4 hover:text-green-600'></i>
                  </NavLink>
                  <span className='text-white absolute top-[-10px] right-[-0px] bg-main rounded-md w-6 h-6 flex items-center justify-center text-xs font-bold'>
                    {wishlistCount}
                  </span>
                </li>
                <li className='relative'>
                  <NavLink to='cart'>
                    <i className='fa-solid fa-cart-shopping text-gray-600 text-3xl pr-4 hover:text-green-600'></i>
                  </NavLink>
                  <span className='text-white absolute top-[-10px] right-[-0px] bg-main rounded-md w-6 h-6 flex items-center justify-center text-xs font-bold'>
                    {numOfCartItems}
                  </span>
                </li>
                <li onClick={logout}>
                  <span className='cursor-pointer hover:text-green-600'>Logout</span>
                </li>
              </>
            ) : (
              <>
                <li><NavLink className={'hover:text-green-600'} to='login'>Login</NavLink></li>
                <li><NavLink className={'hover:text-green-600'} to='register'>Register</NavLink></li>
              </>
            )}
            <li className='space-x-2 text-black'>
              <i className='fab fa-facebook-f'></i>
              <i className='fab fa-linkedin-in'></i>
              <i className='fab fa-youtube'></i>
              <i className='fab fa-twitter'></i>
              <i className='fab fa-instagram'></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
  
  
  </>
    
}
