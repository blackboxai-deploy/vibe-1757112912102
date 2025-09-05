// @ts-nocheck
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  WorkoutPlan, 
  WorkoutSession, 
  CompletedSet, 
  CompletedExercise,
  Exercise,
  WorkoutDay,
  WorkoutExercise 
} from '../types'

interface WorkoutState {
  currentPlan: WorkoutPlan | null
  currentSession: WorkoutSession | null
  workoutHistory: WorkoutSession[]
  isWorkoutActive: boolean
  currentExerciseIndex: number
  currentSetIndex: number
  
  // Actions
  setCurrentPlan: (plan: WorkoutPlan) => void
  startWorkout: (workoutDayId: string) => void
  endWorkout: () => void
  addCompletedSet: (exerciseId: string, set: CompletedSet) => void
  updateCurrentSet: (exerciseId: string, setIndex: number, updates: Partial<CompletedSet>) => void
  moveToNextExercise: () => void
  moveToPreviousExercise: () => void
  saveWorkoutSession: () => void
  getWorkoutStats: () => WorkoutStats
  getProgressionSuggestion: (exerciseId: string) => ProgressionSuggestion
}

interface WorkoutStats {
  totalSessions: number
  totalVolume: number // kg
  averageSessionDuration: number // minutes
  strengthGains: { [exerciseId: string]: number }
  consistencyPercentage: number
}

interface ProgressionSuggestion {
  exerciseId: string
  currentWeight: number
  suggestedWeight: number
  reason: string
  confidence: 'low' | 'medium' | 'high'
}

// Helper function to calculate 1RM using Epley formula
const calculateOneRM = (weight: number, reps: number): number => {
  if (reps === 1) return weight
  return Math.round(weight * (1 + reps / 30))
}

