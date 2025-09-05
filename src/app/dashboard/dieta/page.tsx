'use client'
// @ts-nocheck

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useUserStore } from '@/lib/stores/user-store'
import { useNutritionStore } from '@/lib/stores/nutrition-store'
import { BRAZILIAN_FOODS, searchFoods, QUICK_ADD_MEALS } from '@/lib/data/foods'
import { MealEntry, FoodEntry } from '@/lib/types'
import { toast } from 'sonner'

const MEAL_TYPES = [
  { id: 'breakfast', name: 'Café da Manhã', icon: '🌅' },
  { id: 'morning_snack', name: 'Lanche da Manhã', icon: '☕' },
  { id: 'lunch', name: 'Almoço', icon: '🍽️' },
  { id: 'afternoon_snack', name: 'Lanche da Tarde', icon: '🍎' },
  { id: 'dinner', name: 'Jantar', icon: '🌙' },
  { id: 'evening_snack', name: 'Lanche da Noite', icon: '🥛' }
] as const

export default function DietaPage() {
  const { user, nutritionGoals } = useUserStore()
  const { 
    getTodayNutrition, 
    getTodayWater, 
    addMealEntry, 
    addWaterEntry,
    getTodayMeals 
  } = useNutritionStore()

  const [selectedMealType, setSelectedMealType] = useState<string>('breakfast')
  const [foodSearch, setFoodSearch] = useState('')
  const [isAddFoodDialogOpen, setIsAddFoodDialogOpen] = useState(false)
  const [selectedFoods, setSelectedFoods] = useState<Array<{ food: any, quantity: number }>>([])

  if (!user || !nutritionGoals) return null

  const todayNutrition = getTodayNutrition()
  const todayWater = getTodayWater()
  const todayMeals = getTodayMeals()

  const calorieProgress = (todayNutrition.totalCalories / nutritionGoals.dailyCalories) * 100
  const proteinProgress = (todayNutrition.totalProtein / nutritionGoals.proteinGrams) * 100
  const waterProgress = (todayWater / nutritionGoals.waterMl) * 100

  const searchResults = foodSearch ? searchFoods(foodSearch) : BRAZILIAN_FOODS.slice(0, 20)

  const handleAddWater = (amount: number) => {
    addWaterEntry(amount)
    toast.success(`${amount}ml de água adicionado!`)
  }

  const handleAddFood = (food: any, quantity: number) => {
    setSelectedFoods(prev => [...prev, { food, quantity }])
  }

  const handleSaveMeal = () => {
    if (selectedFoods.length === 0) return

    const foodEntries: FoodEntry[] = selectedFoods.map(({ food, quantity }) => {
      const multiplier = quantity / food.servingSize
      return {
        id: `food_entry_${Date.now()}_${Math.random()}`,
        foodId: food.id,
        quantity: quantity,
        calories: Math.round(food.calories * multiplier),
        protein: Math.round(food.protein * multiplier * 10) / 10,
        carbs: Math.round(food.carbs * multiplier * 10) / 10,
        fat: Math.round(food.fat * multiplier * 10) / 10
      }
    })

    const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories, 0)
    const totalProtein = foodEntries.reduce((sum, entry) => sum + entry.protein, 0)
    const totalCarbs = foodEntries.reduce((sum, entry) => sum + entry.carbs, 0)
    const totalFat = foodEntries.reduce((sum, entry) => sum + entry.fat, 0)

    const mealEntry: MealEntry = {
      id: `meal_${Date.now()}`,
      userId: user.id,
      date: new Date(),
      mealType: selectedMealType as any,
      foods: foodEntries,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat
    }

    addMealEntry(mealEntry)
    setSelectedFoods([])
    setIsAddFoodDialogOpen(false)
    toast.success('Refeição adicionada com sucesso!')
  }

  const addQuickMeal = (quickMeal: any) => {
    const foodEntries: FoodEntry[] = quickMeal.foods.map((item: any) => {
      const food = BRAZILIAN_FOODS.find(f => f.id === item.foodId)
      if (!food) return null

      const multiplier = item.quantity / food.servingSize
      return {
        id: `food_entry_${Date.now()}_${Math.random()}`,
        foodId: food.id,
        quantity: item.quantity,
        calories: Math.round(food.calories * multiplier),
        protein: Math.round(food.protein * multiplier * 10) / 10,
        carbs: Math.round(food.carbs * multiplier * 10) / 10,
        fat: Math.round(food.fat * multiplier * 10) / 10
      }
    }).filter(Boolean)

    const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories, 0)
    const totalProtein = foodEntries.reduce((sum, entry) => sum + entry.protein, 0)
    const totalCarbs = foodEntries.reduce((sum, entry) => sum + entry.carbs, 0)
    const totalFat = foodEntries.reduce((sum, entry) => sum + entry.fat, 0)

    const mealEntry: MealEntry = {
      id: `meal_${Date.now()}`,
      userId: user.id,
      date: new Date(),
      mealType: selectedMealType as any,
      foods: foodEntries,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat
    }

    addMealEntry(mealEntry)
    toast.success(`${quickMeal.name} adicionado!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            🥗 Dieta & Nutrição
          </h1>
          <p className="text-gray-600">
            Acompanhe sua alimentação e hidratação diária
          </p>
        </div>
      </div>

      {/* Daily Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Calorias</span>
              <span className="text-2xl">🔥</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold">{todayNutrition.totalCalories}</span>
                <span className="text-sm text-gray-500">/ {nutritionGoals.dailyCalories}</span>
              </div>
              <Progress value={Math.min(calorieProgress, 100)} />
              <p className="text-xs text-gray-500">
                {calorieProgress >= 100 ? 'Meta atingida!' : `${Math.round(100 - calorieProgress)}% restante`}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Proteína</span>
              <span className="text-2xl">💪</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold">{todayNutrition.totalProtein}g</span>
                <span className="text-sm text-gray-500">/ {nutritionGoals.proteinGrams}g</span>
              </div>
              <Progress value={Math.min(proteinProgress, 100)} />
              <p className="text-xs text-gray-500">
                {proteinProgress >= 100 ? 'Meta atingida!' : `${Math.round(nutritionGoals.proteinGrams - todayNutrition.totalProtein)}g restante`}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Carboidratos</span>
              <span className="text-2xl">🌾</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold">{todayNutrition.totalCarbs}g</span>
                <span className="text-sm text-gray-500">/ {nutritionGoals.carbsGrams}g</span>
              </div>
              <Progress value={Math.min((todayNutrition.totalCarbs / nutritionGoals.carbsGrams) * 100, 100)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Hidratação</span>
              <span className="text-2xl">💧</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold">{(todayWater / 1000).toFixed(1)}L</span>
                <span className="text-sm text-gray-500">/ {(nutritionGoals.waterMl / 1000).toFixed(1)}L</span>
              </div>
              <Progress value={Math.min(waterProgress, 100)} />
              <div className="flex gap-1 mt-2">
                <Button size="sm" variant="outline" onClick={() => handleAddWater(250)}>
                  +250ml
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleAddWater(500)}>
                  +500ml
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList>
          <TabsTrigger value="today">Hoje</TabsTrigger>
          <TabsTrigger value="add">Adicionar</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        {/* Today's Meals */}
        <TabsContent value="today" className="space-y-4">
          {MEAL_TYPES.map(mealType => {
            const mealsOfType = todayMeals.filter(meal => meal.mealType === mealType.id)
            const totalCalories = mealsOfType.reduce((sum, meal) => sum + meal.totalCalories, 0)
            
            return (
              <Card key={mealType.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <span>{mealType.icon}</span>
                      <span>{mealType.name}</span>
                    </span>
                    <span className="text-sm font-normal text-gray-600">
                      {totalCalories > 0 ? `${totalCalories} kcal` : ''}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mealsOfType.length > 0 ? (
                    <div className="space-y-2">
                      {mealsOfType.map(meal => (
                        <div key={meal.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              {meal.foods.map(food => {
                                const foodData = BRAZILIAN_FOODS.find(f => f.id === food.foodId)
                                return (
                                  <div key={food.id} className="text-sm">
                                    {foodData?.name} ({food.quantity}g)
                                  </div>
                                )
                              })}
                            </div>
                            <div className="text-right text-sm text-gray-600">
                              <div>{meal.totalCalories} kcal</div>
                              <div>{meal.totalProtein}g proteína</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      <p className="mb-2">Nenhum alimento adicionado</p>
                      <Dialog open={isAddFoodDialogOpen} onOpenChange={setIsAddFoodDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedMealType(mealType.id)}
                          >
                            + Adicionar Alimentos
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Adicionar Alimentos - {mealType.name}</DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            {/* Quick Add Meals */}
                            <div>
                              <h3 className="font-medium mb-2">Refeições Rápidas</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {QUICK_ADD_MEALS.map(quickMeal => (
                                  <Button
                                    key={quickMeal.name}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addQuickMeal(quickMeal)}
                                  >
                                    {quickMeal.name}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            {/* Search Foods */}
                            <div>
                              <h3 className="font-medium mb-2">Buscar Alimentos</h3>
                              <Input
                                placeholder="Digite o nome do alimento..."
                                value={foodSearch}
                                onChange={(e) => setFoodSearch(e.target.value)}
                              />
                            </div>

                            {/* Selected Foods */}
                            {selectedFoods.length > 0 && (
                              <div>
                                <h3 className="font-medium mb-2">Alimentos Selecionados</h3>
                                <div className="space-y-2">
                                  {selectedFoods.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                      <span className="text-sm">{item.food.name} ({item.quantity}g)</span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setSelectedFoods(prev => prev.filter((_, i) => i !== index))}
                                      >
                                        ❌
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Food Search Results */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                              {searchResults.map(food => (
                                <div key={food.id} className="border rounded p-3">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <div className="font-medium text-sm">{food.name}</div>
                                      <div className="text-xs text-gray-600">
                                        {food.calories} kcal por {food.servingSize}g
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      placeholder="Qtd (g)"
                                      className="flex-1 h-8"
                                      min="1"
                                      defaultValue={food.servingSize}
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          const target = e.target as HTMLInputElement
                                          const quantity = parseInt(target.value) || food.servingSize
                                          handleAddFood(food, quantity)
                                        }
                                      }}
                                    />
                                    <Button
                                      size="sm"
                                      onClick={(e) => {
                                        const button = e.target as HTMLButtonElement
                                        const input = button.previousElementSibling as HTMLInputElement
                                        const quantity = parseInt(input.value) || food.servingSize
                                        handleAddFood(food, quantity)
                                      }}
                                    >
                                      +
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Save Button */}
                            {selectedFoods.length > 0 && (
                              <Button onClick={handleSaveMeal} className="w-full">
                                Salvar Refeição ({selectedFoods.length} {selectedFoods.length === 1 ? 'item' : 'itens'})
                              </Button>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        {/* Add Tab */}
        <TabsContent value="add">
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Adicionar Refeição
              </h3>
              <p className="text-gray-600 mb-4">
                Use a aba "Hoje" para adicionar alimentos às suas refeições
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Histórico Nutricional
              </h3>
              <p className="text-gray-600 mb-4">
                Acompanhe sua evolução nutricional ao longo do tempo
              </p>
              <Button variant="outline">
                Ver Relatórios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}