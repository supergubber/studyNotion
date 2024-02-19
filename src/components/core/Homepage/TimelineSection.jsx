import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
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
        <div className='w-[45%] flex flex-col gap-5'>
          {timeLine.map((element, index) => (
            <div className='flex flex-row gap-6' key={index}>
              <div className='w-[50px] h-[50px] bg-white flex items-center'>
                <img src={element.Logo} />
              </div>
              <div>
                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                <p className='text-base'>{element.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
