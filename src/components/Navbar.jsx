import React, {useState} from 'react'
import {FaBars, FaTimes, FaLinkedin, FaGithub} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
import {BsFillPersonLinesFill} from 'react-icons/bs'
import Logo from '../assets/inp.jpeg'

const Navbar = () => {

	const [nav, setNav] = useState(false);
	const handleClick = () => setNav(!nav);

  return (
	<div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#191825] text-gray-300'>
		<div>
			<img src={Logo} alt="Logo" style={{width: '50px'}} />
		</div>

		{/* menu */}

		<ul className='hidden md:flex'>
			<li>Home</li>
			<li>About</li>
			<li>Skills</li>
			<li>Work</li>
			<li>Contact</li>
		</ul>

		{/* hamburger */}

		<div onClick={handleClick} className='md:hidden z-10'>
			{!nav ? <FaBars /> : <FaTimes />}
		</div>

		{/* mobile menu */}

		<ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#191825] flex flex-col justify-center items-center'}>
			<li className='py-6 text-4xl'>Home</li>
			<li className='py-6 text-4xl'>About</li>
			<li className='py-6 text-4xl'>Skills</li>
			<li className='py-6 text-4xl'>Work</li>
			<li className='py-6 text-4xl'>Contact</li>
		</ul>

		{/* social icons */}

		<div className='hidden lg:flex fixed flex-col top-[35%] left-0'>
			<ul>
				<li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#00A0DC]'>
					<a className='flex justify-between items-center w-full text-gray-300' href="/">
						Linkedin <FaLinkedin size={30}/>
					</a>
				</li>
				<li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#313335]'>
					<a className='flex justify-between items-center w-full text-gray-300' href="/">
						Github <FaGithub size={30}/>
					</a>
				</li>
				<li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#DD5143]'>
					<a className='flex justify-between items-center w-full text-gray-300' href="/">
						Email <HiOutlineMail size={30}/>
					</a>
				</li>
				<li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#E68523]'>
					<a className='flex justify-between items-center w-full text-gray-300' href="/">
						Resume <BsFillPersonLinesFill size={30}/>
					</a>
				</li>
			</ul>
		</div>

	</div>
	
	
  )
}

export default Navbar