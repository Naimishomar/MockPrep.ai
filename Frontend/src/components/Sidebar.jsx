import { Calendar, Home, Search, Settings, User, History, LogOut, Antenna, icons } from "lucide-react"
import { Link } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Top menu items.
const items = [
  {
    title: "Home",
    icon: Home,
    send: 'interview'
  },
  {
    title: "Book Mentor",
    icon: Antenna,
    send: 'mentor'
  },
  {
    title: "Profile",
    icon: User,
    send: 'profile'
  },
  {
    title: "History",
    icon: History,
    send: 'history'
  },
  {
    title: "Settings",
    icon: Settings,
  }
]

// Logout item
const logoutItem = {
  title: "Logout",
  icon: LogOut,
  send: 'logout' // or you can handle this with a handler instead of a route
}

function SidebarCompo() {
  return (
    <Sidebar className='mt-20 h-screen'>
      <SidebarContent className='bg-black text-white flex flex-col justify-between h-full'>
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className='text-white/40'>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className='py-1'>
                    <SidebarMenuButton asChild className='py-5 px-3'>
                      <Link to={item.send}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom Logout Button */}
        <div className="mb-20">
          <SidebarMenu>
            <SidebarMenuItem className='py-1'>
              <SidebarMenuButton asChild className='py-6 px-3 bg-red-500 hover:bg-red-600 hover:text-white'>
                <Link to={logoutItem.send}>
                  <logoutItem.icon />
                  <span>{logoutItem.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

export default SidebarCompo;