// Helper function to suggest progression based on recent performance
const getProgressionSuggestion = (
  exerciseId: string, 
  recentSets: CompletedSet[]
): ProgressionSuggestion => {
  if (recentSets.length === 0) {
    return {
      exerciseId,
      currentWeight: 0,
      suggestedWeight: 0,
      reason: 'No previous data available',
      confidence: 'low'
    }
  }

  // Get the most recent completed sets
  const completedSets = recentSets.filter(set => set.isCompleted && !set.isFailure)
  if (completedSets.length === 0) {
    return {
      exerciseId,
      currentWeight: recentSets[0].weight,
      suggestedWeight: recentSets[0].weight,
      reason: 'Previous sets were not completed successfully',
      confidence: 'low'
    }
  }

  const lastSet = completedSets[completedSets.length - 1]
  const { weight, reps, rpe } = lastSet

  let suggestedWeight = weight
  let reason = 'Maintain current weight'
  let confidence: 'low' | 'medium' | 'high' = 'medium'

  // Progressive overload logic
  if (rpe && rpe <= 7 && reps >= 12) {
    // Easy set with high reps - increase weight
    suggestedWeight = Math.round(weight * 1.05) // 5% increase
    reason = 'Low RPE and high reps achieved - ready for progression'
    confidence = 'high'
  } else if (rpe && rpe <= 8 && reps >= 10) {
    // Moderate difficulty with good reps - small increase
    suggestedWeight = Math.round(weight * 1.025) // 2.5% increase
    reason = 'Good performance - small weight increase recommended'
    confidence = 'medium'
  } else if (rpe && rpe >= 9 || reps < 6) {
    // Too difficult or low reps - decrease weight
    suggestedWeight = Math.round(weight * 0.95) // 5% decrease
    reason = 'High RPE or low reps - reduce weight to maintain form'
    confidence = 'high'
  }

  return {
    exerciseId,
    currentWeight: weight,
    suggestedWeight,
    reason,
    confidence
  }
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentPlan: null,
      currentSession: null,
      workoutHistory: [],
      isWorkoutActive: false,
      currentExerciseIndex: 0,
      currentSetIndex: 0,

      setCurrentPlan: (plan) => set({ currentPlan: plan }),

      startWorkout: (workoutDayId) => {
        const state = get()
        if (!state.currentPlan) return

        const workoutDay = state.currentPlan.weeklySchedule.find(day => day.id === workoutDayId)
        if (!workoutDay) return

        const session: WorkoutSession = {
          id: `session_${Date.now()}`,
          userId: state.currentPlan.userId,
          workoutDayId,
          date: new Date(),
          startTime: new Date(),
          completedExercises: workoutDay.exercises.map(ex => ({
            id: `completed_${ex.id}_${Date.now()}`,
            exerciseId: ex.exerciseId,
            sets: []
          })),
          totalVolume: 0,
          duration: 0,
          isCompleted: false
        }

        set({
          currentSession: session,
          isWorkoutActive: true,
          currentExerciseIndex: 0,
          currentSetIndex: 0
        })
      },

      endWorkout: () => {
        const state = get()
        if (!state.currentSession) return

        const endTime = new Date()
        const duration = Math.round(
          (endTime.getTime() - state.currentSession.startTime.getTime()) / (1000 * 60)
        )

        // Calculate total volume
        let totalVolume = 0
        state.currentSession.completedExercises.forEach(exercise => {
          exercise.sets.forEach(set => {
            if (set.isCompleted) {
              totalVolume += set.weight * set.reps
            }
          })
        })

        const completedSession: WorkoutSession = {
          ...state.currentSession,
          endTime,
          duration,
          totalVolume,
          isCompleted: true
        }

        set((state) => ({
          currentSession: null,
          isWorkoutActive: false,
          workoutHistory: [...state.workoutHistory, completedSession],
          currentExerciseIndex: 0,
          currentSetIndex: 0
        }))
      },

      addCompletedSet: (exerciseId, set) => {
        set((state) => {
          if (!state.currentSession) return state

          const updatedExercises = state.currentSession.completedExercises.map(exercise => {
            if (exercise.exerciseId === exerciseId) {
              return {
                ...exercise,
                sets: [...exercise.sets, set]
              }
            }
            return exercise
          })

          return {
            ...state,
            currentSession: {
              ...state.currentSession,
              completedExercises: updatedExercises
            }
          }
        })
      },

      updateCurrentSet: (exerciseId, setIndex, updates) => {
        set((state) => {
          if (!state.currentSession) return state

          const updatedExercises = state.currentSession.completedExercises.map(exercise => {
            if (exercise.exerciseId === exerciseId) {
              const updatedSets = exercise.sets.map((set, index) => 
                index === setIndex ? { ...set, ...updates } : set
              )
              return { ...exercise, sets: updatedSets }
            }
            return exercise
          })

          return {
            ...state,
            currentSession: {
              ...state.currentSession,
              completedExercises: updatedExercises
            }
          }
        })
      },

      moveToNextExercise: () => {
        set((state) => ({
          currentExerciseIndex: Math.min(
            state.currentExerciseIndex + 1,
            (state.currentSession?.completedExercises.length || 1) - 1
          ),
          currentSetIndex: 0
        }))
      },

      moveToPreviousExercise: () => {
        set((state) => ({
          currentExerciseIndex: Math.max(state.currentExerciseIndex - 1, 0),
          currentSetIndex: 0
        }))
      },

      saveWorkoutSession: () => {
        const state = get()
        if (!state.currentSession) return

        // This would typically save to a backend API
        // For now, we'll just update the local state
        set((state) => ({
          workoutHistory: [...state.workoutHistory, state.currentSession!]
        }))
      },

      getWorkoutStats: (): WorkoutStats => {
        const state = get()
        const history = state.workoutHistory

        if (history.length === 0) {
          return {
            totalSessions: 0,
            totalVolume: 0,
            averageSessionDuration: 0,
            strengthGains: {},
            consistencyPercentage: 0
          }
        }

        const totalSessions = history.length
        const totalVolume = history.reduce((sum, session) => sum + session.totalVolume, 0)
        const averageSessionDuration = history.reduce(
          (sum, session) => sum + session.duration, 0
        ) / totalSessions

        // Calculate strength gains (simplified)
        const strengthGains: { [exerciseId: string]: number } = {}
        
        // Calculate consistency (sessions per week)
        const weeksActive = Math.ceil(
          (new Date().getTime() - history[0].date.getTime()) / (1000 * 60 * 60 * 24 * 7)
        )
        const consistencyPercentage = Math.round((totalSessions / (weeksActive * 3)) * 100)

        return {
          totalSessions,
          totalVolume,
          averageSessionDuration,
          strengthGains,
          consistencyPercentage: Math.min(consistencyPercentage, 100)
        }
      },

      getProgressionSuggestion: (exerciseId) => {
        const state = get()
        const recentSets: CompletedSet[] = []
        
        // Get recent sets for this exercise from workout history
        state.workoutHistory
          .slice(-5) // Last 5 sessions
          .forEach(session => {
            const exercise = session.completedExercises.find(ex => ex.exerciseId === exerciseId)
            if (exercise) {
              recentSets.push(...exercise.sets)
            }
          })

        return getProgressionSuggestion(exerciseId, recentSets)
      }
    }),
    {
      name: 'fitevolve-workout-storage',
      partialize: (state) => ({
        currentPlan: state.currentPlan,
        workoutHistory: state.workoutHistory
      })
    }
  )
)