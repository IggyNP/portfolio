import React from 'react'

const About = () => {
  return (
	<div name='about' className='w-full h-screen bg-[#191825] text-[#ccd6f6]'>
		<div className='flex flex-col items-center justify-center w-full h-full'>
			<div className='sm:text-right pb-8'>
				<h1 className='text-4xl font-bold inline border-b-4 border-[#30E3CA]'>About</h1>
			</div>
			<div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
				<div className='sm:text-right text-3xl font-bold'>
             		<p>Experienced Business Professional Turned Frontend Developer.</p>
            	</div>
            	<div>
             		<p>After completing my MBA in International Management, I discovered my passion for technology and began self-learning programming a year ago. Since then, I have honed my skills in HTML, CSS, JavaScript, and React, and have completed several personal projects to apply my knowledge. My experience in business and digital marketing gives me a unique perspective on user experience and allows me to create visually appealing and effective websites.</p>  
            	</div>
			</div>
		</div>
	</div>
  )
}

export default About