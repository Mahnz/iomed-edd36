import React, {useState} from 'react'
import Sidebar from '../components/Sidebar.js'
import TopBar from '../components/TopBar.js'
import DashboardCard from '../components/DashboardCard.js'

export default function Dashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    return (
        <div>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}/>
            <div>
                <TopBar onSidebarToggle={toggleSidebar}/>
                <div>
                    <DashboardCard/>
                </div>
            </div>
        </div>
    )
}