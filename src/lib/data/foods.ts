import { Food } from '../types'

export const FOOD_CATEGORIES = [
  { id: 'grains', name: 'Cereais e Grãos', icon: '🌾' },
  { id: 'proteins', name: 'Proteínas', icon: '🥩' },
  { id: 'dairy', name: 'Laticínios', icon: '🥛' },
  { id: 'vegetables', name: 'Vegetais', icon: '🥬' },
  { id: 'fruits', name: 'Frutas', icon: '🍎' },
  { id: 'legumes', name: 'Leguminosas', icon: '🫘' },
  { id: 'oils', name: 'Óleos e Gorduras', icon: '🫒' },
  { id: 'snacks', name: 'Lanches', icon: '🍪' },
  { id: 'beverages', name: 'Bebidas', icon: '🥤' }
] as const

// Brazilian Food Database - Common foods with accurate nutritional info
export const BRAZILIAN_FOODS: Food[] = [
  // CEREAIS E GRÃOS
  {
    id: 'arroz_branco_cozido',
    name: 'Arroz Branco Cozido',
    servingSize: 100, // grams
    calories: 128,
    protein: 2.7,
    carbs: 25.8,
    fat: 0.3,
    fiber: 0.4,
    sugar: 0.1,
    sodium: 1,
    isCustom: false
  },
  {
    id: 'arroz_integral_cozido',
    name: 'Arroz Integral Cozido',
    servingSize: 100,
    calories: 124,
    protein: 2.6,
    carbs: 25.0,
    fat: 1.0,
    fiber: 1.8,
    sugar: 0.4,
    sodium: 3,
    isCustom: false
  },
  {
    id: 'aveia_flocos',
    name: 'Aveia em Flocos',
    servingSize: 100,
    calories: 394,
    protein: 13.9,
    carbs: 67.0,
    fat: 8.5,
    fiber: 9.1,
    sugar: 1.1,
    sodium: 3,
    isCustom: false
  },
  {
    id: 'pao_frances',
    name: 'Pão Francês',
    servingSize: 50, // 1 unidade média
    calories: 135,
    protein: 4.5,
    carbs: 26.8,
    fat: 1.5,
    fiber: 1.5,
    sugar: 1.0,
    sodium: 193,
    isCustom: false
  },
  {
    id: 'pao_integral',
    name: 'Pão Integral (fatia)',
    servingSize: 25, // 1 fatia
    calories: 69,
    protein: 3.5,
    carbs: 11.6,
    fat: 1.4,
    fiber: 2.3,
    sugar: 1.1,
    sodium: 143,
    isCustom: false
  },
  {
    id: 'macarrao_cozido',
    name: 'Macarrão Cozido',
    servingSize: 100,
    calories: 111,
    protein: 3.4,
    carbs: 22.2,
    fat: 0.9,
    fiber: 1.4,
    sugar: 0.8,
    sodium: 1,
    isCustom: false
  },

  // PROTEÍNAS
  {
    id: 'peito_frango_grelhado',
    name: 'Peito de Frango Grelhado',
    servingSize: 100,
    calories: 195,
    protein: 29.8,
    carbs: 0,
    fat: 7.8,
    fiber: 0,
    sugar: 0,
    sodium: 63,
    isCustom: false
  },
  {
    id: 'carne_bovina_patinho',
    name: 'Patinho (Carne Bovina)',
    servingSize: 100,
    calories: 163,
    protein: 32.0,
    carbs: 0,
    fat: 3.2,
    fiber: 0,
    sugar: 0,
    sodium: 60,
    isCustom: false
  },
  {
    id: 'file_tilapia',
    name: 'Filé de Tilápia',
    servingSize: 100,
    calories: 96,
    protein: 20.1,
    carbs: 0,
    fat: 1.7,
    fiber: 0,
    sugar: 0,
    sodium: 52,
    isCustom: false
  },
  {
    id: 'ovo_inteiro_cozido',
    name: 'Ovo Cozido (inteiro)',
    servingSize: 50, // 1 ovo médio
    calories: 78,
    protein: 6.3,
    carbs: 0.6,
    fat: 5.3,
    fiber: 0,
    sugar: 0.6,
    sodium: 62,
    isCustom: false
  },
  {
    id: 'clara_ovo',
    name: 'Clara de Ovo',
    servingSize: 30, // 1 clara
    calories: 15,
    protein: 3.2,
    carbs: 0.2,
    fat: 0,
    fiber: 0,
    sugar: 0.2,
    sodium: 50,
    isCustom: false
  },

  // LATICÍNIOS
  {
    id: 'leite_desnatado',
    name: 'Leite Desnatado',
    servingSize: 200, // 1 copo
    calories: 70,
    protein: 6.8,
    carbs: 9.0,
    fat: 0.4,
    fiber: 0,
    sugar: 9.0,
    sodium: 100,
    isCustom: false
  },
  {
    id: 'iogurte_natural_desnatado',
    name: 'Iogurte Natural Desnatado',
    servingSize: 170, // 1 pote
    calories: 66,
    protein: 8.8,
    carbs: 9.0,
    fat: 0.2,
    fiber: 0,
    sugar: 9.0,
    sodium: 71,
    isCustom: false
  },
  {
    id: 'queijo_minas_frescal',
    name: 'Queijo Minas Frescal',
    servingSize: 30, // 1 fatia
    calories: 79,
    protein: 5.3,
    carbs: 1.0,
    fat: 6.0,
    fiber: 0,
    sugar: 1.0,
    sodium: 153,
    isCustom: false
  },
  {
    id: 'requeijao_light',
    name: 'Requeijão Light',
    servingSize: 30, // 1 colher de sopa
    calories: 54,
    protein: 3.6,
    carbs: 2.4,
    fat: 3.6,
    fiber: 0,
    sugar: 2.4,
    sodium: 189,
    isCustom: false
  },

  // FRUTAS
  {
    id: 'banana_prata',
    name: 'Banana Prata',
    servingSize: 60, // 1 unidade média
    calories: 56,
    protein: 0.8,
    carbs: 13.9,
    fat: 0.1,
    fiber: 1.5,
    sugar: 12.2,
    sodium: 1,
    isCustom: false
  },
  {
    id: 'maca_vermelha',
    name: 'Maçã Vermelha',
    servingSize: 130, // 1 unidade média
    calories: 69,
    protein: 0.4,
    carbs: 17.3,
    fat: 0.4,
    fiber: 2.0,
    sugar: 13.8,
    sodium: 1,
    isCustom: false
  },
  {
    id: 'mamao_papaya',
    name: 'Mamão Papaya',
    servingSize: 100, // fatias
    calories: 32,
    protein: 0.8,
    carbs: 8.3,
    fat: 0.1,
    fiber: 1.8,
    sugar: 7.8,
    sodium: 3,
    isCustom: false
  },
  {
    id: 'abacaxi_fatias',
    name: 'Abacaxi (fatias)',
    servingSize: 100,
    calories: 48,
    protein: 0.9,
    carbs: 12.3,
    fat: 0.1,
    fiber: 1.0,
    sugar: 11.9,
    sodium: 1,
    isCustom: false
  },

  // VEGETAIS
  {
    id: 'brócolis_cozido',
    name: 'Brócolis Cozido',
    servingSize: 100,
    calories: 25,
    protein: 3.0,
    carbs: 4.0,
    fat: 0.4,
    fiber: 3.4,
    sugar: 1.9,
    sodium: 41,
    isCustom: false
  },
  {
    id: 'couve_folhas',
    name: 'Couve (folhas)',
    servingSize: 100,
    calories: 27,
    protein: 2.9,
    carbs: 4.3,
    fat: 0.5,
    fiber: 3.1,
    sugar: 1.5,
    sodium: 9,
    isCustom: false
  },
  {
    id: 'tomate_salada',
    name: 'Tomate para Salada',
    servingSize: 100,
    calories: 15,
    protein: 1.1,
    carbs: 3.1,
    fat: 0.2,
    fiber: 1.2,
    sugar: 2.4,
    sodium: 4,
    isCustom: false
  },
  {
    id: 'alface_americana',
    name: 'Alface Americana',
    servingSize: 100,
    calories: 11,
    protein: 1.4,
    carbs: 1.8,
    fat: 0.2,
    fiber: 1.1,
    sugar: 1.2,
    sodium: 7,
    isCustom: false
  },
  {
    id: 'cenoura_crua',
    name: 'Cenoura Crua',
    servingSize: 100,
    calories: 34,
    protein: 1.3,
    carbs: 7.7,
    fat: 0.2,
    fiber: 3.2,
    sugar: 5.6,
    sodium: 66,
    isCustom: false
  },

  // LEGUMINOSAS
  {
    id: 'feijao_carioca_cozido',
    name: 'Feijão Carioca Cozido',
    servingSize: 100,
    calories: 76,
    protein: 4.8,
    carbs: 13.6,
    fat: 0.5,
    fiber: 8.5,
    sugar: 0.3,
    sodium: 2,
    isCustom: false
  },
  {
    id: 'lentilha_cozida',
    name: 'Lentilha Cozida',
    servingSize: 100,
    calories: 93,
    protein: 8.0,
    carbs: 15.2,
    fat: 0.5,
    fiber: 7.9,
    sugar: 1.5,
    sodium: 3,
    isCustom: false
  },
  {
    id: 'grao_de_bico_cozido',
    name: 'Grão de Bico Cozido',
    servingSize: 100,
    calories: 121,
    protein: 8.4,
    carbs: 18.0,
    fat: 2.0,
    fiber: 7.6,
    sugar: 2.9,
    sodium: 7,
    isCustom: false
  },

  // ÓLEOS E GORDURAS
  {
    id: 'azeite_oliva_extra_virgem',
    name: 'Azeite de Oliva Extra Virgem',
    servingSize: 10, // 1 colher de sopa
    calories: 90,
    protein: 0,
    carbs: 0,
    fat: 10.0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    isCustom: false
  },
  {
    id: 'oleo_coco',
    name: 'Óleo de Coco',
    servingSize: 10, // 1 colher de sopa
    calories: 90,
    protein: 0,
    carbs: 0,
    fat: 10.0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    isCustom: false
  },
  {
    id: 'abacate',
    name: 'Abacate',
    servingSize: 100,
    calories: 96,
    protein: 1.2,
    carbs: 6.0,
    fat: 8.4,
    fiber: 6.3,
    sugar: 0.3,
    sodium: 2,
    isCustom: false
  },

  // OLEAGINOSAS E CASTANHAS
  {
    id: 'amendoim_torrado',
    name: 'Amendoim Torrado',
    servingSize: 30, // 1 punhado
    calories: 176,
    protein: 7.8,
    carbs: 5.1,
    fat: 15.1,
    fiber: 2.4,
    sugar: 1.2,
    sodium: 2,
    isCustom: false
  },
  {
    id: 'castanha_para',
    name: 'Castanha do Pará',
    servingSize: 30, // 3-4 unidades
    calories: 208,
    protein: 4.3,
    carbs: 3.6,
    fat: 20.6,
    fiber: 2.4,
    sugar: 0.7,
    sodium: 1,
    isCustom: false
  },

  // BEBIDAS
  {
    id: 'agua',
    name: 'Água',
    servingSize: 250, // 1 copo
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    isCustom: false
  },
  {
    id: 'cafe_coado',
    name: 'Café Coado (sem açúcar)',
    servingSize: 150, // 1 xícara
    calories: 2,
    protein: 0.1,
    carbs: 0.5,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 2,
    isCustom: false
  },
  {
    id: 'cha_verde',
    name: 'Chá Verde',
    servingSize: 200, // 1 xícara
    calories: 2,
    protein: 0,
    carbs: 0.5,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 1,
    isCustom: false
  },

  // SUPLEMENTOS COMUNS
  {
    id: 'whey_protein_baunilha',
    name: 'Whey Protein Baunilha',
    servingSize: 30, // 1 scoop
    calories: 120,
    protein: 24.0,
    carbs: 3.0,
    fat: 1.5,
    fiber: 1.0,
    sugar: 2.0,
    sodium: 50,
    isCustom: false
  },
  {
    id: 'creatina_monohidratada',
    name: 'Creatina Monohidratada',
    servingSize: 5, // 1 colher de chá
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    isCustom: false
  }
]

