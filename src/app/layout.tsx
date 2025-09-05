// @ts-nocheck
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitEvolve - Seu App de Treino e Dieta',
  description: 'Aplicativo completo para controlar seus treinos de academia, dieta e evolução física com ciclos adaptativos inteligentes.',
  keywords: 'treino, academia, dieta, fitness, musculação, nutrição, exercícios',
  authors: [{ name: 'FitEvolve Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {children}
        </div>
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={false}
        />
      </body>
    </html>
  )
}