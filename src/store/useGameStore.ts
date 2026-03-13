import { create } from 'zustand';
import { GamePhase, GameSnapshot } from '../types/game.types';

interface GameStore {
  phase: GamePhase;
  score: number;
  targetLetter: string | null;
  lastPressedKey: string | null;
  blocksCleared: number;
  totalBlocks: number;
  ballX: number;
  ballY: number;
  currentTime: number;

  setPhase: (phase: GamePhase) => void;
  setScore: (score: number) => void;
  setTargetLetter: (letter: string | null) => void;
  setLastPressedKey: (key: string | null) => void;
  updateFromSnapshot: (snapshot: GameSnapshot) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  phase: 'idle',
  score: 0,
  targetLetter: null,
  lastPressedKey: null,
  blocksCleared: 0,
  totalBlocks: 0,
  ballX: 0,
  ballY: 0,
  currentTime: 0,

  setPhase: (phase) => set({ phase }),
  setScore: (score) => set({ score }),
  setTargetLetter: (letter) => set({ targetLetter: letter }),
  setLastPressedKey: (key) => set({ lastPressedKey: key }),

  updateFromSnapshot: (snapshot) =>
    set({
      phase: snapshot.phase,
      score: snapshot.score,
      targetLetter: snapshot.targetLetter,
      blocksCleared: snapshot.blocksCleared,
      totalBlocks: snapshot.totalBlocks,
      ballX: snapshot.ball.x,
      ballY: snapshot.ball.y,
      currentTime: snapshot.currentTime,
    }),

  reset: () =>
    set({
      phase: 'idle',
      score: 0,
      targetLetter: null,
      lastPressedKey: null,
      blocksCleared: 0,
      totalBlocks: 0,
      ballX: 0,
      ballY: 0,
      currentTime: 0,
    }),
}));
