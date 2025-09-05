'use client'
// @ts-nocheck

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useUserStore } from '@/lib/stores/user-store'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: '🏠',
    description: 'Visão geral'
  },
  { 
    name: 'Treinos', 
    href: '/dashboard/treinos', 
    icon: '💪',
    description: 'Exercícios e sessões'
  },
  { 
    name: 'Dieta', 
    href: '/dashboard/dieta', 
    icon: '🥗',
    description: 'Alimentação e água'
  },
  { 
    name: 'Progresso', 
    href: '/dashboard/progresso', 
    icon: '📊',
    description: 'Evolução e métricas'
  },
  { 
    name: 'Perfil', 
    href: '/dashboard/perfil', 
    icon: '⚙️',
    description: 'Configurações'
  }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useUserStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/onboarding')
  }

  if (!user) {
    router.push('/onboarding')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">FE</span>
            </div>
            <span className="font-bold text-lg">FitEvolve</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </Button>
        </div>
      </div>

      <div className="lg:flex">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center space-x-3 p-6 border-b">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">FE</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">FitEvolve</h1>
                <p className="text-sm text-gray-600">Sua evolução fitness</p>
              </div>
            </div>

            {/* User info */}
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Olá, {user.name.split(' ')[0]}!
                  </p>
                  <p className="text-sm text-gray-600">
                    {user.goal === 'lose_weight' && '🎯 Perder peso'}
                    {user.goal === 'gain_muscle' && '💪 Ganhar músculo'}
                    {user.goal === 'strength' && '⚡ Aumentar força'}
                    {user.goal === 'maintain' && '⚖️ Manter forma'}
                    {user.goal === 'endurance' && '🏃 Resistência'}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-l-4 border-blue-500' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="text-lg mr-3">{item.icon}</span>
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-gray-600 hover:text-gray-900"
              >
                🚪 Sair
              </Button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-0">
          <div className="px-4 py-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}