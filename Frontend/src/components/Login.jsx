import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../firebase/firebase.js";
// import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Username,
          password: Password,
        }),
        credentials: "include",
      });
      const data = await response.json(); 
      const token = data.token;
      if (data.success) {
        console.log(token);
        toast.success(data.message);
        navigate("/dashboard");
      }
      toast.error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     console.log("User Info:", user);
  //     navigate("/dashboard", { state: user.email });
  //   } catch (error) {
  //     console.error("Google Sign-In Error", error);
  //   }
  // };

  const handleGoogleLogin = async(credentialResponse)=>{
    try {
      const token = credentialResponse.credential;
      const response = await fetch('http://localhost:8000/google/verify',{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        credentials: "include",
        token
      }); 
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error();
    }
  }

  return (
    <div className="mt-20 w-full h-fit py-10 bg-black/80 flex justify-center items-center">
      <i class="ri-bar-chart-box-ai-line text-5xl fixed rotate-12 text-blue-400 top-45 left-30 iconMove"></i>
      <i class="ri-presentation-fill text-5xl fixed rotate-12 text-pink-400 top-15 right-30 iconMove"></i>
      <i class="ri-chat-voice-ai-fill text-5xl fixed rotate-12 text-yellow-400 bottom-35 right-60 iconMove"></i>
      <div className="w-100 p-4 bg-white/10 rounded-xl bg-gradient-to-bl from-[#1a1a1a] via-[#2a2a2a] to-[#000000] shadow-2xl">
        <div className="flex justify-center items-center gap-2">
          <img
            src="/image-removebg-preview.png"
            alt="logo"
            className="invert-100 w-12"
          />
          <p className="text-2xl font-semibold text-white/80 ">MockPrep</p>
        </div>
        <h1 className="text-center text-2xl font-semibold m-5 text-white/80 ">
          Login
        </h1>
        <form onSubmit={userLogin}>
          <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
            <Label className="text-red-400">Username</Label>
            <Input
              type="text"
              placeholder="Username"
              className="h-12"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-yellow-400">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              className="h-12"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-center mt-3 px-7 py-5 bg-blue-400 hover:bg-blue-500 cursor-pointer"
          >
            Login
          </Button>
        </form>
        <p className="text-center my-3">OR</p>
        <Button
          className="w-full py-5 px-7 bg-white hover:bg-white/80 text-black cursor-pointer"
          onClick={handleGoogleLogin}
        >
          <i class="ri-google-fill text-2xl"></i>Sign in in with Google
        </Button>
        <p className="mt-1">
          Don't vave an account?
          <Link to="/signup" className="text-blue-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
