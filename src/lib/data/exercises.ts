import { Exercise } from '../types'

export const EXERCISE_CATEGORIES = [
  { id: 'chest', name: 'Peito', icon: '💪' },
  { id: 'back', name: 'Costas', icon: '🏋️' },
  { id: 'shoulders', name: 'Ombros', icon: '🤸' },
  { id: 'arms', name: 'Braços', icon: '💪' },
  { id: 'legs', name: 'Pernas', icon: '🦵' },
  { id: 'glutes', name: 'Glúteos', icon: '🍑' },
  { id: 'core', name: 'Core/Abdômen', icon: '⚡' },
  { id: 'cardio', name: 'Cardio', icon: '❤️' },
  { id: 'full_body', name: 'Corpo Inteiro', icon: '🏃' }
] as const

export const EQUIPMENT_TYPES = [
  { id: 'barbell', name: 'Barra Livre', icon: '🏋️' },
  { id: 'dumbbell', name: 'Halteres', icon: '💪' },
  { id: 'machine', name: 'Aparelhos', icon: '⚙️' },
  { id: 'cable', name: 'Polia/Cabo', icon: '🔗' },
  { id: 'bodyweight', name: 'Peso Corporal', icon: '🤸' },
  { id: 'kettlebell', name: 'Kettlebell', icon: '⚖️' },
  { id: 'resistance_band', name: 'Elástico', icon: '🎗️' },
  { id: 'cardio_equipment', name: 'Equipamento Cardio', icon: '🏃' }
] as const

