import './App.css'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import { Toaster } from "sonner";
import Resume from './components/Resume';
import News from './components/News';
import SubscriptionPlans from './components/Subscription';
import Profile from './components/Profile';
import HomeOutlet from './components/HomeOutlet';


const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<HomeOutlet/>}>
        <Route index element={<Home/>} /> 
        <Route path='interview' element={<Home/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
      <Route path='/resume' element={<Resume/>} />
      <Route path='/news' element={<News/>} />
      <Route path='/subscription' element={<SubscriptionPlans/>}/>
      <Route path='/profile' element={<Profile/>} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster/>
    </>
  )
}

export default App