export const getFoodsByCategory = (category: string): Food[] => {
  // This would need more sophisticated categorization logic
  // For now, return a subset based on simple name matching
  switch (category) {
    case 'grains':
      return BRAZILIAN_FOODS.filter(food => 
        food.name.toLowerCase().includes('arroz') ||
        food.name.toLowerCase().includes('aveia') ||
        food.name.toLowerCase().includes('pão') ||
        food.name.toLowerCase().includes('macarrão')
      )
    case 'proteins':
      return BRAZILIAN_FOODS.filter(food =>
        food.name.toLowerCase().includes('frango') ||
        food.name.toLowerCase().includes('carne') ||
        food.name.toLowerCase().includes('peixe') ||
        food.name.toLowerCase().includes('ovo') ||
        food.name.toLowerCase().includes('whey')
      )
    case 'fruits':
      return BRAZILIAN_FOODS.filter(food =>
        food.name.toLowerCase().includes('banana') ||
        food.name.toLowerCase().includes('maçã') ||
        food.name.toLowerCase().includes('mamão') ||
        food.name.toLowerCase().includes('abacaxi')
      )
    default:
      return BRAZILIAN_FOODS
  }
}

export const getFoodById = (id: string): Food | undefined => {
  return BRAZILIAN_FOODS.find(food => food.id === id)
}

