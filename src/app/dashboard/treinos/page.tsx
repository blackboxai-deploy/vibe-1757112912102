'use client'
// @ts-nocheck

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useWorkoutStore } from '@/lib/stores/workout-store'
import { useUserStore } from '@/lib/stores/user-store'
import { EXERCISE_LIBRARY, EXERCISE_CATEGORIES, getExercisesByCategory, searchExercises } from '@/lib/data/exercises'

export default function TreinosPage() {
  const { user } = useUserStore()
  const { currentSession, isWorkoutActive, startWorkout, endWorkout } = useWorkoutStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('planos')

  if (!user) return null

  const filteredExercises = searchQuery 
    ? searchExercises(searchQuery)
    : selectedCategory === 'all' 
      ? EXERCISE_LIBRARY 
      : getExercisesByCategory(selectedCategory)

  const handleStartWorkout = () => {
    // For demo purposes, create a simple workout
    const sampleWorkoutDayId = 'workout_day_1'
    startWorkout(sampleWorkoutDayId)
    setActiveTab('sessao')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            💪 Treinos
          </h1>
          <p className="text-gray-600">
            Gerencie seus exercícios e sessões de treino
          </p>
        </div>
        
        {!isWorkoutActive && (
          <Button 
            onClick={handleStartWorkout}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-4 sm:mt-0"
          >
            🚀 Iniciar Treino
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="planos">📋 Planos</TabsTrigger>
          <TabsTrigger value="sessao" disabled={!isWorkoutActive}>
            ⚡ Sessão Ativa
          </TabsTrigger>
          <TabsTrigger value="biblioteca">📚 Biblioteca</TabsTrigger>
          <TabsTrigger value="historico">📊 Histórico</TabsTrigger>
        </TabsList>

        {/* Workout Plans Tab */}
        <TabsContent value="planos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Sample Workout Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Push/Pull/Legs
                  <Badge variant="secondary">Recomendado</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <div>📅 3-4 dias por semana</div>
                    <div>⏱️ 60-90 min por sessão</div>
                    <div>🎯 Hipertrofia e força</div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="text-sm">
                      <strong>Push:</strong> Peito, Ombros, Tríceps
                    </div>
                    <div className="text-sm">
                      <strong>Pull:</strong> Costas, Bíceps
                    </div>
                    <div className="text-sm">
                      <strong>Legs:</strong> Pernas, Glúteos
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Personalizar Plano
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Full Body
                  <Badge variant="outline">Iniciante</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <div>📅 3 dias por semana</div>
                    <div>⏱️ 45-60 min por sessão</div>
                    <div>🎯 Condicionamento geral</div>
                  </div>
                  <div className="text-sm">
                    Treino completo do corpo em cada sessão. Ideal para iniciantes ou quem tem pouco tempo.
                  </div>
                  <Button variant="outline" className="w-full">
                    Personalizar Plano
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="text-4xl mb-4">➕</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Criar Novo Plano
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Monte seu plano personalizado com base em seus objetivos
                </p>
                <Button variant="outline">
                  Começar
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Active Session Tab */}
        <TabsContent value="sessao" className="space-y-6">
          {isWorkoutActive && currentSession ? (
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <span>⚡</span>
                      <span>Treino em Andamento</span>
                    </span>
                    <Badge className="bg-green-500">Ativo</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Iniciado às {new Date(currentSession.startTime).toLocaleTimeString()}
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={endWorkout}
                    >
                      Finalizar Treino
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Exercise List for Active Session */}
              <div className="space-y-4">
                {currentSession.completedExercises.map((exercise, index) => (
                  <Card key={exercise.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Exercício {index + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600">
                        Séries concluídas: {exercise.sets.length}
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        Adicionar Série
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">⏸️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nenhum treino ativo
                </h3>
                <p className="text-gray-600 mb-4">
                  Inicie um treino para começar a registrar seus exercícios
                </p>
                <Button onClick={handleStartWorkout}>
                  Iniciar Treino
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Exercise Library Tab */}
        <TabsContent value="biblioteca" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar exercícios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os exercícios</SelectItem>
                {EXERCISE_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  {exercise.imageUrl && (
                    <img 
                      src={exercise.imageUrl} 
                      alt={exercise.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {exercise.name}
                      </h3>
                      <Badge 
                        variant={exercise.type === 'compound' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {exercise.type === 'compound' ? 'Composto' : 
                         exercise.type === 'isolation' ? 'Isolado' : 'Cardio'}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-gray-600">
                      <div>🎯 {exercise.primaryMuscles.join(', ')}</div>
                      <div>⚖️ {exercise.equipment.join(', ')}</div>
                      <div>🔄 {exercise.repRangeMin}-{exercise.repRangeMax} reps</div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Nenhum exercício encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar sua pesquisa ou filtros
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="historico" className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Histórico de Treinos
              </h3>
              <p className="text-gray-600 mb-4">
                Complete alguns treinos para ver seu histórico aqui
              </p>
              <Button variant="outline">
                Ver Estatísticas
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}