// @ts-nocheck
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, OnboardingData, NutritionGoals } from '../types'

interface UserState {
  user: User | null
  nutritionGoals: NutritionGoals | null
  isOnboarded: boolean
  isLoading: boolean
  
  // Actions
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  setNutritionGoals: (goals: NutritionGoals) => void
  completeOnboarding: (data: OnboardingData) => void
  calculateBMR: (user: Pick<User, 'weight' | 'height' | 'age' | 'gender'>) => number
  calculateTDEE: (bmr: number, activityLevel: User['activityLevel']) => number
  logout: () => void
}

// BMR calculation using Mifflin-St Jeor equation
const calculateBMR = (weight: number, height: number, age: number, gender: 'male' | 'female'): number => {
  const bmr = 10 * weight + 6.25 * height - 5 * age
  return gender === 'male' ? bmr + 5 : bmr - 161
}

// TDEE calculation based on activity level
const calculateTDEE = (bmr: number, activityLevel: User['activityLevel']): number => {
  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9
  }
  return bmr * multipliers[activityLevel]
}

// Nutrition goals calculation based on goal type
const calculateNutritionGoals = (user: User): NutritionGoals => {
  const { goal, tdee, weight } = user
  
  let calorieAdjustment = 0
  let proteinPerKg = 1.8
  
  switch (goal) {
    case 'lose_weight':
      calorieAdjustment = -500 // 500 calorie deficit
      proteinPerKg = 2.2 // Higher protein for weight loss
      break
    case 'gain_muscle':
      calorieAdjustment = 300 // 300 calorie surplus
      proteinPerKg = 2.0 // High protein for muscle building
      break
    case 'strength':
      calorieAdjustment = 200 // Slight surplus for strength gains
      proteinPerKg = 1.8
      break
    case 'maintain':
    case 'endurance':
      calorieAdjustment = 0
      proteinPerKg = 1.6
      break
  }
  
  const dailyCalories = Math.round(tdee + calorieAdjustment)
  const proteinGrams = Math.round(weight * proteinPerKg)
  const proteinCalories = proteinGrams * 4
  const fatCalories = Math.round(dailyCalories * 0.25) // 25% from fat
  const fatGrams = Math.round(fatCalories / 9)
  const carbCalories = dailyCalories - proteinCalories - fatCalories
  const carbsGrams = Math.round(carbCalories / 4)
  
  return {
    id: `nutrition_${user.id}_${Date.now()}`,
    userId: user.id,
    dailyCalories,
    proteinGrams,
    carbsGrams,
    fatGrams,
    fiberGrams: Math.round(dailyCalories / 1000 * 14), // 14g per 1000 calories
    waterMl: Math.round(weight * 35), // 35ml per kg body weight
    startDate: new Date(),
    isActive: true
  }
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      nutritionGoals: null,
      isOnboarded: false,
      isLoading: false,

      setUser: (user) => set({ user, isOnboarded: true }),

      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates, updatedAt: new Date() } : null
      })),

      setNutritionGoals: (goals) => set({ nutritionGoals: goals }),

      completeOnboarding: (data) => {
        const bmr = calculateBMR(
          data.personalInfo.weight,
          data.personalInfo.height,
          data.personalInfo.age,
          data.personalInfo.gender
        )
        
        const tdee = calculateTDEE(bmr, data.lifestyle.activityLevel)
        
        const user: User = {
          id: `user_${Date.now()}`,
          email: 'user@fitevolve.com', // Will be replaced with actual auth
          name: data.personalInfo.name,
          age: data.personalInfo.age,
          gender: data.personalInfo.gender,
          height: data.personalInfo.height,
          weight: data.personalInfo.weight,
          activityLevel: data.lifestyle.activityLevel,
          fitnessLevel: data.lifestyle.fitnessLevel,
          goal: data.goals.primaryGoal,
          weeklyFrequency: data.lifestyle.weeklyFrequency,
          availableEquipment: data.lifestyle.availableEquipment,
          bmr,
          tdee,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        const nutritionGoals = calculateNutritionGoals(user)
        
        set({
          user,
          nutritionGoals,
          isOnboarded: true,
          isLoading: false
        })
      },

      calculateBMR: (user) => calculateBMR(user.weight, user.height, user.age, user.gender),

      calculateTDEE: (bmr, activityLevel) => calculateTDEE(bmr, activityLevel),

      logout: () => set({
        user: null,
        nutritionGoals: null,
        isOnboarded: false,
        isLoading: false
      })
    }),
    {
      name: 'fitevolve-user-storage',
      partialize: (state) => ({
        user: state.user,
        nutritionGoals: state.nutritionGoals,
        isOnboarded: state.isOnboarded
      })
    }
  )
)