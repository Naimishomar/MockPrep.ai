import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@gradio/client";
import { motion, AnimatePresence } from "framer-motion"

function Interview({ skill, experience, resume, duration }) {

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const [changeMode, setchangeMode] = useState(false);
  const [cutCall, setcutCall] = useState(null);
  const [micMuted, setMicMuted] = useState(false);
  const [closeChat, setcloseChat] = useState(false);
  const [logText, setLogText] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [confidence, setConfidence] = useState(0);
  const hasStartedRef = useRef(false);

  const navigate = useNavigate();

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
        setcutCall(stream);
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
  }, []);

  const startConfidenceTracking = async () => {
    const client = await Client.connect("NavneetYadav207002/Confidence");
    intervalRef.current = setInterval(async () => {
      if (!videoRef.current) return;
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        let dateStr = new Date(Date.now()).toLocaleString();
        try {
          const result = await client.predict("/predict", {
            img: blob,
          });
          console.log(result.data[0].confidences[1].confidence , dateStr);
          const score = result.data[0].confidences[1].confidence;
          setConfidence(Math.round(score * 100));
        } catch (err) {
          console.error("Confidence fetch error:", err);
        }
      }, "image/png");
    }, 20000);
  };

  const stopConfidenceTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const stopCamera = () => {
    // Stop video/audio stream
    if (cutCall) {
      cutCall.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setcutCall(null);
      console.log("Call is disconnected");
    }

    stopConfidenceTracking()
  
    // Cancel any speaking
    if (audioRef.current) {
      if (audioRef.current instanceof Audio) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      speechSynthesis.cancel();
      audioRef.current = null;
    }
  
    // Cancel recognition
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onresult = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  
    // Reset session
    setSessionId(null);
    setQuestionCount(0);
    setConversationHistory([]);
  
    // Go home
    navigate("/");
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
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.3;
      utterance.pitch = 2;
      utterance.onend = () => {
        audioRef.current = null;
        resolve();
      };
      audioRef.current = utterance;
      speechSynthesis.speak(utterance);
    });
  };
  

  const callGeminiAPI = async (updatedHistory) => {
    const contents = updatedHistory.map((turn) => ({
      role: turn.role,
      parts: [{ text: turn.text }],
    }));

    const API_KEY = "AIzaSyDmRdVGppLT6FBq3ouKzk1YCxWNdAQTx0s";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
      include: "credentials"
    });

    const data = await response.json();
    const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "(No response)";

    return geminiText;
  };

  const startInterview = async () => {
    const id = "session-" + Date.now();
    setSessionId(id);
    setQuestionCount(0);
    
    const initialHistory = [
      {
        role: "user",
        text: `You are a friendly and professional Interviewer (Name Yourself Randomly) Interviewing a student for ${skill} role. they have ${experience} years of experience. ask a mix of hard and simple problem one by one ask practical yet unique question. Keep the interview concise and on-topic. dont ask long question`,
      },
    ];
    setConversationHistory(initialHistory);

    // appendLog(`Session ID: ${id}`);

    const welcome = await callGeminiAPI(initialHistory.concat({
      role: "user",
      text: "Start the interview. Welcome me and ask me to introduce myself. in one line"
    }));

    appendLog("Interviewer: " + welcome);
    await speakTextNormal(welcome);
    recordUserAnswer(initialHistory.concat({ role: "model", text: welcome }));
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

    appendLog("Listening for answer...");
    let gotResult = false;

    recognition.start();

    recognition.onresult = async (event) => {
      gotResult = true;
      recognition.stop();
      const text = event.results[0][0].transcript;
      appendLog("User: " + text);

      const nextCount = questionCount + 1;
      setQuestionCount(nextCount);

      const prevHistory = historyOverride || conversationHistory;
      const updatedHistory = prevHistory.concat({ role: "user", text });

      if (nextCount >= 5) {
        const goodbye = await callGeminiAPI(
          updatedHistory.concat({ role: "user", text: "Say goodbye and end the interview." })
        );
        appendLog("Interviewer: " + goodbye);
        await speakTextNormal(goodbye);
      } else {
        const nextQuestion = await callGeminiAPI(updatedHistory);
        appendLog("Interviewer: " + nextQuestion);
        await speakTextNormal(nextQuestion);
        recordUserAnswer(updatedHistory.concat({ role: "model", text: nextQuestion }));
      }

      setConversationHistory(updatedHistory);
    };

    recognition.onerror = async () => {
      recognition.stop();
      if (!gotResult) {
        const prevHistory = historyOverride || conversationHistory;
        const prompt = "Ask the user to speak up again politely because no input was detected.";
        const updatedHistory = prevHistory.concat({ role: "user", text: prompt });

        const retryPrompt = await callGeminiAPI(updatedHistory);
        appendLog("Interviewer: " + retryPrompt);
        await speakTextNormal(retryPrompt);
        recordUserAnswer(updatedHistory.concat({ role: "model", text: retryPrompt }));

        setConversationHistory(updatedHistory);
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full h-screen bg-black text-white overflow-hidden">
      {/* Left Panel - Video Feed */}
      <div className="flex-1 relative m-3 rounded-xl shadow-xl overflow-hidden bg-black border">
        {/* Confidence Badge */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className={`absolute top-3 left-3 z-10 px-4 py-1 text-sm font-semibold rounded-full backdrop-blur-md shadow-md
            ${confidence < 50 ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}
        >
          Confidence: {confidence}%
        </motion.div>

        {/* Video Feed */}
        <motion.video
          ref={videoRef}
          autoPlay
          playsInline
          className={`rounded-xl object-cover scale-x-[-1] transition-all duration-500 ease-in-out z-10
            ${changeMode ? "w-[25vw] h-[35vh] absolute bottom-4 right-4" : "w-full h-full"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Dark Overlay */}
        <motion.div
          className={`absolute bg-black rounded-xl transition-all duration-500 z-0
            ${changeMode ? "w-full h-full" : "w-[25vw] h-[35vh] absolute bottom-4 right-4"}`}
        />

        {/* Control Buttons */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-6 items-center z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.i
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setchangeMode(!changeMode)}
            className="ri-camera-switch-fill text-2xl bg-white/20 p-4 rounded-full backdrop-blur-md cursor-pointer"
          />
          <motion.i
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={toggleMic}
            className={`text-2xl p-4 rounded-full backdrop-blur-md cursor-pointer 
              ${micMuted ? "ri-mic-off-fill bg-red-500 text-white" : "ri-mic-fill bg-white/20 text-white"}`}
          />
          <motion.i
            whileTap={{ scale: 0.9 }}
            whileHover={{ rotate: 15 }}
            onClick={stopCamera}
            className="ri-phone-fill text-2xl bg-red-600 p-4 rounded-full text-white shadow-md cursor-pointer"
          />
        </motion.div>
      </div>

      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-5 left-5 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.i
          onClick={() => setcloseChat(!closeChat)}
          className="ri-contract-left-right-line text-2xl bg-white/20 hover:bg-white/30 p-3 rounded-full shadow-lg cursor-pointer"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1 }}
        />{(closeChat)? <p>Open Chat</p>:<p>Close Chat</p>}
      </motion.div>

      {/* Right Panel - Chat Log */}
      <AnimatePresence>
        {!closeChat && (
          <motion.div
            key="chat-log"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            className="absolute right-0 w-full md:w-[50%] lg:w-[30%] h-screen bg-black/90 text-white rounded-l-2xl p-6 z-30 shadow-2xl overflow-auto"
          >
            <h2 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Interview Chats</h2>
            <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
              {logText}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}

export default Interview;