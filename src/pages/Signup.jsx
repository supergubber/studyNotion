import React, { useState } from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import JsonFormat from '../data/countrycode.json'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
const Signup = () => {
  const instructor = ['Student', 'Instructors']
  const [indexName, setIndexName] = useState(0)
  const [data, setData] = useState('')
  const [selectedValue, setSelectedValue] = useState('')

  const [createIcon, setCreateIcon] = useState(true)
  const [createText, setCreateText] = useState('password')
  const [ConfirmIcon, SetConfirmIcon] = useState(true)
  const [ConfirmText, setConfirmText] = useState('password')
  const [getAllData, setGetAllData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    code: '',
    phone: '',
    createpassword: '',
    confirmpassword: '',
  })
  const [seeAllData, setSeeAllData] = useState([])

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

  const createToggle = (value) => {
    if (value === true) {
      setCreateIcon(value)
      setCreateText('password')
    } else {
      setCreateIcon(value)
      setCreateText('text')
    }
  }
  const confirmToggle = (value) => {
    if (value === true) {
      SetConfirmIcon(value)
      setConfirmText('password')
    } else {
      SetConfirmIcon(value)
      setConfirmText('text')
    }
  }

  const InputData = (e) => {
    let name = e.target.name
    let value = e.target.value
    return setGetAllData((olData) => ({ ...olData, [name]: value }))
  }
  const SubmitData = (e) => {
    e.preventDefault()
    setSeeAllData((oldData) => [...oldData, getAllData])
  }
  console.log(seeAllData)
  return (
    <div>
      <div className='flex flex-col items-center justify-between mx-auto bg-white width-11/12 max-w-maxContent'>
        <div className='flex flex-row w-[100%] p-4'>
          <div className='w-[50%] bg-richblack-900 p-4 flex flex-col justify-center gap-8'>
            <div>
              <p className='text-4xl font-semibold text-richblack-5'>
                Join the millions learning to code with StudyNotion for free
              </p>
              <p className='text-lg text-richblack-100'>
                Build skills for today, tomorrow, and beyond.{' '}
                <HighlightText
                  text={'Education to future-proof your career.'}
                />
              </p>
            </div>
            <div className='flex flex-col items-start justify-center '>
              <div className='flex flex-row gap-1 p-2 rounded-full bg-richblack-800'>
                {instructor.map((element, index) => {
                  return <AccountType key={index} data={element} ind={index} />
                })}
              </div>
            </div>
            <form
              className='flex flex-col justify-between text-white'
              onSubmit={SubmitData}
            >
              <div className='flex flex-row items-center justify-center w-full gap-3'>
                <div className='flex flex-col w-full'>
                  <label htmlFor='fname'>
                    firstName<span className='text-pink-200'>*</span>
                  </label>
                  <input
                    type='text'
                    id='fname'
                    name='firstname'
                    placeholder='Enter a FirstName'
                    value={getAllData.firstname}
                    onChange={InputData}
                    className='text-black'
                  />
                </div>
                <div className='flex flex-col w-full'>
                  <label htmlFor='lname'>
                    LastName<span className='text-pink-200'>*</span>
                  </label>
                  <input
                    type='text'
                    id='lname'
                    name='lastname'
                    placeholder='Enter a LastName'
                    value={getAllData.lastname}
                    onChange={InputData}
                    className='text-black'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='Email'>
                  Email Address<span className='text-pink-200'>*</span>
                </label>
                <input
                  type='email'
                  id='Email'
                  name='email'
                  placeholder='Enter a Email Address'
                  value={getAllData.email}
                  onChange={InputData}
                />
              </div>
              <div>
                <div>
                  <label htmlFor='code'>
                    Phone Number<span className='text-pink-200'>*</span>
                  </label>
                  <div>
                    <select
                      id='code'
                      className='text-black'
                      name='code'
                      value={getAllData.code}
                      onChange={InputData}
                    >
                      {JsonFormat.map((element, index) => {
                        return (
                          <option value={element.code} key={index}>
                            {element.code}
                          </option>
                        )
                      })}
                    </select>
                    <input
                      id='code'
                      name='phone'
                      placeholder='0123456789'
                      onChange={InputData}
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-row items-center justify-between w-full'>
                <div className='text-black'>
                  <label>
                    Create Password <span className='text-pink-200'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      type={createText}
                      name='createpassword'
                      placeholder='Enter a Password'
                      value={getAllData.createpassword}
                      onChange={InputData}
                    />
                    <div className='absolute top-0 right-0'>
                      {createIcon ? (
                        <FaRegEye onClick={() => createToggle(!createIcon)} />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() => createToggle(!createIcon)}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className='text-black'>
                  <label>
                    Confirm Password <span className='text-pink-200'>*</span>
                  </label>
                  <div className='relative'>
                    <input
                      type={ConfirmText}
                      placeholder='Enter a Password'
                      name='confirmpassword'
                      value={getAllData.confirmpassword}
                      onChange={InputData}
                    />
                    <div className='absolute top-0 right-0'>
                      {createIcon ? (
                        <FaRegEye onClick={() => confirmToggle(!ConfirmIcon)} />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() => confirmToggle(!ConfirmIcon)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className='text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black'
                type='submit'
              >
                Create an account
              </button>
            </form>
          </div>
          <div className='w-[65%] bg-yellow-5 p-4'></div>
        </div>
      </div>
    </div>
  )
}

export default Signup
