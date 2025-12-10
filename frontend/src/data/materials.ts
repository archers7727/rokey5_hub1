import type { Material } from '../types';

export const materials: Material[] = [
  // 채소
  {
    id: 'onion',
    name: '양파',
    category: 'vegetable',
    image: '🧅',
    description: '자극적인 양파',
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
];

export const getMaterialsByCategory = (category: string) => {
  return materials.filter(m => m.category === category);
};
