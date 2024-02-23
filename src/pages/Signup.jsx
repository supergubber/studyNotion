import React, { useState } from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'

const Signup = () => {
  const instructor = ['Student', 'Instructors']
  const [indexName, setIndexName] = useState(0)
  const [data, setData] = useState('')
  const getData = (data, ind) => {
    setData(data)
    return setIndexName(ind)
  }
  const AccountType = ({ data, ind }) => {
    return (
      <>
        <div
          className={`px-6 py-2 rounded-full ${
            ind === indexName
              ? ' bg-richblack-900 cursor-pointer'
              : 'bg-richblack-800 cursor-pointer'
          } text-richblack-5 `}
          onClick={() => getData(data, ind)}
        >
          <p>{data}</p>
        </div>
      </>
    )
  }
  return (
    <div>
      <div className='flex flex-col items-center justify-between mx-auto bg-white width-11/12 max-w-maxContent'>
        <div className='flex flex-row w-[100%] p-4'>
          <div className='w-[50%] bg-richblack-900 p-4 flex flex-col justify-center gap-3'>
            <p className='text-3xl font-semibold text-richblack-5'>
              Welcome Back
            </p>
            <p className='text-xl text-richblack-100'>
              Build skills for today, tomorrow, and beyond.{' '}
              <HighlightText text={'Education to future-proof your career.'} />
            </p>
            <div className='flex flex-col items-start justify-center '>
              <div className='flex flex-row gap-1 p-2 rounded-full bg-richblack-800'>
                {instructor.map((element, index) => {
                  return <AccountType key={index} data={element} ind={index} />
                })}
              </div>
            </div>
            <form className='flex flex-col justify-between '>
              <div className='flex flex-row items-center justify-center w-full gap-3'>
                <div className='flex flex-col w-full'>
                  <label for='fname'>
                    firstname<span>*</span>
                  </label>
                  <input type='text' id='fname' name='fname' />
                </div>
                <div className='flex flex-col w-full'>
                  <label for='lname'>
                    Lastname<span>*</span>
                  </label>
                  <input type='text' id='lname' name='lname' />
                </div>
              </div>
            </form>
          </div>
          <div className='w-[50%] bg-yellow-5 p-4'></div>
        </div>
      </div>
    </div>
  )
}

export default Signup
