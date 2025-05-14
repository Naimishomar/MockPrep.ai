import React, { useEffect, useRef, useState } from "react";
import { Client } from "@gradio/client";
import * as tts from '@diffusionstudio/vits-web'; 
import InterviewAnalysis from "./InterviewAnalysis";
import InterviewCompletionModal from "./InterviewCompletionModal";

function Interview({ skill, experience, resume, duration, voice }) {
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const hasStartedRef = useRef(false);
  const isInterviewEndedRef = useRef(false); // New ref to track interview state synchronously

  const [changeMode, setChangeMode] = useState(false);
  const [cutCall, setCutCall] = useState(null);
  const [micMuted, setMicMuted] = useState(false);
  const [closeChat, setCloseChat] = useState(false);
  const [logText, setLogText] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [confidence, setConfidence] = useState(0);
  const [confidenceHistory, setConfidenceHistory] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60); // Convert minutes to seconds
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const appendLog = (msg) => {
    setLogText((prev) => prev + msg + "\n");
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        setCutCall(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
          };
        }
        startConfidenceTracking();
      } catch (err) {
        console.error("Camera access error:", err);
        alert("Please allow camera access or check your device settings.");
      }
    };
    startCamera();

    // Start the interview timer
    startTimer();

    // Cleanup function
    return () => {
      stopConfidenceTracking();
      stopTimer();
    };
  }, []);

  // Format the time remaining into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start the interview timer
  const startTimer = () => {
    if (timerRef.current) return;
    
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          endInterviewDueToTime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Stop the interview timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // End the interview when time is up
  const endInterviewDueToTime = async () => {
    if (isInterviewEndedRef.current) return; // Check the ref instead of state
    
    // Update both ref and state
    isInterviewEndedRef.current = true;
    setInterviewEnded(true);
    
    stopTimer();
    appendLog("Time is up. Ending the interview...");
    
    // Stop any ongoing speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onresult = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    // Get a goodbye message from the API
    const timeupMessage = await callGeminiAPI(
      conversationHistory.concat({ 
        role: "user", 
        text: "Our interview time is up. Please thank the candidate and end the interview with a brief goodbye." 
      })
    );
    
    appendLog("Interviewer: " + timeupMessage);
    await speakTextNormal(timeupMessage);
    
    // Update final conversation history with the goodbye message
    setConversationHistory(prev => 
      prev.concat([
        { role: "user", text: "Our interview time is up." },
        { role: "model", text: timeupMessage }
      ])
    );
    
    // Speak the completion message before showing the modal
    await speakTextNormal("Interview complete! Thank you for participating.");
    
    // Stop video tracking
    if (cutCall) {
      cutCall.getTracks().forEach(track => track.stop());
    }
    
    // Show the completion modal
    setShowCompletionModal(true);
  };

  const startConfidenceTracking = async () => {
    const client = await Client.connect("NavneetYadav207002/Confidence");
    // Check confidence more frequently - every 10 seconds for better time series data
    intervalRef.current = setInterval(async () => {
      if (!videoRef.current) return;
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const result = await client.predict("/predict", {
            img: blob,
          });
          const score = result.data[0].confidences[1].confidence;
          const confidenceValue = Math.round(score * 100);
          console.log(confidenceValue);
          
          // Update current confidence
          setConfidence(confidenceValue);
          
          // Add to confidence history with timestamp
          setConfidenceHistory(prev => [
            ...prev, 
            { timestamp: Date.now(), value: confidenceValue }
          ]);
          
        } catch (err) {
          console.error("Confidence fetch error:", err);
        }
      }, "image/png");
    }, 10000); // Check every 10 seconds
  };

  const stopConfidenceTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const stopCamera = () => {
    if (isInterviewEndedRef.current) return; // Check the ref instead of state
    
    // Update both ref and state
    isInterviewEndedRef.current = true;
    setInterviewEnded(true);
    
    // Stop all ongoing processes
    if (cutCall) {
      cutCall.getTracks().forEach(track => track.stop());
    }
    
    if (audioRef.current) {
      if (audioRef.current instanceof Audio) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      speechSynthesis.cancel();
      audioRef.current = null;
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onresult = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    stopConfidenceTracking();
    stopTimer();
    
    // Speak the completion message
    speakTextNormal("Interview ended by user. Thank you for participating.").then(() => {
      // Show the completion modal after speech ends
      setShowCompletionModal(true);
    });
  };

  async function updateUserHistory(updateData) {
  try {
    const response = await fetch('http://localhost:8000/history', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}` // optional if you're using cookies
      },
      body: JSON.stringify(updateData),
      credentials: 'include', // ensures cookies are sent
    });

    const result = await response.json();
    if (response.ok) {
      console.log("History updated:", result.data);
    } else {
      console.error("Update failed:", result.message);
    }
  } catch (error) {
    console.error("Error updating history:", error);
  }
}

  const handleGoToAnalysis = () => {
    const updatedata = {
      conversation: conversationHistory,
      confidence: confidence,
      role: skill,
    }
    updateUserHistory(updatedata)
    setShowCompletionModal(false);
    setShowAnalysis(true);
  };

  const handleGoToHome = () => {
    window.location.reload(); // Reload the page to go back to home
  };

  const toggleMic = () => {
    if (cutCall) {
      const audioTrack = cutCall.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicMuted(!audioTrack.enabled);
      }
    }
  };

  const speakTextNormal = async (text) => {
    return new Promise(async (resolve) => {
      const wav = await tts.predict({
        text: text,
        voiceId: voice,
      });

      const audio = new Audio();
      audio.src = URL.createObjectURL(wav);
      audio.play();

      audio.onended = () => {
        audioRef.current = null;
        resolve();
      };
      audioRef.current = audio;
    });
  };
  

  const callGeminiAPI = async (updatedHistory) => {
    const response = await fetch("http://localhost:8000/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history: updatedHistory }),
      credentials: "include",
    });
  
    const data = await response.json();
    return data.text;
  };

  const startInterview = async () => {
    const stored = await tts.stored();
    
    const id = "session-" + Date.now();
    setSessionId(id);
    
    const initialHistory = [
      {
        role: "user",
        text: `You are a friendly and professional Interviewer (Name Yourself Randomly) Interviewing a student for ${skill} role. they have ${experience} years of experience there resume is ${resume}. do not answer any question not even your own if user dont answer correctly just move on. if the users answer is incomplete or if user understood the question wrong give a slight hint and ask to complete or add more. do not say more than a few sentences.ask a mix of hard and simple problem one by one ask practical yet unique question. Keep the interview concise and on-topic. dont ask long question and try to give feedback and tell some intresthing thing regarding to user answer and related to asked question ask them about there projects from the resume or work experience use the resume as your refrence`,
      },
    ];
    setConversationHistory(initialHistory);

    appendLog(`Session ID: ${id}`);
    appendLog(`Interview Duration: ${duration} minutes`);
    
    if(!stored.includes(voice)){
      appendLog("Please wait the voice model is Downloading. It will happen only for the first time");
      await tts.download(voice, (progress) => {
        console.log(`Downloading ${progress.url} - ${Math.round(progress.loaded * 100 / progress.total)}%`);
      });
    }

    const welcome = await callGeminiAPI(initialHistory.concat({
      role: "user",
      text: `Start the interview. Welcome me and ask me to introduce myself. in one line`
    }));

    console.log("welcome",welcome)

    appendLog("Interviewer: " + welcome);
    await speakTextNormal(welcome);
    
    // Check if interview is still active before proceeding
    if(!isInterviewEndedRef.current){
      recordUserAnswer(initialHistory.concat({ role: "model", text: welcome }));
    }
  };

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      if (!sessionId) {
        startInterview();
      }
    }
  }, []);

  const recordUserAnswer = (historyOverride = null) => {
    // Don't start new recording if interview has ended - check the ref
    if (isInterviewEndedRef.current) {
      appendLog("Interview has ended, not recording.");
      return;
    }
    
    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
        ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
        : null;

    if (!recognition) {
      appendLog("SpeechRecognition API not supported in this browser.");
      return;
    }

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;
    
    let gotResult = false;

    // Check again before starting recognition
    if(isInterviewEndedRef.current) {
      appendLog("Interview ended before recognition could start.");
      return;
    }
    
    recognition.start();
    appendLog("Listening")
    recognition.onresult = async (event) => {
      // Check ref not state
      if (isInterviewEndedRef.current) {
        appendLog("Interview ended during recognition - discarding result.");
        recognition.stop();
        return;
      }
      
      gotResult = true;
      recognition.stop();
      const text = event.results[0][0].transcript;
      appendLog("User: " + text);

      const prevHistory = historyOverride || conversationHistory;
      const updatedHistory = prevHistory.concat({ role: "user", text });

      const nextQuestion = await callGeminiAPI(updatedHistory);
      appendLog("Interviewer: " + nextQuestion);
      await speakTextNormal(nextQuestion);
      
      const updatedConversationHistory = updatedHistory.concat({ role: "model", text: nextQuestion });
      setConversationHistory(updatedConversationHistory);
      
      // Continue the conversation only if interview hasn't ended - check ref
      if (!isInterviewEndedRef.current) {
        recordUserAnswer(updatedConversationHistory);
      } else {
        appendLog("Interview ended during processing - stopping conversation.");
      }
    };

    recognition.onerror = async (event) => {
      recognition.stop();
      console.log("Speech recognition error:", event.error);
      
      // Check ref not state
      if (isInterviewEndedRef.current) {
        appendLog("Interview ended during error handling.");
        return;
      }
      
      if (!gotResult) {
        const prevHistory = historyOverride || conversationHistory;
        const prompt = "Ask the user to speak up again politely because no input was detected.";
        const updatedHistory = prevHistory.concat({ role: "user", text: prompt });

        const retryPrompt = await callGeminiAPI(updatedHistory);
        appendLog("Interviewer: " + retryPrompt);
        await speakTextNormal(retryPrompt);
        
        const updatedConversationHistory = updatedHistory.concat({ role: "model", text: retryPrompt });
        setConversationHistory(updatedConversationHistory);
        
        // Continue the conversation if interview is still active
        if (!isInterviewEndedRef.current) {
          recordUserAnswer(updatedConversationHistory);
        } else {
          appendLog("Interview ended during retry - stopping conversation.");
        }
      }
    };


  };

  // If showing analysis page
  if (showAnalysis) {
    return (
      <InterviewAnalysis 
        confidenceData={confidenceHistory} 
        chatHistory={conversationHistory}
      />
    );
  }

  return (
    <>
      <div className="flex-1 bg-white/10 relative rounded-xl">
        <div className="absolute z-20 p-2 flex justify-between w-full">
          <div className={`text-xl font-semibold ${(confidence < 20) ? "text-red-500" : "text-green-400"}`}>
            Confidence: {confidence}
          </div>
          <div className={`text-xl font-semibold ${timeRemaining < 60 ? "text-red-500 animate-pulse" : "text-white"}`}>
            Time: {formatTime(timeRemaining)}
          </div>
        </div>
        <video ref={videoRef} autoPlay playsInline className={`border rounded-xl object-cover scale-x-[-1] ${changeMode ? "w-[25%] h-[25%] absolute right-0 bottom-0 m-1" : "w-full h-full"}`} />
        <div className={`bg-black rounded-xl ${changeMode ? "w-full h-full" : "absolute right-0 bottom-0 w-[25%] h-[25%] m-1"}`}></div>
        <div className="w-full h-14 absolute bottom-0 mb-5 flex justify-center items-center gap-10">
          <i className="ri-camera-switch-fill text-2xl bg-white/15 p-4 rounded-full cursor-pointer" onClick={() => setChangeMode(!changeMode)}></i>
          <i className={`${micMuted ? "ri-mic-off-fill" : "ri-mic-fill"} text-2xl bg-white/15 p-4 rounded-full cursor-pointer`} onClick={toggleMic}></i>
          <i className="ri-phone-fill text-2xl bg-red-500 p-4 rounded-full cursor-pointer" onClick={stopCamera}></i>
        </div>
      </div>

      <div className="mt-60">
        <i className="ri-contract-left-right-line text-center text-2xl bg-white/20 p-2 rounded-full mx-3" onClick={() => setCloseChat(!closeChat)}></i>
      </div>

      <div className={`bg-white overflow-auto rounded-xl transition-all duration-300 ease-in-out ${closeChat ? "w-0 absolute right-0" : "w-[30%] h-screen p-4"}`}>
        <h2 className="font-bold mb-2">Interview Log</h2>
        <pre className="whitespace-pre-wrap text-sm text-black">
          {logText}</pre>
      </div>
      
      {/* Completion Modal */}
      {showCompletionModal && (
        <InterviewCompletionModal 
          onAnalysis={handleGoToAnalysis} 
          onHome={handleGoToHome} 
        />
      )}
    </>
  );
}

export default Interview;