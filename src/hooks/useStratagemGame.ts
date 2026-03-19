import { useState, useEffect, useCallback, useRef } from "react";
import { STRATAGEMS, Direction, Stratagem } from "@/data/stratagems";

const INITIAL_TIME = 10;
const BREAK_DURATION = 5; // Reduced break for better flow

export const useStratagemGame = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "break" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const [inputIndex, setInputIndex] = useState(0);
  const [lastInputCorrect, setLastInputCorrect] = useState<boolean | null>(null);
  
  // Mission Queue State
  const [missionQueue, setMissionQueue] = useState<Stratagem[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const breakTimerRef = useRef<NodeJS.Timeout | null>(null);

  const generateLevelQueue = useCallback((lvl: number) => {
    // Difficulty increases: more stratagems per level as you go up
    // Level 1: 3-5, Level 2: 4-6, Level 5: 7-9, etc.
    const minCount = 2 + Math.floor(lvl / 2);
    const maxCount = 4 + Math.floor(lvl / 1.5);
    const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    
    const queue: Stratagem[] = [];
    for (let i = 0; i < count; i++) {
      // Later levels include more complex stratagems (longer sequences)
      const pool = STRATAGEMS.filter(s => {
        if (lvl < 3) return s.sequence.length <= 4;
        if (lvl < 6) return s.sequence.length <= 6;
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
    setTimeLeft(Math.min(INITIAL_TIME + (nextLvl * 0.5), 20)); // Slightly more time for longer levels
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
        const timeBonus = Math.max(0.5, 2 - (level * 0.1)); // Bonus decreases as level increases
        const points = currentStratagem.sequence.length * 100 * level;
        
        setScore(prev => prev + points);
        setTimeLeft(prev => Math.min(prev + timeBonus, 20));
        
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
      setInputIndex(0); // Reset on mistake
    }

    setTimeout(() => setLastInputCorrect(null), 100);
  }, [gameState, missionQueue, currentQueueIndex, inputIndex, level]);

  // Timers
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            setGameState("gameover");
            return 0;
          }
          // Difficulty: Time drains faster at higher levels
          const drainRate = 0.1 + (level * 0.005);
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

  // Keyboard support
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