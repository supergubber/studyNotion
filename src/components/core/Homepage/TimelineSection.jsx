import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimelineImage from '../../../assets/Images/TimelineImage.png'
const TimelineSection = () => {
  const timeLine = [
    {
      Logo: Logo1,
      heading: 'LeaderShip',
      Description: 'Fully committed to the success company',
    },
    {
      Logo: Logo2,
      heading: 'LeaderShip',
      Description: 'Fully committed to the success company',
    },
    {
      Logo: Logo3,
      heading: 'LeaderShip',
      Description: 'Fully committed to the success company',
    },
    {
      Logo: Logo4,
      heading: 'LeaderShip',
      Description: 'Fully committed to the success company',
    },
  ]
  return (
    <div>
      <div className='flex flex-row items-start gap-15'>
        <div className='w-[45%] flex flex-col'>
          {timeLine.map((element, index) => (
            <>
              <div className='flex flex-row gap-6' key={index}>
                <div className='w-[50px] h-[50px] bg-white rounded-full flex flex-row justify-center items-center'>
                  <img src={element.Logo} alt='' />
                </div>
                <div>
                  <h2 className='font-semibold text-[18px]'>
                    {element.heading}
                  </h2>
                  <p className='text-base'>{element.Description}</p>
                </div>
              </div>
              {index === 3 ? null : (
                <div className='w-6 h-10 bg-green-200 border-r-2 border-dashed border-pure-greys-200'></div>
              )}
            </>
          ))}
        </div>
        <div className='relative w-[45%] shadow-blue-200'>
          <img
            src={TimelineImage}
            alt=''
            className='object-cover shadow-2xl shadow-white h-fit'
          />
          <div className='absolute flex flex-row py-7 text-white uppercase bg-caribbeangreen-700 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex flex-row items-center gap-5 border-r border-caribbeangreen-300 px-7'>
              <p className='text-3xl font-bold text-white'>10</p>
              <p className='text-sm text-caribbeangreen-300'>
                Years of Experience
              </p>
            </div>
            <div className='flex items-center gap-5 px-7'>
              <p className='text-3xl font-bold'>250</p>
              <p className='text-sm text-caribbeangreen-300'>Type of Course</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
