'use client'
// @ts-nocheck

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/lib/stores/user-store'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const { isOnboarded, isLoading } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isOnboarded) {
        router.push('/dashboard')
      } else {
        router.push('/onboarding')
      }
    }
  }, [isOnboarded, isLoading, router])

  // Loading state while checking user status
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-3xl font-bold text-white">FE</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FitEvolve</h1>
        <p className="text-gray-600 mb-6">Carregando sua jornada fitness...</p>
        <Loader2 className="animate-spin h-8 w-8 mx-auto text-blue-600" />
      </div>
    </div>
  )
}