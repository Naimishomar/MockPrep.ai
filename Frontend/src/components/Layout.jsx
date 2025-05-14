import React from "react";
import {Outlet, useLocation} from 'react-router-dom'
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/dashboard');
  const hideLoginFooter = location.pathname.startsWith('/login');

  
  
  return (
    <div className="bg-black text-white overflow-x-hidden">
        <Header/>
        <Outlet/>
        {!hideFooter && !hideLoginFooter && <Footer />}
    </div>
  )
}

export default Layout