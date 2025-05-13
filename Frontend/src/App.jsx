import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Resume from './components/Resume';
import News from './components/News';
import SubscriptionPlans from './components/Subscription';
import Profile from './components/Profile';
import HomeOutlet from './components/HomeOutlet';
import { Toaster } from "sonner";

// ✅ Auth Redirect Logic for "/"
function AuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8000/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);

        if (location.pathname === "/" && data.success) {
          navigate("/dashboard");
        }

        if (location.pathname.startsWith("/dashboard") && !data.success) {
          navigate("/");
        }
      } catch (err) {
        console.error("Verification failed", err);
        if (location.pathname.startsWith("/dashboard")) {
          navigate("/");
        }
      }
    };

    if (location.pathname === "/" || location.pathname.startsWith("/dashboard")) {
      checkAuth();
    }
  }, [location, navigate]);

  return null;
}


function App() {
  return (
    <BrowserRouter>
      <AuthRedirect />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<HomeOutlet />}>
            <Route index element={<Home />} />
            <Route path="interview" element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/resume" element={<Resume />} />
          <Route path="/news" element={<News />} />
          <Route path="/subscription" element={<SubscriptionPlans />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
    <BrowserRouter>
      <AuthRedirect />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<HomeOutlet />}>
            <Route index element={<Home />} />
            <Route path="interview" element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/resume" element={<Resume />} />
          <Route path="/news" element={<News />} />
          <Route path="/subscription" element={<SubscriptionPlans />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
