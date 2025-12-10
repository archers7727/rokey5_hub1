import { create } from 'zustand';
import type { Material, ProcessingMode, JobStatus, JobHistory } from '../types';

interface JobStore {
  // 선택된 재료와 모드
  selectedMaterial: Material | null;
  selectedMode: ProcessingMode | null;

  // 현재 작업 상태
  currentJob: JobStatus | null;

  // 작업 이력
  jobHistory: JobHistory[];

  // Actions
  setSelectedMaterial: (material: Material | null) => void;
  setSelectedMode: (mode: ProcessingMode | null) => void;
  startJob: () => void;
  updateJobProgress: (progress: number, currentStep: string) => void;
  pauseJob: () => void;
  resumeJob: () => void;
  completeJob: () => void;
  errorJob: (errorMessage: string) => void;
  resetSelection: () => void;
  addToHistory: (history: JobHistory) => void;
}

export const useJobStore = create<JobStore>((set, get) => ({
  selectedMaterial: null,
  selectedMode: null,
  currentJob: null,
  jobHistory: [],

  setSelectedMaterial: (material) => set({ selectedMaterial: material }),

  setSelectedMode: (mode) => set({ selectedMode: mode }),

  startJob: () => {
    const { selectedMaterial, selectedMode } = get();
    if (!selectedMaterial || !selectedMode) return;

    const newJob: JobStatus = {
      id: `job-${Date.now()}`,
      material: selectedMaterial,
      mode: selectedMode,
      status: 'running',
      progress: 0,
      currentStep: '작업 시작',
      startTime: new Date(),
      estimatedTime: 180, // 3분 예상
      elapsedTime: 0,
    };

    set({ currentJob: newJob });
  },

  updateJobProgress: (progress, currentStep) => {
    const { currentJob } = get();
    if (!currentJob) return;

    const elapsedTime = Math.floor((Date.now() - currentJob.startTime.getTime()) / 1000);

    set({
      currentJob: {
        ...currentJob,
        progress,
        currentStep,
        elapsedTime,
      },
    });
  },

  pauseJob: () => {
    const { currentJob } = get();
    if (!currentJob) return;

    set({
      currentJob: {
        ...currentJob,
        status: 'paused',
      },
    });
  },

  resumeJob: () => {
    const { currentJob } = get();
    if (!currentJob) return;

    set({
      currentJob: {
        ...currentJob,
        status: 'running',
      },
    });
  },

  completeJob: () => {
    const { currentJob, jobHistory } = get();
    if (!currentJob) return;

    const completedJob: JobHistory = {
      id: currentJob.id,
      material: currentJob.material,
      mode: currentJob.mode,
      completedAt: new Date(),
      duration: currentJob.elapsedTime,
      status: 'success',
    };

    set({
      currentJob: {
        ...currentJob,
        status: 'completed',
        progress: 100,
      },
      jobHistory: [completedJob, ...jobHistory].slice(0, 10), // 최근 10개만 유지
    });
  },

  errorJob: (errorMessage) => {
    const { currentJob } = get();
    if (!currentJob) return;

    set({
      currentJob: {
        ...currentJob,
        status: 'error',
        currentStep: errorMessage,
      },
    });
  },

  resetSelection: () => {
    set({
      selectedMaterial: null,
      selectedMode: null,
      currentJob: null,
    });
  },

  addToHistory: (history) => {
    const { jobHistory } = get();
    set({
      jobHistory: [history, ...jobHistory].slice(0, 10),
    });
  },
}));
