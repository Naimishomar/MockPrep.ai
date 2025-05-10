import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarCompo from './Sidebar'
import {SidebarProvider} from './ui/sidebar'

function HomeOutlet() {
  return (
    <div className='flex items-center'>
      <SidebarProvider>
        <SidebarCompo/>
        <Outlet/>
      </SidebarProvider>
    </div>
  )
}

export default HomeOutlet