export const EXERCISE_LIBRARY: Exercise[] = [
  // PEITO (CHEST)
  {
    id: 'supino_reto_barra',
    name: 'Supino Reto com Barra',
    category: 'chest',
    primaryMuscles: ['peitoral_maior', 'peitoral_menor'],
    secondaryMuscles: ['triceps', 'deltóide_anterior'],
    equipment: ['barbell', 'bench'],
    type: 'compound',
    difficulty: 'intermediate',
    instructions: [
      'Deite no banco com os pés apoiados no chão',
      'Segure a barra com pegada um pouco mais larga que os ombros',
      'Retire a barra do suporte e posicione sobre o peito',
      'Desça a barra de forma controlada até tocar o peito',
      'Empurre a barra de volta à posição inicial'
    ],
    tips: [
      'Mantenha os ombros retraídos durante todo o movimento',
      'Não rebate a barra no peito',
      'Use um spotter para cargas pesadas'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e7d38bcb-9c99-4f05-a3d6-ff05f85c765e.png',
    repRangeMin: 6,
    repRangeMax: 12,
    restTimeSeconds: 120,
    isCustom: false
  },
  {
    id: 'supino_inclinado_halter',
    name: 'Supino Inclinado com Halteres',
    category: 'chest',
    primaryMuscles: ['peitoral_maior_superior'],
    secondaryMuscles: ['deltóide_anterior', 'triceps'],
    equipment: ['dumbbell', 'incline_bench'],
    type: 'compound',
    difficulty: 'intermediate',
    instructions: [
      'Ajuste o banco em 30-45 graus de inclinação',
      'Segure os halteres com pegada neutra',
      'Deite no banco com halteres na altura do peito',
      'Empurre os halteres para cima até estender os braços',
      'Desça de forma controlada até sentir alongamento no peito'
    ],
    tips: [
      'Não use inclinação muito acentuada (máximo 45°)',
      'Controle o movimento na descida',
      'Mantenha os punhos alinhados'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a6e5ae59-cc76-49cd-ab0b-b86ba9f20f5b.png',
    repRangeMin: 8,
    repRangeMax: 15,
    restTimeSeconds: 90,
    isCustom: false
  },
  {
    id: 'flexao_solo',
    name: 'Flexão de Braço',
    category: 'chest',
    primaryMuscles: ['peitoral_maior'],
    secondaryMuscles: ['triceps', 'deltóide_anterior', 'core'],
    equipment: ['bodyweight'],
    type: 'compound',
    difficulty: 'beginner',
    instructions: [
      'Posicione-se em prancha com mãos apoiadas no chão',
      'Mãos na largura dos ombros',
      'Mantenha o corpo alinhado da cabeça aos pés',
      'Desça o corpo até o peito quase tocar o chão',
      'Empurre de volta à posição inicial'
    ],
    tips: [
      'Mantenha o core contraído',
      'Não deixe os quadris caírem',
      'Respire na descida, expire na subida'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bc880ddd-7486-4ffa-8e58-807a085e3225.png',
    repRangeMin: 8,
    repRangeMax: 20,
    restTimeSeconds: 60,
    isCustom: false
  },

  // COSTAS (BACK)
  {
    id: 'puxada_frente',
    name: 'Puxada pela Frente',
    category: 'back',
    primaryMuscles: ['latissimo_dorso', 'romboides'],
    secondaryMuscles: ['biceps', 'deltóide_posterior'],
    equipment: ['cable', 'lat_pulldown'],
    type: 'compound',
    difficulty: 'beginner',
    instructions: [
      'Sente na máquina de puxada com as coxas fixas',
      'Segure a barra com pegada pronada, mais larga que os ombros',
      'Incline ligeiramente o tronco para trás',
      'Puxe a barra até a altura do peito superior',
      'Retorne de forma controlada à posição inicial'
    ],
    tips: [
      'Puxe com as costas, não com os braços',
      'Mantenha o peito aberto',
      'Controle o movimento na volta'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5e49f50e-b22e-4c93-a28f-93795daf44d9.png',
    repRangeMin: 8,
    repRangeMax: 15,
    restTimeSeconds: 90,
    isCustom: false
  },
  {
    id: 'remada_curvada',
    name: 'Remada Curvada com Barra',
    category: 'back',
    primaryMuscles: ['latissimo_dorso', 'romboides', 'trapézio_médio'],
    secondaryMuscles: ['biceps', 'deltóide_posterior'],
    equipment: ['barbell'],
    type: 'compound',
    difficulty: 'intermediate',
    instructions: [
      'Fique em pé com a barra na mão, pegada pronada',
      'Incline o tronco para frente, mantendo as costas retas',
      'Deixe a barra pendurada com braços estendidos',
      'Puxe a barra até a altura do umbigo',
      'Desça de forma controlada'
    ],
    tips: [
      'Mantenha as costas retas durante todo movimento',
      'Não use impulso para levantar a barra',
      'Contraia as escápulas no final do movimento'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/40bec134-c0dd-4c2d-bb4f-7c4de718e286.png',
    repRangeMin: 6,
    repRangeMax: 12,
    restTimeSeconds: 120,
    isCustom: false
  },

  // PERNAS (LEGS)
  {
    id: 'agachamento_livre',
    name: 'Agachamento Livre',
    category: 'legs',
    primaryMuscles: ['quadriceps', 'glúteo_máximo'],
    secondaryMuscles: ['isquiotibiais', 'panturrilha', 'core'],
    equipment: ['barbell', 'squat_rack'],
    type: 'compound',
    difficulty: 'intermediate',
    instructions: [
      'Posicione a barra no trapézio, não no pescoço',
      'Pés na largura dos ombros, pontas ligeiramente para fora',
      'Mantenha o peito aberto e costas retas',
      'Desça até as coxas ficarem paralelas ao chão',
      'Suba empurrando pelos calcanhares'
    ],
    tips: [
      'Não deixe os joelhos passarem da linha dos pés',
      'Desça de forma controlada',
      'Mantenha o peso nos calcanhares'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3c11bb01-cff8-4dc9-8a6c-3b4d89287c22.png',
    repRangeMin: 6,
    repRangeMax: 15,
    restTimeSeconds: 180,
    isCustom: false
  },
  {
    id: 'leg_press_45',
    name: 'Leg Press 45°',
    category: 'legs',
    primaryMuscles: ['quadriceps', 'glúteo_máximo'],
    secondaryMuscles: ['isquiotibiais'],
    equipment: ['machine', 'leg_press'],
    type: 'compound',
    difficulty: 'beginner',
    instructions: [
      'Sente na máquina leg press com costas apoiadas',
      'Coloque os pés na plataforma na largura dos ombros',
      'Retire as travas de segurança',
      'Desça até formar 90° nos joelhos',
      'Empurre a plataforma de volta sem travar os joelhos'
    ],
    tips: [
      'Não desça muito além de 90°',
      'Mantenha os pés firmes na plataforma',
      'Controle o peso na descida'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/eeb60461-a534-473c-ac8d-e5923c76e55d.png',
    repRangeMin: 10,
    repRangeMax: 20,
    restTimeSeconds: 120,
    isCustom: false
  },

  // OMBROS (SHOULDERS)
  {
    id: 'desenvolvimento_militar',
    name: 'Desenvolvimento Militar',
    category: 'shoulders',
    primaryMuscles: ['deltóide_anterior', 'deltóide_médio'],
    secondaryMuscles: ['triceps', 'trapézio_superior'],
    equipment: ['barbell'],
    type: 'compound',
    difficulty: 'intermediate',
    instructions: [
      'Fique em pé com a barra na altura dos ombros',
      'Pegada um pouco mais larga que os ombros',
      'Mantenha o core contraído',
      'Empurre a barra verticalmente acima da cabeça',
      'Desça de forma controlada até a altura dos ombros'
    ],
    tips: [
      'Não faça o movimento atrás da cabeça',
      'Mantenha o core estável',
      'Controle o movimento na descida'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f44da713-dca3-4287-a240-d696e612db0e.png',
    repRangeMin: 8,
    repRangeMax: 12,
    restTimeSeconds: 120,
    isCustom: false
  },
  {
    id: 'elevacao_lateral',
    name: 'Elevação Lateral',
    category: 'shoulders',
    primaryMuscles: ['deltóide_médio'],
    secondaryMuscles: ['trapézio_superior'],
    equipment: ['dumbbell'],
    type: 'isolation',
    difficulty: 'beginner',
    instructions: [
      'Fique em pé com halteres ao lado do corpo',
      'Mantenha uma ligeira flexão nos cotovelos',
      'Eleve os braços lateralmente até a altura dos ombros',
      'Pause no topo do movimento',
      'Desça de forma controlada'
    ],
    tips: [
      'Não balance o corpo',
      'Use peso moderado para manter a forma',
      'Não eleve além da linha dos ombros'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f475d56d-8f0f-4a7e-8394-701831cc7f05.png',
    repRangeMin: 12,
    repRangeMax: 20,
    restTimeSeconds: 60,
    isCustom: false
  },

  // BRAÇOS (ARMS)
  {
    id: 'rosca_direta_barra',
    name: 'Rosca Direta com Barra',
    category: 'arms',
    primaryMuscles: ['biceps_braquial'],
    secondaryMuscles: ['braquial', 'braquiorradial'],
    equipment: ['barbell'],
    type: 'isolation',
    difficulty: 'beginner',
    instructions: [
      'Fique em pé com a barra nas mãos, pegada supinada',
      'Braços estendidos ao lado do corpo',
      'Mantenha os cotovelos fixos',
      'Flexione os braços levando a barra ao peito',
      'Desça de forma controlada'
    ],
    tips: [
      'Não balance o corpo',
      'Mantenha os cotovelos no lugar',
      'Controle o peso na descida'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b0147ce7-4765-4e14-b4f8-9c5b6c123f98.png',
    repRangeMin: 10,
    repRangeMax: 15,
    restTimeSeconds: 75,
    isCustom: false
  },
  {
    id: 'triceps_testa',
    name: 'Tríceps Testa',
    category: 'arms',
    primaryMuscles: ['triceps_braquial'],
    secondaryMuscles: [],
    equipment: ['barbell', 'bench'],
    type: 'isolation',
    difficulty: 'intermediate',
    instructions: [
      'Deite no banco segurando a barra com pegada fechada',
      'Estenda os braços acima do peito',
      'Flexione apenas os antebraços, descendo a barra até a testa',
      'Mantenha os cotovelos fixos',
      'Estenda os braços de volta'
    ],
    tips: [
      'Mantenha os cotovelos no lugar',
      'Use peso moderado',
      'Movimento controlado na descida'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8bce7198-57bf-44d5-ab88-bb6b40599d81.png',
    repRangeMin: 10,
    repRangeMax: 15,
    restTimeSeconds: 75,
    isCustom: false
  },

  // CORE/ABDÔMEN
  {
    id: 'prancha_abdominal',
    name: 'Prancha Abdominal',
    category: 'core',
    primaryMuscles: ['reto_abdominal', 'transverso_abdominal'],
    secondaryMuscles: ['oblíquos', 'eretor_espinal'],
    equipment: ['bodyweight'],
    type: 'isolation',
    difficulty: 'beginner',
    instructions: [
      'Posicione-se em prancha com antebraços apoiados',
      'Mantenha o corpo alinhado da cabeça aos pés',
      'Contraia o abdômen e glúteos',
      'Mantenha a posição pelo tempo determinado',
      'Respire normalmente durante o exercício'
    ],
    tips: [
      'Não deixe os quadris caírem ou subirem',
      'Mantenha a respiração constante',
      'Contraia o core durante todo o tempo'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/507dca06-968e-4f3f-aa5a-5989f725ff55.png',
    repRangeMin: 30, // seconds
    repRangeMax: 120, // seconds
    restTimeSeconds: 60,
    isCustom: false
  },

  // CARDIO
  {
    id: 'esteira_caminhada',
    name: 'Caminhada na Esteira',
    category: 'cardio',
    primaryMuscles: ['cardiovascular'],
    secondaryMuscles: ['quadriceps', 'panturrilha', 'glúteos'],
    equipment: ['cardio_equipment', 'treadmill'],
    type: 'cardio',
    difficulty: 'beginner',
    instructions: [
      'Ajuste a velocidade entre 5-7 km/h',
      'Mantenha postura ereta',
      'Use os braços naturalmente',
      'Mantenha o ritmo constante',
      'Monitore a frequência cardíaca'
    ],
    tips: [
      'Aumente gradualmente velocidade e inclinação',
      'Use tênis apropriado',
      'Hidrate-se durante o exercício'
    ],
    imageUrl: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f601b20f-8f99-40a6-9af9-320e103322fe.png',
    repRangeMin: 20, // minutes
    repRangeMax: 45, // minutes
    restTimeSeconds: 0,
    isCustom: false
  }
]

export const getExercisesByCategory = (category: string): Exercise[] => {
  return EXERCISE_LIBRARY.filter(exercise => exercise.category === category)
}

export const getExercisesByEquipment = (equipment: string[]): Exercise[] => {
  return EXERCISE_LIBRARY.filter(exercise => 
    exercise.equipment.some(eq => equipment.includes(eq))
  )
}

export const getExerciseById = (id: string): Exercise | undefined => {
  return EXERCISE_LIBRARY.find(exercise => exercise.id === id)
}

export const searchExercises = (query: string): Exercise[] => {
  const lowercaseQuery = query.toLowerCase()
  return EXERCISE_LIBRARY.filter(exercise => 
    exercise.name.toLowerCase().includes(lowercaseQuery) ||
    exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(lowercaseQuery)) ||
    exercise.category.toLowerCase().includes(lowercaseQuery)
  )
}