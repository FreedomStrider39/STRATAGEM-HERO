import { useState, useEffect, useCallback, useRef } from "react";
import { STRATAGEMS, Direction, Stratagem } from "@/data/stratagems";

const INITIAL_TIME = 15;
const MAX_TIME = 30;
const BREAK_DURATION = 5;

export const useStratagemGame = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "break" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const [inputIndex, setInputIndex] = useState(0);
  const [lastInputCorrect, setLastInputCorrect] = useState<boolean | null>(null);
  
  const [missionQueue, setMissionQueue] = useState<Stratagem[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const breakTimerRef = useRef<NodeJS.Timeout | null>(null);

  const generateLevelQueue = useCallback((lvl: number) => {
    // Levels get significantly longer: 
    // L1: 5-7, L2: 8-10, L3: 11-13, etc.
    const minCount = 4 + (lvl * 2);
    const maxCount = 6 + (lvl * 3);
    const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    
    const queue: Stratagem[] = [];
    for (let i = 0; i < count; i++) {
      // Filter for longer sequences as level increases
      const pool = STRATAGEMS.filter(s => {
        if (lvl < 2) return s.sequence.length <= 5;
        if (lvl < 4) return s.sequence.length <= 7;
        return true;
      });
      queue.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return queue;
  }, []);

  const startGame = () => {
    const firstQueue = generateLevelQueue(1);
    setScore(0);
    setLevel(1);
    setTimeLeft(INITIAL_TIME);
    setMissionQueue(firstQueue);
    setCurrentQueueIndex(0);
    setInputIndex(0);
    setGameState("playing");
  };

  const startNextLevel = useCallback(() => {
    const nextLvl = level + 1;
    const nextQueue = generateLevelQueue(nextLvl);
    setLevel(nextLvl);
    setMissionQueue(nextQueue);
    setCurrentQueueIndex(0);
    setInputIndex(0);
    // Reset time but keep a portion of previous time as a reward
    setTimeLeft(prev => Math.min(MAX_TIME, INITIAL_TIME + (prev * 0.2)));
    setGameState("playing");
  }, [level, generateLevelQueue]);

  const handleInput = useCallback((direction: Direction) => {
    if (gameState !== "playing" || missionQueue.length === 0) return;

    const currentStratagem = missionQueue[currentQueueIndex];

    if (currentStratagem.sequence[inputIndex] === direction) {
      setLastInputCorrect(true);
      const nextInputIdx = inputIndex + 1;
      
      if (nextInputIdx === currentStratagem.sequence.length) {
        // Stratagem completed
        // Generous time bonus: 2s base + 0.5s per arrow in sequence
        const timeBonus = 1.5 + (currentStratagem.sequence.length * 0.3);
        const points = currentStratagem.sequence.length * 100 * level;
        
        setScore(prev => prev + points);
        setTimeLeft(prev => Math.min(prev + timeBonus, MAX_TIME));
        
        const nextQueueIdx = currentQueueIndex + 1;
        if (nextQueueIdx >= missionQueue.length) {
          setGameState("break");
          setBreakTimeLeft(BREAK_DURATION);
        } else {
          setCurrentQueueIndex(nextQueueIdx);
          setInputIndex(0);
        }
      } else {
        setInputIndex(nextInputIdx);
      }
    } else {
      setLastInputCorrect(false);
      setInputIndex(0);
      // Penalty for mistake: lose 1 second
      setTimeLeft(prev => Math.max(0, prev - 1));
    }

    setTimeout(() => setLastInputCorrect(null), 100);
  }, [gameState, missionQueue, currentQueueIndex, inputIndex, level]);

  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            setGameState("gameover");
            return 0;
          }
          // Drain rate increases slightly with level
          const drainRate = 0.1 + (level * 0.01);
          return prev - drainRate;
        });
      }, 100);
    } else if (gameState === "break") {
      breakTimerRef.current = setInterval(() => {
        setBreakTimeLeft(prev => {
          if (prev <= 0.1) {
            startNextLevel();
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (breakTimerRef.current) clearInterval(breakTimerRef.current);
    };
  }, [gameState, level, startNextLevel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") handleInput("U");
      if (e.key === "ArrowDown" || e.key === "s") handleInput("D");
      if (e.key === "ArrowLeft" || e.key === "a") handleInput("L");
      if (e.key === "ArrowRight" || e.key === "d") handleInput("R");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput]);

  return {
    gameState,
    score,
    level,
    timeLeft,
    breakTimeLeft,
    missionQueue,
    currentQueueIndex,
    inputIndex,
    lastInputCorrect,
    startGame,
    handleInput
  };
};