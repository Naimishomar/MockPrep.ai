import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarCompo from './Sidebar'
import { SidebarProvider } from './ui/sidebar'
import ScrollVelocity from './reactBitsComponents/ScrollVelocity';

function HomeOutlet() {
  return (
    <div className='flex'>
        <SidebarProvider>
            <SidebarCompo/>
            <div className="absolute top-50 inset-0 z-0 pointer-events-none">
              <ScrollVelocity 
                texts={['MockPrep.ai', 'Start Practicing Interviews']} 
                velocity={100} 
                className="opacity-15" // optional styling
              />
            </div>
            <Outlet/>
        </SidebarProvider>
    </div>
  )
}

export default HomeOutlet