import React from 'react'
import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'

function Footer() {
  return (
    <div>
      {/* Footer Container */}
      <div className='w-full bg-black/80 flex flex-col md:flex-row justify-between px-6 sm:px-10 md:px-20 py-10 bg-gradient-to-bl from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent'>
        {/* Left Side */}
        <div className='text-center md:text-left'>
          <div className='flex justify-center md:justify-start items-center font-bold'>
            <img src="/image-removebg-preview.png" className='invert w-12 sm:w-15' alt="logo" />
            <p className='text-2xl sm:text-3xl ml-2'>MockPrep</p>
          </div>
          <p className='font-semibold mt-2'>India's first AI interviewer</p>
          <p className='text-lg sm:text-xl mt-5 text-white/60'>
            Contact Us: <span className='font-bold text-white'>naimishomar@gmail.com</span>
          </p>
          <p className='mt-5 font-semibold'>©️ MockPrep Community, 2025</p>
        </div>

        {/* Newsletter Subscription */}
        <div className='mt-5 md:mt-0 text-center'>
          <div>Newsletter Subscription</div>
          <div className='flex mt-3 bg-white/15 rounded relative'>
            <input
              type="text"
              placeholder='Subscribe to our newsletter'
              className='px-4 py-2 w-52 sm:w-60 md:w-80 outline-none text-white'
            />
            <button className='bg-pink-400 h-full rounded-r px-3 text-white absolute right-0'>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Separator */}
      <hr className='border-1 mx-6 sm:mx-10 md:mx-25 border-white/40' />

      {/* Social Media Icons */}
      <div className='w-full max-h-screen'>
        <div className='flex gap-8 sm:gap-10 py-10 justify-center bg-black/80'>
          <Link><i className="ri-twitter-x-fill text-3xl sm:text-2xl hover:text-blue-500 border-2 p-2 rounded-full animate-pulse"></i></Link>
          <i className="ri-bard-line text-2xl sm:text-2xl"></i>
          <Link><i className="ri-linkedin-fill text-3xl sm:text-2xl hover:text-blue-600 border-2 p-2 rounded-full animate-pulse"></i></Link>
          <i className="ri-bard-line text-2xl sm:text-2xl"></i>
          <Link><i className="ri-instagram-line text-3xl sm:text-2xl hover:text-pink-500 border-2 p-2 rounded-full animate-pulse"></i></Link>
        </div>
      </div>
    </div>
  )
}

export default Footer