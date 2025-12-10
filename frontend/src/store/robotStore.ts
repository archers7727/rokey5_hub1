import { create } from 'zustand';
import type { RobotState } from '../types';

interface RobotStore extends RobotState {
  // Actions
  setConnected: (connected: boolean) => void;
  setStatus: (status: RobotState['status']) => void;
  updateJointAngles: (angles: number[]) => void;
  updateForce: (force: number) => void;
  updateSpeed: (speed: number) => void;
  setError: (message: string) => void;
  clearError: () => void;
  resetRobot: () => void;
}

const initialState: RobotState = {
  isConnected: false,
  status: 'idle',
  jointAngles: [0, 0, 0, 0, 0, 0],
  force: 0,
  speed: 0,
  errorMessage: undefined,
};

export const useRobotStore = create<RobotStore>((set) => ({
  ...initialState,

  setConnected: (connected) => set({ isConnected: connected }),

  setStatus: (status) => set({ status }),

  updateJointAngles: (angles) => set({ jointAngles: angles }),

  updateForce: (force) => set({ force }),

  updateSpeed: (speed) => set({ speed }),

  setError: (message) =>
    set({
      status: 'error',
      errorMessage: message,
    }),

  clearError: () =>
    set({
      status: 'idle',
      errorMessage: undefined,
    }),

  resetRobot: () => set(initialState),
}));
