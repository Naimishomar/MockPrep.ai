import React, { useState, useEffect } from 'react';
import Interview from './Interview';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
// import * as tts from '@diffusionstudio/vits-web';
// import * as pdfjsLib from 'pdfjs-dist';
// pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

function Home() {
  const [click, setClick] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [experience, setExperience] = useState("Fresher");
  const [duration, setDuration] = useState("5");
  const [skill, setSkill] = useState('Frontend Developer');
  const [showInterview, setShowInterview] = useState(true);
  const [voice, setVoiceModel] = useState('en_US-hfc_female-medium');
  const [availableModels, setAvailableModels] = useState([]);
  const [downloadedModels, setDownloadedModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const models = await tts.voices();
        setAvailableModels(models);
      } catch (error) {
        console.error("Error fetching TTS voices:", error);
        // Handle error appropriately, maybe show a message to the user
      }
    };
    fetchModels();
  }, []);

  useEffect(() => {
    const fetchDownloadedModels = async () => {
      try {
        const models = await tts.stored();
        setDownloadedModels(models);
      } catch (error) {
        console.error("Error fetching downloaded TTS models:", error);
      }
    };
    fetchDownloadedModels();
  }, []);

  const handleVoiceModelChange = (event) => {
    setVoiceModel(event.target.value);
  };

  const handleSkill = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    // Assuming single skill selection for now based on initial state
    setSkill(values[0] || 'Frontend Developer');
    console.log(values[0]);
  };

  const handleExperience = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
     // Assuming single experience selection
    setExperience(values[0] || 'Fresher');
    console.log(values[0]);
  };

  // --- Updated handleResume function ---
  const handleResume = (e) => {
    const file = e.target.files[0];
    setResumeFile(null); // Reset previous file
    setResumeText('');   // Reset previous text
    if (file && file.type === 'application/pdf') {
      setResumeFile(file); // Keep track of the file object if needed
      setIsExtracting(true); // Indicate extraction started
      console.log('Resume uploaded:', file.name);

      const reader = new FileReader();

      reader.onload = async (event) => {
        const typedarray = new Uint8Array(event.target.result);
        try {
          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            // Join items with space, and pages with newline for structure
            fullText += textContent.items.map(item => item.str).join(' ') + '\n';
          }
          setResumeText(fullText.trim()); // Set the extracted text
          console.log('Resume text extracted successfully.');
        } catch (error) {
          console.error('Error extracting text from PDF:', error);
          alert('Failed to extract text from the PDF. Please try another file.');
          setResumeFile(null); // Clear the invalid file
        } finally {
           setIsExtracting(false); // Indicate extraction finished
        }
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Error reading the selected file.');
        setIsExtracting(false);
         setResumeFile(null);
      };

      reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer

    } else if (file) {
        alert('Please upload a PDF file.');
        e.target.value = null; // Clear the input
    } else {
        // No file selected or selection cancelled
        console.log('No resume file selected.');
    }
  };
  // --- End of updated handleResume ---

  const handleDuration = (e) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    // Assuming single duration selection
    setDuration(values[0] || '5');
    console.log(values[0]);
  };

  const start = () => {
     // Optional: Check if text extraction is done or if a resume was required but not provided/processed
     if (resumeFile && isExtracting) {
        alert("Please wait, resume text is being extracted.");
        return;
     }

    setTimeout(() => {
      setClick(true);
    }, 500); // Short delay
  };


  

  return (
    <div className='mt-20 h-screen w-full bg-black/70 flex justify-center '>
      {(click && showInterview) ? (
        <Interview
          skill={skill}
          experience={experience}
          // Pass the extracted text string
          resume={resumeText}
          duration={duration}
          onEnd={() => setShowInterview(false)}
          voice={voice}
        />
      ) : (
        <>
          <div className='mx-5'>
            {/* Rest of your Instructions UI */}
            <i className="ri-bar-chart-box-ai-line text-5xl absolute rotate-12 text-blue-400 top-45 left-30 iconMove"></i>
            <i className="ri-presentation-fill text-5xl absolute rotate-12 text-pink-400 top-25 right-30 iconMove"></i>
            <i className="ri-chat-voice-ai-fill text-5xl absolute rotate-12 text-yellow-400 bottom-25 right-60 iconMove"></i>
            <div className='bg-white/10 p-4 my-2 rounded-xl w-full text-white/80'>
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
                  <DialogDescription className="flex flex-col space-y-3 mt-0">
                    {/* Skill Selector */}
                    <div>
                       <label htmlFor="skillSelect">Choose your skill:</label>
                       <select id="skillSelect" value={skill} onChange={handleSkill} className='w-full bg-white/10 h-10 rounded px-2 mt-1 focus:outline-none'>
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
                    {/* Voice Model Selector */}
                     <div>
                       <label htmlFor="voiceModelSelect">Choose Voice Model:</label>
                       <select
                        id="voiceModelSelect"
                         value={voice}
                         onChange={handleVoiceModelChange}
                         className='w-full bg-white/10 h-10 rounded px-2 mt-1 focus:outline-none'
                       >
                         {availableModels.length > 0 ? (
                           availableModels.map((model, index) => (
                             <option key={index} value={model.key}>
                               {model.key}{" "}
                               {downloadedModels.includes(model.key) ? (
                                 <span className="text-green-500">✔</span> // Maybe style this better if needed
                               ) : (
                                 <span className="text-yellow-500">↓</span> // Maybe style this better
                               )}
                             </option>
                           ))
                         ) : (
                           <option disabled>Loading models...</option>
                         )}
                       </select>
                     </div>
                    {/* Experience Selector */}
                    <div>
                       <label htmlFor="experienceSelect">Experience:</label>
                       <select id="experienceSelect" value={experience} onChange={handleExperience} className='w-full bg-white/10 h-10 rounded px-2 mt-1 focus:outline-none'>
                         <option value="Fresher">Fresher</option>
                         <option value="1 year">1 year</option>
                         <option value="2 year">2 year</option>
                         <option value="5+ year">5+ year</option>
                       </select>
                     </div>
                    {/* Resume Upload */}
                    <div>
                       <label htmlFor="resumeUpload">Upload Resume (PDF only):</label>
                       <input id="resumeUpload" type="file" accept="application/pdf" onChange={handleResume} className='w-full bg-white/10 h-10 rounded p-2 mt-1 focus:outline-none file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'/>
                        {/* Display status */}
                       {isExtracting && <p className="text-sm text-yellow-400 mt-1">Extracting text from PDF...</p>}
                       {resumeFile && !isExtracting && resumeText && <p className="text-sm text-green-400 mt-1">Resume text extracted ({resumeFile.name})</p>}
                        {resumeFile && !isExtracting && !resumeText && <p className="text-sm text-red-400 mt-1">Failed to extract text from {resumeFile.name}.</p>}
                     </div>
                     {/* Interview Duration Selector */}
                    <div>
                       <label htmlFor="durationSelect">Interview Duration:</label>
                       <select id="durationSelect" value={duration} onChange={handleDuration} className='w-full bg-white/10 h-10 rounded px-2 mt-1 focus:outline-none'>
                         <option value="5">5 min</option>
                         <option value="0.1">1 min</option>
                         <option value="10" >10 min</option>
                         <option value="15" >15 min</option>
                         <option value="30">30 min</option>
                       </select>
                     </div>
                    <Button className="bg-blue-500 py-5 hover:bg-blue-600 cursor-pointer disabled:opacity-50" onClick={start} disabled={isExtracting}>Start Now<i className="ri-arrow-right-line text-2xl"></i></Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;