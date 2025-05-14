import React from 'react'
import { Button } from './ui/button'
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import img from '../assets/image-removebg-preview.png'

function Header() {
  return (
    <motion.div className='w-full h-20 bg-gradient-to-b from-black via-black/80 to-transparent text-white flex items-center justify-between px-4 lg:px-8 fixed z-50'
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Logo */}
      <div className='w-10 sm:w-12'>
        <Link to="/"><img className='invert' src={img} alt="logo" /></Link>
      </div>

      {/* Desktop Nav */}
      <div className='hidden lg:flex gap-5 items-center'>
        <Link to='https://drona-ohmm.onrender.com/'>
          <Button className="text-white border-2 border-gray-600 font-medium text-sm p-5 rounded-full cursor-pointer hover:bg-black">
            <i className="ri-graduation-cap-line text-2xl mr-2"></i>Learning
          </Button>
        </Link>
        <i className="ri-bard-line text-2xl" />
        <Link to='/resume'>
          <Button className="bg-white text-black font-medium text-sm p-5 rounded-full hover:bg-white/90 cursor-pointer">
            <i className="ri-booklet-line text-2xl mr-2"></i>Create Resume
          </Button>
        </Link>
        <i className="ri-bard-line text-2xl" />
        <Link to='/news'>
          <Button className="text-white border-2 border-gray-600 font-medium text-sm p-5 rounded-full hover:bg-black cursor-pointer">
            <i className="ri-newspaper-line text-2xl mr-2"></i>News
          </Button>
        </Link>
      </div>

      {/* Mobile Drawer */}
      <div className=''>
        <Dialog>
          <DialogTrigger>
            <i className="ri-menu-2-line text-2xl cursor-pointer bg-white/10 p-3 rounded-full" />
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-bl from-[#1a1a1a] via-[#2a2a2a] to-[#000000] shadow-2xl text-white border-none">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-4">
                <img className='w-12 invert' src={img} alt="logo" />
                <h1 className='text-2xl font-bold'>MockPrep</h1>
              </DialogTitle>
              <DialogDescription className="flex flex-col space-y-4 mt-6 text-sm">
                
                {/* Moved main nav buttons here */}
                <Link to='/dashboard' className='lg:hidden'>
                  <Button className="w-full bg-white/10 lg:py-4 py-4 rounded-full hover:bg-white hover:text-black">
                    <i className="ri-speak-ai-line mr-2"></i>Start Interview
                  </Button>
                </Link>
                <Link to='https://drona-ohmm.onrender.com/' className='lg:hidden'>
                  <Button className="w-full bg-white/10 lg:py-4 py-4 rounded-full hover:bg-white hover:text-black">
                    <i className="ri-graduation-cap-line mr-2"></i>Learning
                  </Button>
                </Link>
                <Link to='/resume' className='lg:hidden'>
                  <Button className="w-full bg-white/10 lg:py-4 py-4 rounded-full hover:bg-white hover:text-black">
                    <i className="ri-booklet-line mr-2"></i>Create Resume
                  </Button>
                </Link>
                <Link to='/news' className='lg:hidden'>
                  <Button className="w-full bg-white/10 lg:py-4 py-4 rounded-full hover:bg-white hover:text-black">
                    <i className="ri-newspaper-line mr-2"></i>News
                  </Button>
                </Link>

                {/* Other menu items */}
                <Link to="/login">
                  <Button className="w-full bg-white/10 lg:py-6 py-4 rounded-full hover:bg-white hover:text-black cursor-pointer">Login</Button>
                </Link>
                <Button className="w-full bg-white/10 lg:py-6 py-4 rounded-full hover:bg-white hover:text-black cursor-pointer">Contact Us</Button>
                <Button className="w-full bg-white/10 lg:py-6 py-4 rounded-full hover:bg-white hover:text-black cursor-pointer">About Us</Button>
                <Link to='/subscription'>
                  <Button className="w-full bg-blue-400 lg:py-6 py-4 rounded-full cursor-pointer hover:bg-blue-500">Premium Plan</Button>
                </Link>

                <div className='mt-4 flex justify-center gap-3 text-xs text-white/60'>
                  <i className="ri-bubble-chart-line" />
                  <Link className='hover:text-white/80'>Terms & Conditions</Link>
                  <i className="ri-bubble-chart-line" />
                  <Link className='hover:text-white/80'>Founders</Link>
                  <i className="ri-bubble-chart-line" />
                </div>

                <div className='flex justify-center items-center gap-6 text-xl mt-2'>
                  <Link><i className="ri-twitter-x-fill hover:text-blue-500"></i></Link>
                  <Link><i className="ri-linkedin-fill hover:text-blue-600"></i></Link>
                  <Link><i className="ri-instagram-line hover:text-pink-500"></i></Link>
                </div>

                <p className='text-center text-sm hover:text-purple-500'>Made by Artificial Engineers</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  )
}

export default Header
