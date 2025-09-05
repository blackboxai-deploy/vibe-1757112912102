'use client'
// @ts-nocheck

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/lib/stores/user-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { OnboardingData } from '@/lib/types'

const STEPS = [
  { id: 'personal', title: 'Informações Pessoais', description: 'Conte-nos sobre você' },
  { id: 'goals', title: 'Seus Objetivos', description: 'O que você quer alcançar?' },
  { id: 'lifestyle', title: 'Estilo de Vida', description: 'Como é sua rotina?' },
  { id: 'equipment', title: 'Equipamentos', description: 'O que você tem disponível?' },
  { id: 'review', title: 'Revisão', description: 'Confirme suas informações' }
]

export default function OnboardingPage() {
  const router = useRouter()
  const { completeOnboarding } = useUserStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<OnboardingData>({
    personalInfo: {
      name: '',
      age: 25,
      gender: 'male',
      height: 170,
      weight: 70
    },
    goals: {
      primaryGoal: 'gain_muscle',
      timeframe: 12
    },
    lifestyle: {
      activityLevel: 'moderately_active',
      fitnessLevel: 'beginner',
      weeklyFrequency: 3,
      sessionDuration: 60,
      availableEquipment: []
    },
    restrictions: {
      injuries: [],
      dietaryRestrictions: [],
      foodAllergies: []
    }
  })

  const updateFormData = (section: keyof OnboardingData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    try {
      completeOnboarding(formData)
      toast.success('Perfil criado com sucesso!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Erro ao criar perfil. Tente novamente.')
    }
  }

  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'personal':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                value={formData.personalInfo.name}
                onChange={(e) => updateFormData('personalInfo', { name: e.target.value })}
                placeholder="Digite seu nome"
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.personalInfo.age}
                  onChange={(e) => updateFormData('personalInfo', { age: parseInt(e.target.value) })}
                  className="mt-1"
                  min="16"
                  max="80"
                />
              </div>
              <div>
                <Label htmlFor="gender">Gênero</Label>
                <Select
                  value={formData.personalInfo.gender}
                  onValueChange={(value) => updateFormData('personalInfo', { gender: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.personalInfo.height}
                  onChange={(e) => updateFormData('personalInfo', { height: parseInt(e.target.value) })}
                  className="mt-1"
                  min="140"
                  max="220"
                />
              </div>
              <div>
                <Label htmlFor="weight">Peso atual (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.personalInfo.weight}
                  onChange={(e) => updateFormData('personalInfo', { weight: parseInt(e.target.value) })}
                  className="mt-1"
                  min="40"
                  max="200"
                />
              </div>
            </div>
          </div>
        )

      case 'goals':
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Qual é seu principal objetivo?</Label>
              <div className="mt-3 space-y-3">
                {[
                  { id: 'lose_weight', label: '💪 Perder peso e gordura', description: 'Foco em déficit calórico e cardio' },
                  { id: 'gain_muscle', label: '🏋️ Ganhar massa muscular', description: 'Hipertrofia e superávit calórico' },
                  { id: 'strength', label: '⚡ Aumentar força', description: 'Foco em cargas e força máxima' },
                  { id: 'maintain', label: '⚖️ Manter forma atual', description: 'Equilíbrio entre treino e dieta' },
                  { id: 'endurance', label: '🏃 Melhorar resistência', description: 'Capacidade cardiovascular' }
                ].map((goal) => (
                  <div
                    key={goal.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.goals.primaryGoal === goal.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => updateFormData('goals', { primaryGoal: goal.id })}
                  >
                    <div className="font-medium">{goal.label}</div>
                    <div className="text-sm text-gray-600">{goal.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="timeframe">Em quantas semanas você quer ver resultados?</Label>
              <Select
                value={formData.goals.timeframe.toString()}
                onValueChange={(value) => updateFormData('goals', { timeframe: parseInt(value) })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8 semanas</SelectItem>
                  <SelectItem value="12">12 semanas (recomendado)</SelectItem>
                  <SelectItem value="16">16 semanas</SelectItem>
                  <SelectItem value="24">24 semanas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'lifestyle':
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Qual seu nível de atividade diária?</Label>
              <div className="mt-3 space-y-2">
                {[
                  { id: 'sedentary', label: 'Sedentário', description: 'Pouco ou nenhum exercício' },
                  { id: 'lightly_active', label: 'Levemente ativo', description: '1-3 dias de exercício por semana' },
                  { id: 'moderately_active', label: 'Moderadamente ativo', description: '3-5 dias de exercício por semana' },
                  { id: 'very_active', label: 'Muito ativo', description: '6-7 dias de exercício por semana' },
                  { id: 'extra_active', label: 'Extremamente ativo', description: 'Exercícios intensos diariamente' }
                ].map((level) => (
                  <div
                    key={level.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.lifestyle.activityLevel === level.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => updateFormData('lifestyle', { activityLevel: level.id })}
                  >
                    <div className="font-medium">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fitness-level">Nível de experiência com treinos</Label>
                <Select
                  value={formData.lifestyle.fitnessLevel}
                  onValueChange={(value) => updateFormData('lifestyle', { fitnessLevel: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Iniciante (0-6 meses)</SelectItem>
                    <SelectItem value="intermediate">Intermediário (6 meses - 2 anos)</SelectItem>
                    <SelectItem value="advanced">Avançado (2+ anos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="frequency">Quantos dias por semana você pode treinar?</Label>
                <Select
                  value={formData.lifestyle.weeklyFrequency.toString()}
                  onValueChange={(value) => updateFormData('lifestyle', { weeklyFrequency: parseInt(value) })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 dias</SelectItem>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="4">4 dias</SelectItem>
                    <SelectItem value="5">5 dias</SelectItem>
                    <SelectItem value="6">6 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 'equipment':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Quais equipamentos você tem acesso?</Label>
              <p className="text-sm text-gray-600 mt-1">Marque todos que se aplicam</p>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { id: 'barbell', label: 'Barras Livres' },
                  { id: 'dumbbell', label: 'Halteres' },
                  { id: 'machine', label: 'Aparelhos de Musculação' },
                  { id: 'cable', label: 'Polia/Cabos' },
                  { id: 'bodyweight', label: 'Peso Corporal' },
                  { id: 'kettlebell', label: 'Kettlebells' },
                  { id: 'resistance_band', label: 'Elásticos' },
                  { id: 'cardio_equipment', label: 'Equipamentos Cardio' }
                ].map((equipment) => (
                  <div key={equipment.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={equipment.id}
                      checked={formData.lifestyle.availableEquipment.includes(equipment.id)}
                      onCheckedChange={(checked) => {
                        const current = formData.lifestyle.availableEquipment
                        if (checked) {
                          updateFormData('lifestyle', { 
                            availableEquipment: [...current, equipment.id] 
                          })
                        } else {
                          updateFormData('lifestyle', { 
                            availableEquipment: current.filter(eq => eq !== equipment.id) 
                          })
                        }
                      }}
                    />
                    <Label 
                      htmlFor={equipment.id} 
                      className="text-sm font-normal cursor-pointer"
                    >
                      {equipment.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'review':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Quase pronto!</h3>
              <p className="text-gray-600">Revise suas informações antes de continuar</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Informações Pessoais</h4>
                <p className="text-sm text-gray-600">
                  {formData.personalInfo.name}, {formData.personalInfo.age} anos, {formData.personalInfo.gender === 'male' ? 'Masculino' : 'Feminino'}
                </p>
                <p className="text-sm text-gray-600">
                  {formData.personalInfo.height}cm, {formData.personalInfo.weight}kg
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Objetivo</h4>
                <p className="text-sm text-gray-600">
                  {formData.goals.primaryGoal === 'lose_weight' && 'Perder peso e gordura'}
                  {formData.goals.primaryGoal === 'gain_muscle' && 'Ganhar massa muscular'}
                  {formData.goals.primaryGoal === 'strength' && 'Aumentar força'}
                  {formData.goals.primaryGoal === 'maintain' && 'Manter forma atual'}
                  {formData.goals.primaryGoal === 'endurance' && 'Melhorar resistência'}
                  {' '}em {formData.goals.timeframe} semanas
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Rotina de Treino</h4>
                <p className="text-sm text-gray-600">
                  {formData.lifestyle.weeklyFrequency} dias por semana, nível {
                    formData.lifestyle.fitnessLevel === 'beginner' ? 'iniciante' :
                    formData.lifestyle.fitnessLevel === 'intermediate' ? 'intermediário' : 'avançado'
                  }
                </p>
                <p className="text-sm text-gray-600">
                  Equipamentos: {formData.lifestyle.availableEquipment.length} tipos disponíveis
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (STEPS[currentStep].id) {
      case 'personal':
        return formData.personalInfo.name.length > 0
      case 'equipment':
        return formData.lifestyle.availableEquipment.length > 0
      default:
        return true
    }
  }

  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">FE</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo ao FitEvolve
          </h1>
          <p className="text-gray-600">
            Vamos personalizar sua experiência em alguns passos
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Passo {currentStep + 1} de {STEPS.length}</span>
            <span>{Math.round(progress)}% completo</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>{STEPS[currentStep].title}</CardTitle>
            <p className="text-gray-600">{STEPS[currentStep].description}</p>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Voltar
          </Button>
          
          {currentStep === STEPS.length - 1 ? (
            <Button
              onClick={handleComplete}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Finalizar Configuração
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Próximo
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}