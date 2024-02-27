import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

import { categories } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
const Navbar = () => {
  const subLinks = [
    {
      title: 'Python',
      links: '/catalog/python',
    },
    {
      title: 'javascript',
      links: '/catalog/javascript',
    },
  ]
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  // const [subLinks, setSubLinks] = useState([])
  const location = useLocation()
  // const fetchData = async () => {
  //   try {
  //     const result = await apiConnector('GET', categories.CATEGORIES_API)
  //     console.log('printing SubLinks result : ', result)
  //     setSubLinks(result.data.data)
  //   } catch (error) {
  //     console.log('Could not fetch the category list')
  //   }
  // }
  // useEffect(() => {
  //   fetchData()
  // }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }
  return (
    <div className='flex items-center justify-center border-b-[1px] h-14 border-b-richblack-700'>
      <div className='flex flex-row items-center justify-between w-11/12 max-w-maxContent'>
        {/* Images */}
        <Link to={'/'}>
          <img src={Logo} alt='Logo' width={160} height={42} loading={'lazy'} />
        </Link>
        {/* Data Nav Link */}
        <nav>
          <ul className='flex flex-row items-center gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === 'Catalog' ? (
                  <div className='relative flex flex-row items-center gap-2 cursor-pointer group'>
                    <p>{link.title}</p>
                    <MdOutlineKeyboardArrowDown className='w-5 h-5' />
                    <div className='invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'></div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? 'text-yellow-25'
                          : 'text-richblack-25'
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login/SignUp/Dashboard */}
        <div className='flex items-center gap-x-4'>
          {user && user?.accountType !== 'Instructor' && (
            <Link to={'/dashboard/cart'} className='relative'>
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link
              to={'/login'}
              className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'
            >
              Log in
            </Link>
          )}
          {token === null && (
            <Link
              to='/signup'
              className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'
            >
              Sign Up
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
