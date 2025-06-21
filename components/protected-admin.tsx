"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { AdminLogin } from "./admin-login"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface ProtectedAdminProps {
  children: React.ReactNode
}

export function ProtectedAdmin({ children }: ProtectedAdminProps) {
  const { isAuthenticated, logout, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return (
    <div>
      {/* Admin Header with Logout */}
      <div className="bg-slate-900 text-white px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="text-white border-white hover:bg-white hover:text-slate-900"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
      {children}
    </div>
  )
}
