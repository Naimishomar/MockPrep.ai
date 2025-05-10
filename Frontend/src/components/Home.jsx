import React,{useState} from 'react'
import Interview from './Interview'
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

function Home() {
  const [click, setclick] = useState(false)
  const [resume, setresume] = useState([])
  const [experience, setexperience] = useState("Fresher");
  const [duration, setduration] = useState("5")
  const [skill, setskill] = useState('Frontend Developer')
  const [showInterview, setShowInterview] = useState(true);

  const handleSkill = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setskill(values);
    console.log(values);
  };

  const handleExperience = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setexperience(values);
    console.log(values);
  };

  const handleResume = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setresume(values);
    console.log(values);
  };

  const handleDuration = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setduration(values);
    console.log(values);
  };

  const start=()=>{
    setInterval(() => {
      setclick(true)
    },1000);
  }

  return (
    <>
    <div className='mt-15 h-fit py-5 w-full bg-black/70 flex justify-center '>
      {(click && showInterview)?(
        <Interview
        skill={skill}
    experience={experience}
    resume={resume}
    duration={duration}
    onEnd={() => setShowInterview(false)}
        />
      ):(
        <>
        <div className='px-4'>
          <i class="ri-bar-chart-box-ai-line text-5xl absolute rotate-12 text-blue-400 top-45 left-60 iconMove"></i>
          <i class="ri-presentation-fill text-5xl absolute rotate-12 text-pink-400 top-25 right-30 iconMove"></i>
          <i class="ri-chat-voice-ai-fill text-5xl absolute rotate-12 text-yellow-400 bottom-25 right-60 iconMove"></i>
          <div className='bg-white/15 p-4 my-2 rounded-xl w-full text-white/80'>
            <h1 className='text-3xl font-semibold text-center text-white'>General Instructions:</h1>
            <p className='my-2'><span className='font-semibold text-red-500'>1.Check Internet & Devices:</span> <br />Ensure your internet connection is stable and your mic, camera, and speakers are working.</p>
            <p><span className='font-semibold text-red-500'>2.Mute When Not Speaking</span> <br />Keep your microphone muted unless you're speaking to avoid background noise.</p>
            <p className='my-2'><span className='font-semibold text-red-500'>3.Dress Appropriately:</span> <br />Maintain a professional or decent appearance, especially if your camera is on.</p>
            <p><span className='font-semibold text-red-500'>4.Be in a Quiet Environment:</span> <br />Choose a quiet and well-lit place to avoid distractions during the session.</p>
            <p className='my-2'><span className='font-semibold text-red-500'>6.Be Respectful:</span> <br />Allow others to speak, avoid interrupting, and be polite during discussions.</p>
          </div>
          <Dialog>
              <DialogTrigger className='px-5 py-3 bg-blue-500 rounded text-white flex items-center mx-auto gap-2 text-xl cursor-pointer w-full justify-center hover:bg-blue-600 font-semibold'>Click to start<i className="ri-add-line text-2xl"></i></DialogTrigger>
              <DialogContent className="bg-gradient-to-bl from-[#1a1a1a] via-[#2a2a2a] to-[#000000] shadow-2xl text-white border-none">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-4">
                    <img className='w-13 invert' src="/image-removebg-preview.png" alt="logo" />
                    <h1 className='text-2xl font-bold'>MockPrep</h1>
                  </DialogTitle>
                  <DialogDescription className="flex flex-col space-y-3 mt-5">
                  <div>
                    <label>Choose your skill:</label>
                    <select value={skill} onChange={handleSkill} className='w-full bg-white/10 h-10 rounded px-2 mt-1 focus:outline-none'>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="Fullstack Web Developer">Fullstack Web Developer</option>
                      <option value="UI/UX Designer">UI/UX Designer</option>
                      <option value="Android Developer">Android Developer</option>
                      <option value="Cyber Security">Cyber Security</option>
                      <option value="AR/VR Developer">AR/VR Developer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label>Experience:</label>
                    <select value={experience} onChange={handleExperience} className='w-full bg-white/10 h-10 rounded px-2 mt-1 focus:outline-none'>
                      <option value="Fresher">Fresher</option>
                      <option value="1 year">1 year</option>
                      <option value="2 year">2 year</option>
                      <option value="5+ year">5+ year</option>
                    </select>
                  </div>
                  <div>
                    <label>Upload Resume:</label>
                    <input type="file" value={resume} onChange={handleResume} className='w-full bg-white/10 h-10 rounded p-2 mt-1 focus:outline-none'/>
                  </div>
                  <div>
                    <label>Interview Duration:</label>
                    <select value={duration} onChange={handleDuration} className='w-full bg-white/10 h-10 rounded px-2 mt-1 focus:outline-none'>
                      <option value="5">5 min</option>
                      <option value="10" disabled>10 min</option>
                      <option value="15" disabled>15 min</option>
                      <option value="30" disabled>30 min</option>
                    </select>
                  </div>
                  <Button className="bg-blue-500 py-5 hover:bg-blue-600 cursor-pointer" onClick={start}>Start Now<i class="ri-arrow-right-line text-2xl"></i></Button>
                  <div className='flex justify-center items-center mt-2 gap-8'>
                    <Link><i class="ri-twitter-x-fill text-2xl hover:text-blue-500"></i></Link>
                    <Link><i class="ri-linkedin-fill text-2xl hover:text-blue-600"></i></Link>
                    <Link><i class="ri-instagram-line text-2xl hover:text-pink-500"></i></Link>
                  </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
          </Dialog>
        </div>
        </>
      )
      }
    </div>
    <hr className='border-white/30'/>
    </>
  )
}

export default Home