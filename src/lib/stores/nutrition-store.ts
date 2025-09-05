// @ts-nocheck
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MealEntry, FoodEntry, WaterEntry, Food } from '../types'
import { format, isToday, isThisWeek, startOfDay } from 'date-fns'

interface NutritionState {
  dailyEntries: { [date: string]: MealEntry[] }
  waterEntries: { [date: string]: WaterEntry[] }
  customFoods: Food[]
  
  // Actions
  addMealEntry: (entry: MealEntry) => void
  updateMealEntry: (entryId: string, updates: Partial<MealEntry>) => void
  deleteMealEntry: (entryId: string) => void
  addWaterEntry: (amount: number) => void
  deleteWaterEntry: (entryId: string) => void
  addCustomFood: (food: Food) => void
  
  // Getters
  getTodayMeals: () => MealEntry[]
  getTodayWater: () => number
  getTodayNutrition: () => DailyNutritionSummary
  getWeeklyStats: () => WeeklyNutritionStats
  getMealsByType: (date: Date, mealType: MealEntry['mealType']) => MealEntry[]
}

interface DailyNutritionSummary {
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  totalWater: number
  mealBreakdown: {
    [K in MealEntry['mealType']]: {
      calories: number
      protein: number
      carbs: number
      fat: number
    }
  }
}

interface WeeklyNutritionStats {
  averageCalories: number
  averageProtein: number
  averageCarbs: number
  averageFat: number
  averageWater: number
  adherencePercentage: number
  daysLogged: number
}

