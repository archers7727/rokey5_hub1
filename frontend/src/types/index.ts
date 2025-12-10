// 재료 카테고리 타입
export type MaterialCategory = 'meat' | 'vegetable' | 'fruit';

// 재료 타입
export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  image: string;
  description: string;
}

// 손질 타입
export type ProcessingType = 'slice' | 'dice' | 'peel' | 'fry';

// 썰기 두께
export type SliceThickness = 'thin' | 'medium' | 'thick' | 'cube';

// 다지기 크기
export type DiceSize = 'coarse' | 'fine';

// 박피 옵션
export type PeelOption = 'peel-only' | 'peel-and-slice';

// 손질 모드 타입
export interface ProcessingMode {
  id: string;
  type: ProcessingType;
  name: string;
  thickness?: SliceThickness;
  diceSize?: DiceSize;
  peelOption?: PeelOption;
  description: string;
  mmSize?: string; // 예: "2-3mm", "5-7mm"
}

// 작업 상태
export type JobStatusType = 'pending' | 'running' | 'paused' | 'completed' | 'error';

// 작업 상태 타입
export interface JobStatus {
  id: string;
  material: Material;
  mode: ProcessingMode;
  status: JobStatusType;
  progress: number; // 0-100
  currentStep: string;
  startTime: Date;
  estimatedTime: number; // seconds
  elapsedTime: number; // seconds
}

// 로봇 상태
export type RobotStatusType = 'idle' | 'working' | 'error';

// 로봇 상태 타입
export interface RobotState {
  isConnected: boolean;
  status: RobotStatusType;
  jointAngles: number[]; // 6개 관절
  force: number; // Newton
  speed: number; // mm/s
  errorMessage?: string;
}

// 작업 이력
export interface JobHistory {
  id: string;
  material: Material;
  mode: ProcessingMode;
  completedAt: Date;
  duration: number; // seconds
  status: 'success' | 'failed';
}
