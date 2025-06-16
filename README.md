# MockPrep.ai

**AI-Powered Mock Interview Platform**

MockPrep.ai is a real-time, voice-driven interview simulator designed to help you practice for role-specific interviews. Leveraging cutting-edge LLMs, text-to-speech, and speech-to-text, it dynamically generates questions, handles interruptions, and provides feedback on your responses.

---

## 🚀 Key Features

- **Dynamic Question Generation**  
  Uses Google’s Gemini API to generate role-based interview questions on the fly.

- **Real-Time Voice Interaction**  
  - **Text-to-Speech**: ElevenLabs TTS converts generated questions to natural-sounding audio.  
  - **Speech-to-Text**: Web Speech API captures and transcribes your answers in real time.

- **Interrupt Handling & Follow-Ups**  
  Automatically detects hesitation or off-topic responses and issues clarifying or challenging follow-up questions.

- **Response Analysis & Feedback**  
  Provides immediate, AI-driven feedback on content relevance, depth, and communication style.

- **Customizable Roles & Difficulty**  
  Select from predefined roles (e.g., Software Engineer, Data Scientist) and adjust question difficulty.

---

## 📦 Tech Stack

- **Frontend**:  
  - React  
  - Web Speech API  

- **Backend**:  
  - Python · Flask  
  - Gemini API (question generation)  
  - ElevenLabs API (text-to-speech)  

- **Deployment**:  
  - Dockerized services  
  - (Placeholder for your hosting platform)

---

## 🛠️ Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Naimishomar/mockprep.ai.git
   cd mockprep.ai
