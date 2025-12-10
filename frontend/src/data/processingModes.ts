import type { ProcessingMode } from '../types';

export const processingModes: ProcessingMode[] = [
  // 썰기 모드
  {
    id: 'slice-thin',
    type: 'slice',
    name: '얇게 썰기',
    thickness: 'thin',
    mmSize: '2-3mm',
    description: '얇게 슬라이스합니다',
  },
  {
    id: 'slice-medium',
    type: 'slice',
    name: '보통 썰기',
    thickness: 'medium',
    mmSize: '5-7mm',
    description: '보통 두께로 썰기합니다',
  },
  {
    id: 'slice-thick',
    type: 'slice',
    name: '두껍게 썰기',
    thickness: 'thick',
    mmSize: '10-15mm',
    description: '두껍게 썰기합니다',
  },
  {
    id: 'slice-cube',
    type: 'slice',
    name: '깍둑썰기',
    thickness: 'cube',
    description: '정육면체 모양으로 썰기합니다',
  },

  // 다지기 모드
  {
    id: 'dice-coarse',
    type: 'dice',
    name: '굵게 다지기',
    diceSize: 'coarse',
    description: '굵게 다집니다',
  },
  {
    id: 'dice-fine',
    type: 'dice',
    name: '곱게 다지기',
    diceSize: 'fine',
    description: '곱게 다집니다',
  },

  // 박피 모드
  {
    id: 'peel-only',
    type: 'peel',
    name: '껍질 제거만',
    peelOption: 'peel-only',
    description: '껍질만 제거합니다',
  },
  {
    id: 'peel-and-slice',
    type: 'peel',
    name: '껍질 제거 + 슬라이스',
    peelOption: 'peel-and-slice',
    description: '껍질을 제거하고 슬라이스합니다',
  },
];

export const getModesByType = (type: string) => {
  return processingModes.filter(m => m.type === type);
};
