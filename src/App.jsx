// src/App.jsx
import React, { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"

import TopNav from "@/components/TopNav.jsx"
import BottomNav from "@/components/BottomNav.jsx"

// Public screens (lazy)
const YogaHome  = lazy(() => import("@/screens/YogaHome.jsx"))
const Classes   = lazy(() => import("@/screens/Classes.jsx"))
const Schedule  = lazy(() => import("@/screens/Schedule.jsx"))
const Settings  = lazy(() => import("@/screens/Settings.jsx"))
const Notifications = lazy(() => import("@/screens/Notifications.jsx")) // 👈 added
const Chat          = lazy(() => import("@/screens/Chat.jsx"))          // 👈 added

// Instructor area
import InstructorLayout from "@/instructor/Layout.jsx"
import ProtectedInstructorRoute from "@/instructor/components/ProtectedInstructorRoute.jsx"
const Dashboard  = lazy(() => import("@/instructor/pages/Dashboard.jsx"))
const IClasses   = lazy(() => import("@/instructor/pages/Classes.jsx"))
const ISchedule  = lazy(() => import("@/instructor/pages/Schedule.jsx"))
const IStudents  = lazy(() => import("@/instructor/pages/Students.jsx"))
const IEarnings  = lazy(() => import("@/instructor/pages/Earnings.jsx"))
const ISettings  = lazy(() => import("@/instructor/pages/Settings.jsx"))

function Loading() {
  return <div className="w-full py-10 text-center text-gray-500">Loading…</div>
}

export default function App() {
  return (
    <>
      <TopNav />

      <main className="pb-24">
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<YogaHome />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} /> {/* 👈 added */}
            <Route path="/chat" element={<Chat />} />                   {/* 👈 added */}

            {/* Instructor routes (guarded) */}
            
              <Route path="/instructor" element={<InstructorLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="classes" element={<IClasses />} />
                <Route path="schedule" element={<ISchedule />} />
                <Route path="students" element={<IStudents />} />
                <Route path="earnings" element={<IEarnings />} />
                <Route path="settings" element={<ISettings />} />
              </Route>
            

            {/* Fallback */}
            <Route path="*" element={<YogaHome />} />
          </Routes>
        </Suspense>
      </main>

      <BottomNav />
    </>
  )
}
