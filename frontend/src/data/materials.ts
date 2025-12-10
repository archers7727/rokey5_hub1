import type { Material } from '../types';

export const materials: Material[] = [
  // 육류
  {
    id: 'beef',
    name: '소고기',
    category: 'meat',
    image: '🥩',
    description: '신선한 소고기',
  },
  {
    id: 'pork',
    name: '돼지고기',
    category: 'meat',
    image: '🥓',
    description: '신선한 돼지고기',
  },
  {
    id: 'chicken',
    name: '닭고기',
    category: 'meat',
    image: '🍗',
    description: '신선한 닭고기',
  },

  // 채소
  {
    id: 'onion',
    name: '양파',
    category: 'vegetable',
    image: '🧅',
    description: '자극적인 양파',
  },
  {
    id: 'carrot',
    name: '당근',
    category: 'vegetable',
    image: '🥕',
    description: '영양가 높은 당근',
  },
  {
    id: 'paprika',
    name: '파프리카',
    category: 'vegetable',
    image: '🫑',
    description: '색깔 고운 파프리카',
  },
  {
    id: 'potato',
    name: '감자',
    category: 'vegetable',
    image: '🥔',
    description: '든든한 감자',
  },

  // 과일
  {
    id: 'apple',
    name: '사과',
    category: 'fruit',
    image: '🍎',
    description: '아삭한 사과',
  },
  {
    id: 'pear',
    name: '배',
    category: 'fruit',
    image: '🍐',
    description: '달콤한 배',
  },
  {
    id: 'watermelon',
    name: '수박',
    category: 'fruit',
    image: '🍉',
    description: '시원한 수박',
  },
];

export const getMaterialsByCategory = (category: string) => {
  return materials.filter(m => m.category === category);
};
