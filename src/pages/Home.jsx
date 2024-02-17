import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      {/* section1 */}
      {/* <div className='w-screen h-screen bg-black'>
        <h1 className='text-white'>welcome to homepage</h1>
      </div> */}
      <div className='relative flex flex-col items-center justify-between w-11/12 mx-auto text-white group'>
        <Link to={'/signup'}>
          <div className='w-full p-1 mx-auto mt-16 font-bold transition-all duration-200 rounded-full hover:scale-95 bg-richblack-800 text-righblack-200'>
            <div className='flex flex-row items-center gap-2 px-10 py-[5px] rounded-full group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
      </div>
      {/* section2 */}
      {/* section3 */}
      {/* footer */}
    </div>
  )
}

export default Home
