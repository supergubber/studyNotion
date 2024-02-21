import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from '../../../components/core/Homepage/Button'
const LearningLanguageSection = () => {
  return (
    <div className='mt-[120px] mb-[150px]'>
      <div className='flex flex-col items-center gap-5'>
        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for
          <HighlightText text={'Learning any language'} />
        </div>
        <div className='mx-auto mt-2 text-base font-medium text-center text-richblack-600 w-[70%]'>
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5'>
          <img
            src={Know_your_progress}
            alt='Know_your_progress'
            className='object-contain -mr-[105px] -mt-7'
          />
          <img
            src={compare_with_others}
            alt='compare_with_others'
            className='object-contain'
          />
          <img
            src={plan_your_lesson}
            alt='plan_your_lesson'
            className='object-contain -ml-[140px]'
          />
        </div>
        <div className='w-fit'>
          <CTAButton active={true} linkto={'/signup'}>
            <div>Learn more</div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
