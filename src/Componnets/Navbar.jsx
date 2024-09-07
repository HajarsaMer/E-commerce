import React, { useContext, useState } from 'react'
import logo from '../assets/finalProject assets/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../Context/AuthContext'
import { useQueryCart } from '../hoooks/useQueryCart'
import { getCartApi } from '../APIS/cartApis'
import { useQueryWish } from '../hoooks/useQueryWishlist'
import { getwishlistApi } from '../APIS/wishlistApi'

export default function Navbar() {


  let { data } = useQueryCart('cart', getCartApi)
  let { data:wishdata  } = useQueryWish('wishlist',  getwishlistApi)
  let navigate = useNavigate()
  let { setLogin, isLogin } = useContext(auth)
  let [open, setOpen] = useState(false)

  function toggle() {
    setOpen(!open)
  }


  function logout()
  {
    localStorage.removeItem('userToken')
    setLogin(null)
    navigate('/login') 
  }


  return (
    <nav className='py-4 bg-main-light'>
      <div className="container md:flex justify-between items-center relative">
        <div className='md:flex gap-2'>
          <img src={logo} width={130} alt="" />
          {isLogin ? <ul className={`md:flex gap-4 ${open ? 'block' : 'hidden'}`}>
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/products'}>Products</NavLink>
            </li>
           
            <li>
              <NavLink to={'/brand'}>Brand</NavLink>
            </li>
          </ul> : ''}

        </div>

        <div>
          <ul className={`md:flex gap-2 ${open ? 'block' : 'hidden'} gap-5`}>

            {isLogin ?
             <>
              <li className='cursor-pointer' onClick={logout}>logOut  {isLogin?<b className='text-green-700'>Hi {isLogin.name.toUpperCase()}</b>:''} </li>
              <li className='relative' >
              <NavLink to={'/cart'}>
              <i className='fas fa-cart-shopping'></i><span className='absolute bottom-3 left-3 w-[20px] h-[20px] rounded-full bg-green-700 text-white flex justify-center items-center'>{data?.numOfCartItems?data?.numOfCartItems:0}</span> 
              </NavLink>
            </li>
              <li className='relative' >
              <NavLink to={'/wishlist'}>
              <i class="fa-solid fa-cart-plus"></i>
            <span className='absolute bottom-3 left-3 w-[20px] h-[20px] rounded-full bg-green-700 text-white flex justify-center items-center'>{wishdata?.data?wishdata?.data?.length:0}</span> 
              </NavLink>
            </li>
             </>
              :
              <>
                <li><NavLink to={'/login'}>Login</NavLink></li>
                <li><NavLink to={'/register'}>Register</NavLink></li>
                <li className='flex gap-4'>
                  <a href=""><i className='fab fa-facebook-f'></i></a>
                  <a href=""><i className='fab fa-twitter'></i></a>
                  <a href=""><i className='fab fa-google'></i></a>
                  <a href=""><i className='fab fa-instagram'></i></a>
                </li>
              </>
            }
          </ul>
        </div>
        <i onClick={toggle} className={`md:hidden block  ${!open ? 'fa-bars' : 'fa-close'}  fas  fa-2x absolute top-0 right-2 cursor-pointer`}></i>
      </div>
    </nav>
  )
}
