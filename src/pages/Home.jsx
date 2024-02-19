import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAButton from '../components/core/Homepage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection'
import TimelineSection from '../components/core/Homepage/TimelineSection'
const Home = () => {
  return (
    <div>
      {/* section1 */}
      <div className='relative flex flex-col items-center justify-between w-11/12 mx-auto text-white group max-w-maxContent'>
        <Link to={'/signup'}>
          <div className='w-full p-1 mx-auto mt-16 font-bold transition-all duration-200 rounded-full hover:scale-95 bg-richblack-800 text-righblack-200'>
            <div className='flex flex-row items-center gap-2 px-10 py-[5px] rounded-full group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className='text-4xl font-semibold text-center mt-7'>
          Empower Your Future with
          <HighlightText text={'Coding Skill'} />
        </div>
        <div className='mt-7 w-[70%] text-center ext-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructor
        </div>
        <div className='flex flex-row mt-8 gap-7'>
          <CTAButton active={true} linkto={'/signup'}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={'/login'}>
            Book a Demo
          </CTAButton>
        </div>
        <div className='mx-3 my-7 shadow-blue-200 w-[70%]'>
          <video muted loop autoPlay className='h-[515px]'>
            <source src={Banner} type='video/mp4' />
          </video>
        </div>
        {/* Code Section 1 */}
        <div className='w-[70%]'>
          <CodeBlocks
            position={'lg:flex-row'}
            heading={
              <div className='text-2xl font-semibold'>
                Unlock Your
                <HighlightText text={'coding potential'} />
                with out online courses
              </div>
            }
            subheading={
              'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
            }
            ctabtn1={{
              btnText: 'try it yourself',
              linkto: '/signup',
              active: true,
            }}
            ctabtn2={{
              btnText: 'Learn more',
              linkto: '/login',
              active: false,
            }}
            codeblock={` <!DOCTYPE html>
                <html>
                <head>
                <title>
                homepage
                </title>
                <link rel="stylesheet" href="style.css"/>
                </head>
                <body>
                  <h1><a href="/"></a></h1>
                  <nav>                    
                    <a href="/one>One</a>
                    <a href="/two">Two</a>
                    <a href="/three">Three</a>
                  </nav>
                </body>
                </html>
              `}
            codeColor={'text-yellow-25'}
          />
        </div>
        {/* code section 2 */}
        <div className='w-[70%]'>
          <CodeBlocks
            position={'lg:flex-row-reverse'}
            heading={
              <div className='text-2xl font-semibold'>
                Start
                <HighlightText text={'Coding in Seconds'} />
              </div>
            }
            subheading={
              'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
            }
            ctabtn1={{
              btnText: 'try it yourself',
              linkto: '/signup',
              active: true,
            }}
            ctabtn2={{
              btnText: 'Learn more',
              linkto: '/login',
              active: false,
            }}
            codeblock={` <!DOCTYPE html>
                <html>
                <head>
                <title>
                homepage
                </title>
                <link rel="stylesheet" href="style.css"/>
                </head>
                <body>
                  <h1><a href="/"></a></h1>
                  <nav>                    
                    <a href="/one>One</a>
                    <a href="/two">Two</a>
                    <a href="/three">Three</a>
                  </nav>
                </body>
                </html>
              `}
            codeColor={'text-yellow-25'}
          />
        </div>
      </div>
      {/* section2 */}
      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[310px]'>
          <div className='flex flex-col items-center justify-between w-11/12 gap-5 mx-auto max-w-maxContent'>
            <div className='h-[150px] w-full'></div>
            <div className='flex flex-row items-center justify-center'>
              <CTAButton active={true} linkto={'/signup'}>
                <div className='flex items-center gap-2'>
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={'/login'}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between w-11/12 mx-auto max-w-maxContent'>
          <div className='flex flex-row gap-4 mb-10 mt-[95px]'>
            <div className='text-4xl font-semibold w-[45%]'>
              Get the Skills you need for{' '}
              <HighlightText text={'job that is in demand'} />
            </div>
            <div className='flex flex-col gap-10 w-[40%] items-start'>
              <div className='text-[16px]'>
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={'/signup'}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>
      {/* section3 */}
      {/* footer */}
    </div>
  )
}

export default Home
