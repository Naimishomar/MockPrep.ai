import React,{useState, useEffect} from 'react'
import { Button } from './ui/button';
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';
import Particles from './reactBitsComponents/Particles';
import FaqSimple from './FaqSimple';

function Dashboard() {
    const headingText = ["Learn smarter with AI","Start giving interviews","Get industry news","Build your resume","Get consult with mentors"];
    const [heading, setHeading] = useState(headingText[0]);
    const [index, setIndex] = useState(0);
      
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % headingText.length);
        }, 2000);
        return () => clearInterval(interval);
    });     
    useEffect(() => {
        setHeading(headingText[index]);
    }, [index]);

    // https://static.vecteezy.com/system/resources/thumbnails/038/003/419/small/gray-abstract-fog-realistic-smoke-overlay-black-sky-textured-on-black-photo.jpg

  return (
        <>
        <motion.div className='h-screen w-full bg-black/70 relative animate flex flex-col justify-center items-center' initial={{ opacity: 0, x: -200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} viewport={{ once: false, amount: 0.2 }}>
                {/* <img src="https://static.vecteezy.com/system/resources/thumbnails/038/003/419/small/gray-abstract-fog-realistic-smoke-overlay-black-sky-textured-on-black-photo.jpg" className='w-full h-full object-cover absolute top-0 left-0' alt="" /> */}
                <div style={{ width: '100%', height: '600px', position: 'absolute' }}>
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
                </div>
                <i className="ri-bar-chart-box-ai-line text-5xl absolute rotate-12 text-blue-400 top-45 left-30 iconMove"></i>
                <i class="ri-presentation-fill text-5xl absolute rotate-12 text-pink-400 top-15 right-30 iconMove"></i>
                <i class="ri-chat-voice-ai-fill text-5xl absolute rotate-12 text-yellow-400 bottom-35 right-40 iconMove"></i>
                <div className="group text-center pt-30 cursor-pointer">
                    <div className="text-8xl font-bold bg-gradient-to-bl from-[#ffffff] via-[#c0c0c0] to-[#000000] bg-clip-text text-transparent whitespace-nowrap transition-all duration-200 animate-pulse">
                    {heading}</div>
                </div>
                <div className='flex justify-center'>
                <div className='w-200 flex flex-col overflow-hidden'>
                    <div className='flex mt-8 whitespace-nowrap relative'>
                        <div className='w-10 h-10 bg-gradient-to-r from-[#000000] via-[#111111] to-transparent absolute left-0 z-20'></div>
                        <div className='w-20 h-10 bg-gradient-to-r from-transparent via-[#111111] to-[#000000] absolute right-0 z-20'></div>
                        <div className='flex slideRight gap-4'>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                        </div>
                        <div className='flex slideRight gap-4'>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                        </div>
                        <div className='flex slideRight gap-4'>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                        </div>
                    </div>
                    <div className='flex mt-5 whitespace-nowrap relative'>
                        <div className='w-10 h-10 bg-gradient-to-r from-[#000000] via-[#111111] to-transparent absolute left-0 z-20'></div>
                        <div className='w-20 h-10 bg-gradient-to-r from-transparent via-[#111111] to-[#000000]  absolute right-0 z-20'></div>
                        <div className='flex slideLeft gap-4'>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                        </div>
                        <div className='flex slideLeft gap-4'>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                        </div>
                        <div className='flex slideLeft gap-4'>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                            <p className='bg-white/10 px-4 py-2 rounded-full'>Want Try Something</p>
                        </div>
                    </div>
                </div>
                </div>
                <i class="ri-mouse-line absolute text-5xl left-[50%] bottom-0 translate-[-50%] cursor-pointer iconMove"></i>
        </motion.div>

        <hr className='border-white/10' />

        <motion.div className='min-h-screen w-full flex flex-col md:flex-row justify-between animate bg-black/80' initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} viewport={{ once: false, amount: 0.2 }}>
        <div className='w-full md:w-[50%] z-20'>
            <img src="https://imageio.forbes.com/specials-images/imageserve/663e3a5c927c44fd5629ad0f/product-visuals/0x0.png?format=png&crop=1586,891,x105,y0,safe&width=960" className='py-10 md:rounded-r-full h-full w-full object-cover' />
        </div>
        <div className='flex-1 px-6 py-10 z-20'>
            <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-bl from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent'>Unlock Smarter Interview Insights with <span className='text-blue-300 font-bold text-4xl md:text-5xl'>AI</span></h1>
            <p className='mt-3 text-lg md:text-xl bg-gradient-to-br from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent'>Enhance your hiring process with our smart interview interface. <br /> Get real-time insights during virtual interviews, including:</p>
            <ul>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>🎯 Interview Score: Instantly evaluate candidates based on technical skills and communication.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>📊 Comparative Analytics: Visualize how each candidate performs compared to the entire applicant pool.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>📝 Live Transcripts: Follow and review conversations with automated transcription.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>📈 Performance Feedback: Detailed AI-generated feedback helps you make informed, data-driven decisions.</li>
            </ul>
            <Link to='/dashboard'><Button className="w-full h-12 mt-3 bg-blue-400">Start interview</Button></Link>
        </div>
        </motion.div>

        <hr className='border-white/10' />

        <motion.div className='min-h-screen w-full bg-black/80 flex flex-col-reverse md:flex-row justify-between animate' initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.2 }}>
        <div className='flex-1 px-6 py-10'>
            <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-bl from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent'>Personalized <span className='text-pink-300 font-bold text-4xl md:text-5xl'>AI</span> Learning Coach</h1>
            <p className='mt-3 text-lg md:text-xl bg-gradient-to-br from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent'>Enhance your hiring process with our smart interview interface. <br /> Get real-time insights during virtual interviews, including:</p>
            <ul>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>🎯 Identifies Weak Areas: Pinpoints the exact topics or skills where you need improvement.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>📚 Delivers Targeted Content: Provides personalized lessons, resources, and quizzes based on your needs.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>🤖 Adapts in Real-Time: Dynamically adjusts learning paths as you improve or face new challenges.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>🚀 Accelerates Learning: Helps you grow faster by focusing only on what matters most.</li>
            </ul>
            <Button className="w-full h-12 mt-3 bg-pink-300">Learn something</Button>
        </div>
        <div className='w-full md:w-[50%]'>
            <img src="https://img.pikbest.com/wp/202405/computer-monitor-gamer-s-digital-haven-exploring-a-3d-dark-neon-workspace-with-and-luminescent-chair_9833057.jpg!w700wp" alt="" className='py-10 md:rounded-l-full h-full w-full object-cover' />
        </div>
        </motion.div>

        <hr className='border-white/10' />

        <motion.div className='min-h-screen w-full bg-black/80 flex flex-col md:flex-row justify-between animate' initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.2 }}>
        <div className='w-full md:w-[50%]'>
            <img src="https://thumbs.dreamstime.com/b/modern-resume-design-workspace-black-background-job-application-358664911.jpg" alt="" className='py-10 md:rounded-r-full h-full w-full object-cover' />
        </div>
        <div className='flex-1 px-6 py-10'>
            <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-bl from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent'><span className='text-red-400 font-bold text-4xl md:text-5xl'>AI</span>-Powered Resume Builder</h1>
            <p className='mt-3 text-lg md:text-xl bg-gradient-to-br from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent'>Enhance your hiring process with our smart interview interface. <br /> Get real-time insights during virtual interviews, including:</p>
            <ul>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>⚙️ AI-Generated Content Suggestions: Instantly generate professional summaries, role descriptions, and skills based on your background.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>📐 Smart Formatting & Design: Automatically organize your resume with clean, ATS-friendly layouts that look polished and modern.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>🎯 Job-Specific Optimization: Tailor your resume for each job with AI that aligns your content with the job description.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>🔍 Real-Time Feedback: Get AI-powered tips to improve clarity, impact, and keyword usage.</li>
            </ul>
            <Link to='/resume'><Button className="w-full h-12 mt-3 bg-red-400">Create your resume</Button></Link>
        </div>
        </motion.div>

        <hr className='border-white/10' />

        <motion.div className='min-h-screen w-full bg-black/80 flex flex-col-reverse md:flex-row justify-between animate' initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: false, amount: 0.2 }}>
        <div className='flex-1 px-6 py-10'>
            <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-bl from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent'>Real-Time Mentoring by <span className='text-yellow-400 font-bold text-4xl md:text-5xl'>Human Experts</span></h1>
            <p className='mt-3 text-lg md:text-xl bg-gradient-to-br from-[#5c5c5c] via-[#7e7e7e] to-[#0b0b0b] bg-clip-text text-transparent'>Enhance your hiring process with our smart interview interface. <br /> Get real-time insights during virtual interviews, including:</p>
            <ul>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>🧠 Expert-Led Sessions: Learn directly from experienced mentors who’ve been in your shoes.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>💬 Instant Doubt Resolution: Ask questions and get clear, actionable answers in real-time.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>🎯 Personalized Guidance: Get advice tailored to your goals, skill level, and career path.</li>
            <li className='text-lg md:text-xl hover:text-white/80 blur-sm hover:blur-none mt-2'>🗓️ Flexible Scheduling: Book sessions when you need them — no long wait times or rigid hours.</li>
            </ul>
            <Button className="w-full h-12 mt-3 bg-yellow-400">Get experts mentoring</Button>
        </div>
        <div className='w-full md:w-[50%]'>
            <img src="https://media.istockphoto.com/id/533241382/vector/mentoring-chart-with-keywords-and-icons-sketch.jpg?s=612x612&w=0&k=20&c=jrmrfgr8bVFD54ORCkgzt5GpldwHVxvQiwl8g1tOUGA=" alt="" className='py-10 md:rounded-r-full h-full w-full object-cover invert-100' />
        </div>
        </motion.div>

        <hr className='border-white/10'/>

        <FaqSimple/>

        <hr className='border-white/10'/>
        </>
  )
}

export default Dashboard