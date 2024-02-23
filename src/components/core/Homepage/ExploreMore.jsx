import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from '../Homepage/HighlightText'
import { MdSupervisorAccount } from 'react-icons/md'
import { TbBinaryTree2 } from 'react-icons/tb'
const tabsName = [
  'Free',
  'New to coding',
  'Most popular',
  'Skills paths',
  'Career paths',
]
const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0])
  const [courses, setCourses] = useState(HomePageExplore[0].courses)
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  )

  const setMyCards = (value) => {
    setCurrentTab(value)
    const result = HomePageExplore.filter((course) => course.tag === value)
    // setCourses(result[0].courses[0].heading)
    setCourses(result[0].courses)
    setCurrentCard(result[0].courses[0].heading)
  }

  // console.log(courses)
  const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
    console.log(cardData)
    console.log(currentCard)
    console.log(setCurrentCard)
    return (
      <div>
        <div
          className={`w-[280px] h-[180px] p-4 pb-2 ${
            currentCard === cardData.heading
              ? 'bg-white text-black shadow-[10px_10px_rgb(255,249,112)] duration-500'
              : 'bg-richblack-200 text-white'
          }
          flex flex-col justify-between
          `}
        >
          <h1 className='text-xl font-semibold'>{cardData.heading}</h1>
          <p
            className={`mt-3 text-[12px] font-semibold ${
              currentCard === cardData.heading
                ? 'text-richblack-300'
                : 'text-pure-greys-5'
            }`}
          >
            {cardData.description}
          </p>
          <div className='flex flex-row justify-between w-full bg-pure-gray-25'>
            <div className='flex flex-row items-center gap-2'>
              {/* <p>{cardData.lessionNumber}</p> */}
              <MdSupervisorAccount className='w-6 h-6' />
              <p>{cardData.level}</p>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <TbBinaryTree2 className='w-6 h-6' />
              <div className='flex flex-row gap-1'>
                <p>{cardData.lessionNumber}</p>
                <p>Lessons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className='text-4xl font-semibold'>
        Unlock the
        <HighlightText text={'Power of Code'} />
      </div>
      <p className='mt-3 text-[16px] font-semibold text-center text-richblack-300'>
        Learn to build anything you can imagine
      </p>
      <div className='flex flex-row gap-3 p-1 my-5 border rounded-full border-richblack-100 bg-richblack-800'>
        {tabsName.map((element, index) => {
          return (
            <div
              key={index}
              onClick={() => setMyCards(element)}
              className={`text-[16px] flex flex-row items-center gap-2 px-7 py-2 ${
                currentTab === element
                  ? 'bg-richblack-900 text-richblack-5'
                  : 'text-richblack-200'
              } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 `}
            >
              {element}
            </div>
          )
        })}
      </div>
      {/* course card group */}
      <div className='relative flex flex-row w-full gap-5 px-2 top-10 '>
        {courses.map((element, index) => {
          return (
            <CourseCard
              key={index}
              cardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ExploreMore
