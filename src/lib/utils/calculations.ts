// Health and Fitness Calculation Utilities

export const calculateBMI = (weight: number, height: number): number => {
  // weight in kg, height in cm
  const heightInMeters = height / 100
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10
}

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Abaixo do peso'
  if (bmi < 25) return 'Peso normal'
  if (bmi < 30) return 'Sobrepeso'
  return 'Obesidade'
}

export const calculateBMR = (
  weight: number, 
  height: number, 
  age: number, 
  gender: 'male' | 'female'
): number => {
  // Mifflin-St Jeor Equation
  const bmr = 10 * weight + 6.25 * height - 5 * age
  return gender === 'male' ? bmr + 5 : bmr - 161
}

export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9
  }
  return bmr * (multipliers[activityLevel as keyof typeof multipliers] || 1.2)
}

export const calculateMacroTargets = (
  totalCalories: number,
  goal: string,
  weight: number
) => {
  let proteinPerKg = 1.8
  let fatPercentage = 0.25
  
  switch (goal) {
    case 'lose_weight':
      proteinPerKg = 2.2 // Higher protein for weight loss
      fatPercentage = 0.25
      break
    case 'gain_muscle':
      proteinPerKg = 2.0 // High protein for muscle building
      fatPercentage = 0.25
      break
    case 'strength':
      proteinPerKg = 1.8
      fatPercentage = 0.30
      break
    default:
      proteinPerKg = 1.6
      fatPercentage = 0.25
  }
  
  const proteinGrams = Math.round(weight * proteinPerKg)
  const proteinCalories = proteinGrams * 4
  
  const fatCalories = Math.round(totalCalories * fatPercentage)
  const fatGrams = Math.round(fatCalories / 9)
  
  const carbCalories = totalCalories - proteinCalories - fatCalories
  const carbGrams = Math.round(carbCalories / 4)
  
  return {
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
    calories: totalCalories
  }
}

export const calculateOneRepMax = (weight: number, reps: number): number => {
  if (reps === 1) return weight
  // Epley formula
  return Math.round(weight * (1 + reps / 30))
}

export const calculateTrainingMax = (oneRepMax: number): number => {
  // 90% of 1RM for training calculations
  return Math.round(oneRepMax * 0.9)
}

export const calculateWorkingWeight = (
  trainingMax: number, 
  percentage: number
): number => {
  return Math.round(trainingMax * (percentage / 100))
}

export const getPercentageOfGoal = (current: number, target: number): number => {
  if (target === 0) return 0
  return Math.round((current / target) * 100)
}

export const formatWeight = (weight: number, unit: 'kg' | 'lbs' = 'kg'): string => {
  if (unit === 'lbs') {
    return `${Math.round(weight * 2.20462)} lbs`
  }
  return `${weight} kg`
}

export const formatVolume = (volume: number, unit: 'ml' | 'oz' = 'ml'): string => {
  if (unit === 'oz') {
    return `${Math.round(volume * 0.033814)} oz`
  }
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(1)}L`
  }
  return `${volume}ml`
}

export const calculateWaterTarget = (weight: number): number => {
  // 35ml per kg of body weight
  return Math.round(weight * 35)
}

export const calculateCalorieAdjustment = (
  goal: string
): number => {
  switch (goal) {
    case 'lose_weight':
      return -500 // 500 calorie deficit
    case 'gain_muscle':
      return 300 // 300 calorie surplus
    case 'strength':
      return 200 // Slight surplus
    case 'maintain':
      return 0
    case 'endurance':
      return 0
    default:
      return 0
  }
}

export const estimateWorkoutCalories = (
  weight: number,
  duration: number,
  intensity: 'low' | 'moderate' | 'high'
): number => {
  // MET values for weight training
  const metValues = {
    low: 3.5,      // Light effort
    moderate: 5.0,  // Moderate effort
    high: 6.0      // Vigorous effort
  }
  
  const met = metValues[intensity]
  const caloriesPerMinute = (met * weight * 3.5) / 200
  return Math.round(caloriesPerMinute * duration)
}

export const calculateRestTime = (
  reps: number, 
  intensity: 'strength' | 'hypertrophy' | 'endurance'
): number => {
  // Rest time in seconds
  switch (intensity) {
    case 'strength':
      return reps <= 5 ? 180 : 120 // 3 minutes for heavy, 2 for moderate
    case 'hypertrophy':
      return 90 // 1.5 minutes for muscle building
    case 'endurance':
      return 60 // 1 minute for endurance
    default:
      return 90
  }
}

export const calculateProgressionWeight = (
  currentWeight: number,
  reps: number,
  rpe: number,
  exerciseType: 'upper' | 'lower'
): number => {
  // Progressive overload calculation
  let increment = 0
  
  if (rpe <= 7 && reps >= 12) {
    // Easy set with high reps - ready for big jump
    increment = exerciseType === 'lower' ? 5 : 2.5
  } else if (rpe <= 8 && reps >= 10) {
    // Good performance - small increase
    increment = exerciseType === 'lower' ? 2.5 : 1.25
  } else if (rpe >= 9 || reps < 6) {
    // Too difficult - reduce weight
    increment = -(currentWeight * 0.05) // 5% reduction
  }
  
  return Math.max(0, currentWeight + increment)
}

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
}

export const calculateWeeklyVolume = (sessions: any[]): number => {
  return sessions.reduce((total, session) => {
    return total + (session.totalVolume || 0)
  }, 0)
}

export const getConsistencyPercentage = (
  completedSessions: number,
  plannedSessions: number
): number => {
  if (plannedSessions === 0) return 0
  return Math.round((completedSessions / plannedSessions) * 100)
}