export const searchFoods = (query: string): Food[] => {
  const lowercaseQuery = query.toLowerCase()
  return BRAZILIAN_FOODS.filter(food => 
    food.name.toLowerCase().includes(lowercaseQuery) ||
    food.brand?.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 20) // Limit results
}

// Quick add foods for common meals
export const QUICK_ADD_MEALS = [
  {
    name: 'Café da Manhã Típico',
    foods: [
      { foodId: 'pao_frances', quantity: 50 },
      { foodId: 'requeijao_light', quantity: 15 },
      { foodId: 'cafe_coado', quantity: 150 },
      { foodId: 'banana_prata', quantity: 60 }
    ]
  },
  {
    name: 'Almoço Brasileiro',
    foods: [
      { foodId: 'arroz_branco_cozido', quantity: 150 },
      { foodId: 'feijao_carioca_cozido', quantity: 100 },
      { foodId: 'peito_frango_grelhado', quantity: 120 },
      { foodId: 'brócolis_cozido', quantity: 80 }
    ]
  },
  {
    name: 'Lanche Pós-Treino',
    foods: [
      { foodId: 'whey_protein_baunilha', quantity: 30 },
      { foodId: 'banana_prata', quantity: 60 },
      { foodId: 'aveia_flocos', quantity: 30 }
    ]
  }
]