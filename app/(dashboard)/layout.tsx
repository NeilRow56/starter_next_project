import Navbar from '@/components/dashboard-layout/Navbar'
import { Sidebar } from '@/components/dashboard-layout/Sidebar'

import React, { ReactNode } from 'react'

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col   md:flex-row md:overflow-hidden">
      <div className="w-20 flex-none border-gray-600 md:border-r lg:w-64">
        <Sidebar />
      </div>
      <div className="flex  w-full flex-col">
        <Navbar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
export default DashboardLayout
