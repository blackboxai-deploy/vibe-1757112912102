'use client'
// @ts-nocheck

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useUserStore } from '@/lib/stores/user-store'
import { useWorkoutStore } from '@/lib/stores/workout-store'
import { useNutritionStore } from '@/lib/stores/nutrition-store'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function DashboardPage() {
  const { user, nutritionGoals } = useUserStore()
  const { isWorkoutActive } = useWorkoutStore()
  const { getTodayNutrition, getTodayWater } = useNutritionStore()

  const todayNutrition = getTodayNutrition()
  const todayWater = getTodayWater()

  if (!user || !nutritionGoals) return null

  const calorieProgress = (todayNutrition.totalCalories / nutritionGoals.dailyCalories) * 100
  const proteinProgress = (todayNutrition.totalProtein / nutritionGoals.proteinGrams) * 100
  const waterProgress = (todayWater / nutritionGoals.waterMl) * 100

  const today = format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 capitalize">{today}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
          <Link href="/dashboard/treinos">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isWorkoutActive ? '▶️ Continuar Treino' : '💪 Iniciar Treino'}
            </Button>
          </Link>
          <Link href="/dashboard/dieta">
            <Button variant="outline">
              🥗 Adicionar Refeição
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calorias</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {todayNutrition.totalCalories}
                  </p>
                  <p className="text-sm text-gray-500">
                    / {nutritionGoals.dailyCalories}
                  </p>
                </div>
              </div>
              <div className="text-3xl">🔥</div>
            </div>
            <Progress value={Math.min(calorieProgress, 100)} className="mt-3" />
            <p className="text-xs text-gray-500 mt-2">
              {calorieProgress >= 100 ? 'Meta atingida!' : `${Math.round(100 - calorieProgress)}% restante`}
            </p>
          </CardContent>
        </Card>

        {/* Protein Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proteína</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {todayNutrition.totalProtein}g
                  </p>
                  <p className="text-sm text-gray-500">
                    / {nutritionGoals.proteinGrams}g
                  </p>
                </div>
              </div>
              <div className="text-3xl">💪</div>
            </div>
            <Progress value={Math.min(proteinProgress, 100)} className="mt-3" />
            <p className="text-xs text-gray-500 mt-2">
              {proteinProgress >= 100 ? 'Meta atingida!' : `${Math.round(nutritionGoals.proteinGrams - todayNutrition.totalProtein)}g restante`}
            </p>
          </CardContent>
        </Card>

        {/* Water Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hidratação</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {(todayWater / 1000).toFixed(1)}L
                  </p>
                  <p className="text-sm text-gray-500">
                    / {(nutritionGoals.waterMl / 1000).toFixed(1)}L
                  </p>
                </div>
              </div>
              <div className="text-3xl">💧</div>
            </div>
            <Progress value={Math.min(waterProgress, 100)} className="mt-3" />
            <p className="text-xs text-gray-500 mt-2">
              {waterProgress >= 100 ? 'Meta atingida!' : `${((nutritionGoals.waterMl - todayWater) / 1000).toFixed(1)}L restante`}
            </p>
          </CardContent>
        </Card>

        {/* Workout Status Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Treino Hoje</p>
                <div className="flex items-center space-x-2 mt-1">
                  {isWorkoutActive ? (
                    <>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Em Progresso
                      </Badge>
                    </>
                  ) : (
                    <p className="text-lg font-semibold text-gray-400">
                      Não iniciado
                    </p>
                  )}
                </div>
              </div>
              <div className="text-3xl">
                {isWorkoutActive ? '⚡' : '⏸️'}
              </div>
            </div>
            <div className="mt-3">
              <Link href="/dashboard/treinos">
                <Button size="sm" variant="outline" className="w-full">
                  {isWorkoutActive ? 'Continuar' : 'Iniciar Treino'}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nutrition Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📊</span>
              <span>Resumo Nutricional</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Calorias</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {todayNutrition.totalCalories}/{nutritionGoals.dailyCalories}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Proteína</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(proteinProgress, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {todayNutrition.totalProtein}g/{nutritionGoals.proteinGrams}g
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Carboidratos</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((todayNutrition.totalCarbs / nutritionGoals.carbsGrams) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {todayNutrition.totalCarbs}g/{nutritionGoals.carbsGrams}g
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gorduras</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((todayNutrition.totalFat / nutritionGoals.fatGrams) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {todayNutrition.totalFat}g/{nutritionGoals.fatGrams}g
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Link href="/dashboard/dieta">
                <Button variant="outline" size="sm" className="w-full">
                  Ver Detalhes da Dieta
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Ações Rápidas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Link href="/dashboard/dieta">
                  <Button variant="outline" size="sm" className="w-full h-auto py-3 flex-col">
                    <span className="text-lg mb-1">💧</span>
                    <span className="text-xs">Adicionar Água</span>
                  </Button>
                </Link>
                <Link href="/dashboard/dieta">
                  <Button variant="outline" size="sm" className="w-full h-auto py-3 flex-col">
                    <span className="text-lg mb-1">🍽️</span>
                    <span className="text-xs">Log Refeição</span>
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Link href="/dashboard/treinos">
                  <Button variant="outline" size="sm" className="w-full h-auto py-3 flex-col">
                    <span className="text-lg mb-1">📝</span>
                    <span className="text-xs">Plano Treino</span>
                  </Button>
                </Link>
                <Link href="/dashboard/progresso">
                  <Button variant="outline" size="sm" className="w-full h-auto py-3 flex-col">
                    <span className="text-lg mb-1">📈</span>
                    <span className="text-xs">Ver Progresso</span>
                  </Button>
                </Link>
              </div>

              <div className="pt-3 border-t">
                <div className="text-sm text-gray-600 mb-2">Lembrete do Dia</div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    💡 Mantenha-se consistente! A evolução vem com regularidade nos treinos e dieta.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🎯</span>
            <span>Seu Objetivo: {
              user.goal === 'lose_weight' ? 'Perder Peso' :
              user.goal === 'gain_muscle' ? 'Ganhar Massa Muscular' :
              user.goal === 'strength' ? 'Aumentar Força' :
              user.goal === 'maintain' ? 'Manter Forma' :
              'Melhorar Resistência'
            }</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{user.weeklyFrequency}</div>
              <div className="text-sm text-gray-600">Treinos/Semana</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{nutritionGoals.dailyCalories}</div>
              <div className="text-sm text-gray-600">Calorias/Dia</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {user.fitnessLevel === 'beginner' ? 'Iniciante' :
                 user.fitnessLevel === 'intermediate' ? 'Inter.' : 'Avançado'}
              </div>
              <div className="text-sm text-gray-600">Nível Atual</div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Link href="/dashboard/progresso">
              <Button variant="outline">
                📊 Ver Progresso Detalhado
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}