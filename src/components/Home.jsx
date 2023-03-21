import React from 'react'
import {HiArrowNarrowRight} from 'react-icons/hi'

const Home = () => {
  return (
	<div name='home' className='h-screen w-full bg-[#191825]'>
		<div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center items-center text-center h-full'>
			<p className='text-l  sm:text-xl text-[#30E3CA]'>Hi! my name is</p>
			<h1 className='text-4xl sm:text-7xl my-1 font-bold text-[#ccd6f6]'>Ignacio Navarro</h1>
			<h2 className='text-4xl sm:text-7xl my-1 font-bold text-[#8892b0]'>I'm a Frontend Developer.</h2>
			<button className='text-[#ccd6f6] group border-2 px-6 py-3 my-4 flex items-center hover:bg-[#30E3CA] hover:border-[#30E3CA] hover:text-[#191825]'>View work 
				<span className='group-hover:rotate-90 duration-300'>
					<HiArrowNarrowRight className='ml-3'/>
				</span>
			</button>
		</div>
	</div>
  )
}

export default Home