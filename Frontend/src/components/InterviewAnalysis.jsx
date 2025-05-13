import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function InterviewAnalysis({ confidenceData, chatHistory }) {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    // Format confidence data for the chart
    if (confidenceData && confidenceData.length > 0) {
      const formatted = confidenceData.map((item, index) => ({
        time: new Date(item.timestamp).toLocaleTimeString(),
        confidence: item.value,
      }));
      setFormattedData(formatted);
    }
  }, [confidenceData]);

  return (
    <div className="bg-black rounded-xl p-6 w-full h-screen overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Interview Analysis</h1>
      
      {/* Confidence Time Series Chart */}
      <div className="mb-8 bg-black">
        <h2 className="text-xl font-semibold mb-4">Confidence Metrics</h2>
        {formattedData.length > 0 ? (
          <div className="h-64 w-full bg-black">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="confidence" 
                  stroke="#4CAF50" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-gray-500">No confidence data available</div>
        )}
      </div>
      
      {/* Chat History */}
      <div bg-black>
        <h2 className="text-xl font-semibold mb-4">Interview Transcript</h2>
        <div className="border rounded-lg p-4 bg-black max-h-96 overflow-auto">
          {chatHistory && chatHistory.length > 0 ? (
            chatHistory.map((message, index) => (
              <div key={index} className="mb-4">
                <div className={`font-semibold ${message.role === "model" ? "text-blue-600" : "text-green-600"}`}>
                  {message.role === "model" ? "Interviewer" : "You"}:
                </div>
                <div className="pl-4 mt-1">{message.text}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No chat history available</div>
          )}
        </div>
      </div>
      
      {/* Summary and Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Average Confidence</h3>
          <div className="text-2xl font-bold">
            {formattedData.length > 0
              ? Math.round(
                  formattedData.reduce((sum, item) => sum + item.confidence, 0) /
                    formattedData.length
                )
              : "N/A"}
            %
          </div>
        </div>
        
        <div className="bg-black p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Interview Duration</h3>
          <div className="text-2xl font-bold">
            {chatHistory && chatHistory.length > 0
              ? `${Math.round(chatHistory.length / 2)} mins`
              : "N/A"}
          </div>
        </div>
        
        <div className="bg-black p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Response Count</h3>
          <div className="text-2xl font-bold">
            {chatHistory ? chatHistory.filter(msg => msg.role === "user").length : "0"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewAnalysis;