import React, { useEffect } from "react";

function InterviewCompletionModal({ onAnalysis, onHome }) {
  useEffect(() => {
    // Start confetti animation when component mounts
    startConfetti();
    
    // Clean up confetti when component unmounts
    return () => {
      stopConfetti();
    };
  }, []);

  // Simple confetti animation
  const startConfetti = () => {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 150;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 5 + 3,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        speed: Math.random() * 2 + 1
      });
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        // Move particle
        p.y += p.speed;
        
        // Reset when out of screen
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });
      
      window.confettiAnimationId = requestAnimationFrame(animate);
    }
    
    animate();
  };
  
  const stopConfetti = () => {
    if (window.confettiAnimationId) {
      cancelAnimationFrame(window.confettiAnimationId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <canvas id="confetti-canvas" className="absolute inset-0 z-0"></canvas>
      
      <div className="bg-white rounded-xl p-8 max-w-md w-full z-10 shadow-2xl transform transition-all duration-500 animate-bounce-once">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-green-500 text-4xl"></i>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Interview Complete!</h2>
          <p className="text-gray-600 mb-6">
            Great job! You've successfully completed your interview.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onAnalysis}
              className="bg-blue-600 text-white rounded-lg py-3 px-6 font-medium hover:bg-blue-700 transition-colors"
            >
              View Analysis
            </button>
            
            <button 
              onClick={onHome}
              className="bg-gray-200 text-gray-800 rounded-lg py-3 px-6 font-medium hover:bg-gray-300 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewCompletionModal;