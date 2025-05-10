import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Button } from './ui/button'

const steps = [
    {
      number: "1",
      title: "Choose a recruiter-approved template",
      icon: "📄"
    },
    {
      number: "2",
      title: "Add skills and bullet points in one click",
      icon: "📝"
    },
    {
      number: "3",
      title: "Finish your resume in minutes",
      icon: "📃"
    },
    {
      number: "4",
      title: "Download in Word, PDF and more",
      icon: "📥"
    }
  ];

function Resume() {
    const [selectInput, setselectInput] = useState('hardcoded');
    const [phoneNumber, setphoneNumber] = useState('')
    const [email, setemail] = useState('')
    const [github, setgithub] = useState('')
    const [college, setcollege] = useState('')
    const [year, setyear] = useState('')
    const [acheivements, setacheivements] = useState('')

    const scrollToTop = () => {
        window.scrollTo({
           top: 0,
           behavior: "smooth",
        });
    };

  return (
    <>
{/* Main Container */}
<div className="mt-20 w-full min-h-screen p-4 md:p-7 flex flex-col md:flex-row relative">
  
  {/* Floating Icons */}
  <i className="ri-presentation-fill text-4xl md:text-5xl absolute rotate-12 text-pink-400 bottom-5 left-10 md:left-80 iconMove"></i>
  <i className="ri-chat-voice-ai-fill text-4xl md:text-5xl absolute rotate-12 text-yellow-400 top-20 md:top-32 right-10 md:right-28 iconMove"></i>

  {/* Text Section */}
  <div className="w-full md:w-[65%] flex flex-col gap-6">
    <h1 className="text-4xl md:text-6xl font-bold text-pink-400 leading-tight">
      Build Your Dream Resume <br /> in Minutes with AI
    </h1>
    <p className="text-lg md:text-xl font-semibold">
      Say Goodbye to Templates — Let AI Build Your Resume
    </p>
    <p className="mt-6 text-lg md:text-2xl leading-relaxed">
      Land your next job with one of the best AI resume builders online. <br className="hidden md:block" /> 
      Work from your computer or phone with dozens of recruiter-<br className="hidden md:block" />
      approved templates and add ready-to-use skills and phrases <br className="hidden md:block" /> 
      in one click. Millions have trusted our resume maker — and <br className="hidden md:block" /> 
      <span className="text-3xl md:text-4xl text-yellow-300 font-bold">it’s free to use!</span>
    </p>

    {/* Dialog Button */}
    <Dialog>
      <DialogTrigger>
        <button className="mt-6 bg-blue-500 px-6 py-3 rounded-md flex items-center justify-center gap-2 font-bold text-lg md:text-xl hover:bg-blue-700 w-full md:w-auto">
          Create my resume <i className="ri-survey-line text-2xl"></i>
        </button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-gradient-to-bl from-[#1a1a1a] via-[#2a2a2a] to-[#000000] shadow-2xl text-white border-none overflow-y-auto h-screen">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <img className="w-10 invert" src="/image-removebg-preview.png" alt="logo" />
            <h1 className="text-2xl font-bold">MockPrep</h1>
          </DialogTitle>

          <DialogDescription className="flex flex-col space-y-6 mt-6">
            {/* Selection Buttons */}
            <div className="flex flex-col md:flex-row gap-6">
              <button className="text-lg bg-blue-500 hover:text-blue-500 hover:bg-white px-8 py-2 rounded font-semibold w-full" onClick={() => setselectInput('hardcoded')}>
                Hello
              </button>
              <button className="text-lg bg-blue-500 hover:text-blue-500 hover:bg-white px-8 py-2 rounded font-semibold w-full" onClick={() => setselectInput('brief')}>
                Guys
              </button>
            </div>

            {/* Conditional Inputs */}
            <div>
              {selectInput === 'hardcoded' ? (
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-center bg-gradient-to-bl from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent">
                    Enter your details
                  </h1>

                  {/* Phone + Email */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label>Phone Number:</label>
                      <input type="text" placeholder="Phone number" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)} className="w-full border p-2 rounded outline-none text-gray-200 bg-transparent" />
                    </div>
                    <div className="flex-1">
                      <label>Email:</label>
                      <input type="text" placeholder="Your email" value={email} onChange={(e) => setemail(e.target.value)} className="w-full border p-2 rounded outline-none text-gray-200 bg-transparent" />
                    </div>
                  </div>

                  {/* Github */}
                  <div>
                    <label>Github ID:</label>
                    <input type="text" placeholder="Your Github ID" value={github} onChange={(e) => setgithub(e.target.value)} className="w-full border p-2 rounded outline-none text-gray-200 bg-transparent" />
                    {github.length <= 0 && <p className="text-red-400 text-sm">Required</p>}
                  </div>

                  {/* Education + Passing Year */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label>Education:</label>
                      <input type="text" placeholder="College Name" value={college} onChange={(e) => setcollege(e.target.value)} className="w-full border p-2 rounded outline-none text-gray-200 bg-transparent" />
                    </div>
                    <div className="flex-1">
                      <label>Passing Year:</label>
                      <input type="text" placeholder="Year" value={year} onChange={(e) => setyear(e.target.value)} className="w-full border p-2 rounded outline-none text-gray-200 bg-transparent" />
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <label>Achievements:</label>
                    <input type="text" placeholder="Achievements" value={acheivements} onChange={(e) => setacheivements(e.target.value)} className="w-full border p-2 rounded outline-none text-gray-200 bg-transparent" />
                    <p className="text-sm">{100 - acheivements.length} words left</p>
                  </div>

                  {/* Get Resume Button */}
                  <button className="w-full py-2 bg-blue-500 text-white cursor-pointer rounded flex items-center justify-center hover:bg-blue-600">
                    Get Resume <i className="ri-arrow-right-line text-2xl"></i>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea placeholder="Give a brief discussion about yourself and your projects" className="w-full min-h-[150px] border p-2 rounded outline-none text-gray-200 bg-transparent resize-none" />
                  <button className="w-full py-2 bg-blue-500 text-white cursor-pointer rounded flex items-center justify-center hover:bg-blue-600">
                    Get Resume <i className="ri-arrow-right-line text-2xl"></i>
                  </button>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>

  {/* Image Section */}
  <div className="w-full md:flex-1 mt-10 md:mt-0">
    <img src="/resume.avif" className="object-cover w-full h-full rounded-xl" alt="resume" />
  </div>
</div>

{/* Divider */}
<hr className="border-gray-700 my-10" />

{/* Steps Section */}
<div className="flex flex-col items-center justify-center text-white px-4 py-10">
  <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-bl from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent">
    Make a Resume That Gets Results
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl text-center">
    {steps.map((step) => (
      <div key={step.number} className="flex flex-col items-center gap-4 bg-black/40 px-4 py-8 rounded-2xl">
        <div className="text-6xl">{step.icon}</div>
        <div className="text-lg font-semibold">{step.title}</div>
      </div>
    ))}
  </div>

  <button onClick={scrollToTop} className="mt-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-full flex items-center gap-3">
    Create my resume <i className="ri-survey-line text-2xl"></i>
  </button>
</div>

    </>
  )
}

export default Resume