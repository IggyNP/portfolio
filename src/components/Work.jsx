import React from 'react'

const Work = () => {
  return (
	<div className='w-full md:h-screen bg-[#191825] text-[#ccd6f6]'>
		<div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center text-center w-full h-full'>
			<div>
				<h1 className='text-4xl font-bold inline border-b-4 border-[#30E3CA]'>Work</h1>
				<p className='pt-8'>Check out some of my recent work</p>
			</div>
			<div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
				<div className='shadow-lg shadow-[#040C16] group container rounded-md flex justify-center items-center mx-auto content-div'>
					<div>
						<span>

						</span>
						<div>
							<a href='/'>
								<button></button>
							</a>
							<a href='/'>
								<button></button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Work