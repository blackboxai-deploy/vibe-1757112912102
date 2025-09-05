// Core Data Types for FitEvolve App

export interface User {
  id: string
  email: string
  name: string
  age: number
  gender: 'male' | 'female'
  height: number // cm
  weight: number // kg
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active'
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced'
  goal: 'lose_weight' | 'maintain' | 'gain_muscle' | 'strength' | 'endurance'
  weeklyFrequency: number // days per week
  availableEquipment: string[]
  bmr: number
  tdee: number
  createdAt: Date
  updatedAt: Date
}

export interface NutritionGoals {
  id: string
  userId: string
  dailyCalories: number
  proteinGrams: number
  carbsGrams: number
  fatGrams: number
  fiberGrams: number
  waterMl: number
  startDate: Date
  endDate?: Date
  isActive: boolean
}

export interface Exercise {
  id: string
  name: string
  category: 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'glutes' | 'core' | 'cardio' | 'full_body'
  primaryMuscles: string[]
  secondaryMuscles: string[]
  equipment: string[]
  type: 'compound' | 'isolation' | 'cardio'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  instructions: string[]
  tips: string[]
  videoUrl?: string
  imageUrl?: string
  repRangeMin: number
  repRangeMax: number
  restTimeSeconds: number
  isCustom: boolean
  createdBy?: string
}

export interface WorkoutPlan {
  id: string
  userId: string
  name: string
  goal: string
  weeklySchedule: WorkoutDay[]
  duration: number // weeks
  currentWeek: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface WorkoutDay {
  id: string
  dayOfWeek: number // 0-6 (Sun-Sat)
  name: string // e.g., "Push Day", "Pull Day", "Legs"
  exercises: WorkoutExercise[]
  estimatedDuration: number // minutes
}

export interface WorkoutExercise {
  id: string
  exerciseId: string
  order: number
  sets: number
  targetRepsMin: number
  targetRepsMax: number
  targetWeight?: number
  restSeconds: number
  notes?: string
}

export interface WorkoutSession {
  id: string
  userId: string
  workoutDayId: string
  date: Date
  startTime: Date
  endTime?: Date
  completedExercises: CompletedExercise[]
  totalVolume: number // kg
  duration: number // minutes
  notes?: string
  ratingRPE?: number // 1-10
  isCompleted: boolean
}

export interface CompletedExercise {
  id: string
  exerciseId: string
  sets: CompletedSet[]
  notes?: string
}

export interface CompletedSet {
  id: string
  setNumber: number
  weight: number // kg
  reps: number
  rpe?: number // 1-10
  restSeconds?: number
  isCompleted: boolean
  isFailure: boolean
  notes?: string
}

export interface Food {
  id: string
  name: string
  brand?: string
  servingSize: number // grams
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
  sodium?: number
  barcode?: string
  isCustom: boolean
  createdBy?: string
}

export interface MealEntry {
  id: string
  userId: string
  date: Date
  mealType: 'breakfast' | 'morning_snack' | 'lunch' | 'afternoon_snack' | 'dinner' | 'evening_snack'
  foods: FoodEntry[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

export interface FoodEntry {
  id: string
  foodId: string
  quantity: number // grams
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface WaterEntry {
  id: string
  userId: string
  date: Date
  amount: number // ml
  time: Date
}

export interface BodyMetrics {
  id: string
  userId: string
  date: Date
  weight?: number // kg
  bodyFatPercentage?: number
  muscleMass?: number
  measurements?: {
    chest?: number
    waist?: number
    hips?: number
    biceps?: number
    thighs?: number
    neck?: number
  }
  photos?: string[]
}

export interface ProgressData {
  strengthProgress: {
    exerciseId: string
    exerciseName: string
    maxWeight: number
    estimatedOneRM: number
    volumeProgress: { date: Date; volume: number }[]
  }[]
  bodyComposition: {
    date: Date
    weight: number
    bodyFat?: number
    muscleMass?: number
  }[]
  nutritionAdherence: {
    date: Date
    caloriesTarget: number
    caloriesActual: number
    proteinTarget: number
    proteinActual: number
    adherencePercentage: number
  }[]
  workoutConsistency: {
    week: Date
    plannedSessions: number
    completedSessions: number
    adherencePercentage: number
  }[]
}

export interface Cycle {
  id: string
  userId: string
  planId: string
  number: number
  startDate: Date
  endDate: Date
  status: 'active' | 'completed' | 'paused'
  initialMetrics: {
    weight: number
    bodyFat?: number
    strengthBaseline: { [exerciseId: string]: number }
  }
  finalMetrics?: {
    weight: number
    bodyFat?: number
    strengthGains: { [exerciseId: string]: number }
  }
  adaptations: CycleAdaptation[]
}

export interface CycleAdaptation {
  id: string
  type: 'exercise_change' | 'volume_adjustment' | 'intensity_adjustment' | 'frequency_change' | 'deload'
  description: string
  reason: string
  implementationDate: Date
  effectiveness?: 'positive' | 'negative' | 'neutral'
}

// UI State Types
export interface DashboardStats {
  today: {
    workoutCompleted: boolean
    caloriesConsumed: number
    caloriesTarget: number
    proteinConsumed: number
    proteinTarget: number
    waterConsumed: number
    waterTarget: number
    activeMinutes: number
  }
  thisWeek: {
    workoutsCompleted: number
    workoutsPlanned: number
    avgCaloriesPerDay: number
    avgProteinPerDay: number
    totalVolume: number
  }
  thisMonth: {
    workoutsCompleted: number
    avgWeightChange: number
    totalVolume: number
    consistencyPercentage: number
  }
}

// Form Types
export interface OnboardingData {
  personalInfo: {
    name: string
    age: number
    gender: 'male' | 'female'
    height: number
    weight: number
  }
  goals: {
    primaryGoal: 'lose_weight' | 'maintain' | 'gain_muscle' | 'strength' | 'endurance'
    targetWeight?: number
    timeframe: number // weeks
  }
  lifestyle: {
    activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active'
    fitnessLevel: 'beginner' | 'intermediate' | 'advanced'
    weeklyFrequency: number
    sessionDuration: number // minutes
    availableEquipment: string[]
  }
  restrictions: {
    injuries?: string[]
    dietaryRestrictions?: string[]
    foodAllergies?: string[]
  }
}