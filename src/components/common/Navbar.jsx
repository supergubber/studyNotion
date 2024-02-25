import React, { lazy } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
const Navbar = () => {
  const location = useLocation()
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
          <ul className='flex flex-row items-center gap-8 text-richblack-25'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === 'Catalog' ? (
                  <div></div>
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
      </div>
    </div>
  )
}

export default Navbar
