import type { ProcessingMode } from '../types';

export const processingModes: ProcessingMode[] = [
  // 썰기 모드
  {
    id: 'slice-cube',
    type: 'slice',
    name: '깍둑썰기',
    thickness: 'cube',
    description: '정육면체 모양으로 썰기합니다',
  },

  // 튀김 모드
  {
    id: 'fry',
    type: 'fry',
    name: '튀김',
    description: '재료를 튀김 처리합니다',
  },
];

export const getModesByType = (type: string) => {
  return processingModes.filter(m => m.type === type);
};
