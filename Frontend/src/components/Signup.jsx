import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase.js";

function Signup() {
  const [Name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ProfilePicture, setProfilePicture] = useState("");
  const [Value, setValue] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          email: Email,
          step: "send",
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setShowDialog(true);
      }
      toast.error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const userRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          username: Username,
          email: Email,
          contactNumber: ContactNumber,
          password: Password,
          profilePicture: ProfilePicture,
          otp: Value,
          step: "register",
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.userDetails);
        toast.success(data.message);
        navigate("/login");
      }
      toast.error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error", error);
    }
  };

  return (
    <div className="mt-15 w-screen h-fit py-10 bg-black/80 flex justify-center items-center">
      <i class="ri-bar-chart-box-ai-line text-5xl fixed rotate-12 text-blue-400 top-45 left-30 iconMove"></i>
      <i class="ri-presentation-fill text-5xl fixed rotate-12 text-pink-400 top-15 right-30 iconMove"></i>
      <i class="ri-chat-voice-ai-fill text-5xl fixed rotate-12 text-yellow-400 bottom-35 right-60 iconMove"></i>
      <div className="w-110 p-4 bg-white/10 rounded-xl bg-gradient-to-bl from-[#1a1a1a] via-[#2a2a2a] to-[#000000] shadow-2xl mx-5">
        <div className="flex justify-center items-center gap-2">
          <img
            src="/image-removebg-preview.png"
            alt="logo"
            className="invert-100 w-12"
          />
          <p className="text-2xl font-semibold text-white/80 ">MockPrep</p>
        </div>
        <h1 className="text-center text-2xl font-semibold mt-2 mb-3 text-white/80">
          Sign up
        </h1>
        <div className="flex space-x-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-blue-400">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                className="h-12"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-red-400">Username</Label>
              <Input
                type="text"
                placeholder="Username"
                className="h-12"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
        </div>
        <div className="grid w-full items-center gap-1.5 my-3">
          <Label className="text-pink-400">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            className="h-12"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-purple-400">Contact Number</Label>
              <Input
                type="text"
                placeholder="Contact number"
                className="h-12"
                value={ContactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
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
        </div>
        <div className="grid w-full items-center gap-1.5 my-3">
          <Label className="text-green-400">Profile Picture</Label>
          <Input
            type="file"
            placeholder="Profile picture"
            className="h-12"
            value={ProfilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <Button
            className="w-full text-center mt-3 px-7 py-5 bg-blue-400 hover:bg-blue-500 cursor-pointer"
            onClick={sendOtp}
          >
            Send OTP
          </Button>
          <DialogContent className="bg-gradient-to-bl from-[#1a1a1a] via-[#2a2a2a] to-[#000000] shadow-2xl text-white border-none">
            <DialogHeader>
              <DialogTitle className="flex justify-center items-center gap-4">
                <img
                  className="w-13 invert"
                  src="/image-removebg-preview.png"
                  alt="logo"
                />
                <h1 className="text-2xl font-bold">MockPrep</h1>
              </DialogTitle>
              <DialogTitle className="text-center mt-5">
                <p>Please enter your OTP</p>
              </DialogTitle>
              <DialogDescription className="mt-1">
                <div className="space-y-2">
                  <InputOTP
                    maxLength={6}
                    value={Value}
                    onChange={(value) => setValue(value)}
                  >
                    <InputOTPGroup className="text-white flex justify-center w-full">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="text-center text-sm">
                    {Value === "" ? (
                      <>
                        Please enter the one-time password sent to your email.
                      </>
                    ) : (
                      <>You entered: {Value}</>
                    )}
                  </div>
                  <Button
                    className="w-full text-center mt-3 px-7 py-5 bg-blue-400 hover:bg-blue-500 cursor-pointer"
                    onClick={userRegister}
                  >
                    Sign up
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <p className="text-center my-3">OR</p>
        <Button className="w-full py-5 px-7 bg-white hover:bg-white/80 text-black cursor-pointer">
          <i class="ri-google-fill text-2xl" onClick={handleGoogleLogin}></i>
          Signup in with Google
        </Button>
        <p className="mt-1">
          Have an account?
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