const defaultMealBreakdown = {
  breakfast: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  morning_snack: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  lunch: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  afternoon_snack: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  dinner: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  evening_snack: { calories: 0, protein: 0, carbs: 0, fat: 0 }
}

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set, get) => ({
      dailyEntries: {},
      waterEntries: {},
      customFoods: [],

      addMealEntry: (entry) => {
        const dateKey = format(entry.date, 'yyyy-MM-dd')
        
        set((state) => ({
          dailyEntries: {
            ...state.dailyEntries,
            [dateKey]: [...(state.dailyEntries[dateKey] || []), entry]
          }
        }))
      },

      updateMealEntry: (entryId, updates) => {
        set((state) => {
          const updatedEntries = { ...state.dailyEntries }
          
          Object.keys(updatedEntries).forEach(dateKey => {
            updatedEntries[dateKey] = updatedEntries[dateKey].map(entry =>
              entry.id === entryId ? { ...entry, ...updates } : entry
            )
          })
          
          return { dailyEntries: updatedEntries }
        })
      },

      deleteMealEntry: (entryId) => {
        set((state) => {
          const updatedEntries = { ...state.dailyEntries }
          
          Object.keys(updatedEntries).forEach(dateKey => {
            updatedEntries[dateKey] = updatedEntries[dateKey].filter(
              entry => entry.id !== entryId
            )
          })
          
          return { dailyEntries: updatedEntries }
        })
      },

      addWaterEntry: (amount) => {
        const now = new Date()
        const dateKey = format(now, 'yyyy-MM-dd')
        
        const waterEntry: WaterEntry = {
          id: `water_${Date.now()}`,
          userId: 'current_user', // This would come from auth
          date: now,
          amount,
          time: now
        }
        
        set((state) => ({
          waterEntries: {
            ...state.waterEntries,
            [dateKey]: [...(state.waterEntries[dateKey] || []), waterEntry]
          }
        }))
      },

      deleteWaterEntry: (entryId) => {
        set((state) => {
          const updatedEntries = { ...state.waterEntries }
          
          Object.keys(updatedEntries).forEach(dateKey => {
            updatedEntries[dateKey] = updatedEntries[dateKey].filter(
              entry => entry.id !== entryId
            )
          })
          
          return { waterEntries: updatedEntries }
        })
      },

      addCustomFood: (food) => {
        set((state) => ({
          customFoods: [...state.customFoods, food]
        }))
      },

      getTodayMeals: () => {
        const state = get()
        const today = format(new Date(), 'yyyy-MM-dd')
        return state.dailyEntries[today] || []
      },

      getTodayWater: () => {
        const state = get()
        const today = format(new Date(), 'yyyy-MM-dd')
        const todayWater = state.waterEntries[today] || []
        return todayWater.reduce((total, entry) => total + entry.amount, 0)
      },

      getTodayNutrition: (): DailyNutritionSummary => {
        const state = get()
        const todayMeals = state.getTodayMeals()
        const todayWater = state.getTodayWater()
        
        let totalCalories = 0
        let totalProtein = 0
        let totalCarbs = 0
        let totalFat = 0
        
        const mealBreakdown = { ...defaultMealBreakdown }
        
        todayMeals.forEach(meal => {
          totalCalories += meal.totalCalories
          totalProtein += meal.totalProtein
          totalCarbs += meal.totalCarbs
          totalFat += meal.totalFat
          
          mealBreakdown[meal.mealType].calories += meal.totalCalories
          mealBreakdown[meal.mealType].protein += meal.totalProtein
          mealBreakdown[meal.mealType].carbs += meal.totalCarbs
          mealBreakdown[meal.mealType].fat += meal.totalFat
        })
        
        return {
          totalCalories: Math.round(totalCalories),
          totalProtein: Math.round(totalProtein),
          totalCarbs: Math.round(totalCarbs),
          totalFat: Math.round(totalFat),
          totalWater: todayWater,
          mealBreakdown
        }
      },

      getWeeklyStats: (): WeeklyNutritionStats => {
        const state = get()
        const now = new Date()
        const weeklyData: DailyNutritionSummary[] = []
        
        // Get last 7 days of data
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          const dateKey = format(date, 'yyyy-MM-dd')
          
          const dayMeals = state.dailyEntries[dateKey] || []
          const dayWater = state.waterEntries[dateKey] || []
          
          let dayCalories = 0
          let dayProtein = 0
          let dayCarbs = 0
          let dayFat = 0
          let dayWaterTotal = 0
          
          dayMeals.forEach(meal => {
            dayCalories += meal.totalCalories
            dayProtein += meal.totalProtein
            dayCarbs += meal.totalCarbs
            dayFat += meal.totalFat
          })
          
          dayWater.forEach(water => {
            dayWaterTotal += water.amount
          })
          
          weeklyData.push({
            totalCalories: dayCalories,
            totalProtein: dayProtein,
            totalCarbs: dayCarbs,
            totalFat: dayFat,
            totalWater: dayWaterTotal,
            mealBreakdown: defaultMealBreakdown
          })
        }
        
        const daysLogged = weeklyData.filter(day => day.totalCalories > 0).length
        const validDays = Math.max(daysLogged, 1)
        
        return {
          averageCalories: Math.round(
            weeklyData.reduce((sum, day) => sum + day.totalCalories, 0) / validDays
          ),
          averageProtein: Math.round(
            weeklyData.reduce((sum, day) => sum + day.totalProtein, 0) / validDays
          ),
          averageCarbs: Math.round(
            weeklyData.reduce((sum, day) => sum + day.totalCarbs, 0) / validDays
          ),
          averageFat: Math.round(
            weeklyData.reduce((sum, day) => sum + day.totalFat, 0) / validDays
          ),
          averageWater: Math.round(
            weeklyData.reduce((sum, day) => sum + day.totalWater, 0) / validDays
          ),
          adherencePercentage: Math.round((daysLogged / 7) * 100),
          daysLogged
        }
      },

      getMealsByType: (date, mealType) => {
        const state = get()
        const dateKey = format(date, 'yyyy-MM-dd')
        const dayMeals = state.dailyEntries[dateKey] || []
        return dayMeals.filter(meal => meal.mealType === mealType)
      }
    }),
    {
      name: 'fitevolve-nutrition-storage',
      partialize: (state) => ({
        dailyEntries: state.dailyEntries,
        waterEntries: state.waterEntries,
        customFoods: state.customFoods
      })
    }
  )
)