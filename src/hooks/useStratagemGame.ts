import { useState, useEffect, useCallback, useRef } from "react";
import { STRATAGEMS, Direction, Stratagem } from "@/data/stratagems";
import { audioManager } from "@/utils/audio";

const INITIAL_TIME = 30;
const MAX_TIME = 30;
const BREAK_DURATION = 4;
const BASE_TIME_REWARD = 1.0;

export interface GameStats {
  roundBonus: number;
  timeBonus: number;
  perfectBonus: number;
  totalScore: number;
}

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
  const [lastQueueSize, setLastQueueSize] = useState(0);
  
  const [mistakesInGame, setMistakesInGame] = useState(0);
  const [errorsThisStratagem, setErrorsThisStratagem] = useState(0);
  const stratagemStartTimeRef = useRef<number>(0);

  const [stats, setStats] = useState<GameStats>({
    roundBonus: 0,
    timeBonus: 0,
    perfectBonus: 0,
    totalScore: 0
  });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const breakTimerRef = useRef<NodeJS.Timeout | null>(null);

  const generateLevelQueue = useCallback((lvl: number, prevSize: number) => {
    let count = lvl === 1 ? 6 : prevSize + Math.floor(Math.random() * 3) + 1;
    const queue: Stratagem[] = [];
    for (let i = 0; i < count; i++) {
      const pool = STRATAGEMS.filter(s => {
        if (lvl < 3) return s.sequence.length <= 5;
        if (lvl < 6) return s.sequence.length <= 7;
        return true;
      });
      queue.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return { queue, count };
  }, []);

  const startGame = () => {
    audioManager.playStart();
    const { queue, count } = generateLevelQueue(1, 0);
    setScore(0);
    setLevel(1);
    setTimeLeft(INITIAL_TIME);
    setMissionQueue(queue);
    setLastQueueSize(count);
    setCurrentQueueIndex(0);
    setInputIndex(0);
    setMistakesInGame(0);
    setErrorsThisStratagem(0);
    stratagemStartTimeRef.current = Date.now();
    setGameState("playing");
  };

  const calculateFinalStats = useCallback(() => {
    const rBonus = level * 100;
    const tBonus = Math.floor(timeLeft * 20);
    const pBonus = mistakesInGame === 0 ? 1000 : 0;
    
    setStats({
      roundBonus: rBonus,
      timeBonus: tBonus,
      perfectBonus: pBonus,
      totalScore: score + rBonus + tBonus + pBonus
    });
  }, [level, timeLeft, mistakesInGame, score]);

  const startNextLevel = useCallback(() => {
    const nextLvl = level + 1;
    const { queue, count } = generateLevelQueue(nextLvl, lastQueueSize);
    setLevel(nextLvl);
    setMissionQueue(queue);
    setLastQueueSize(count);
    setCurrentQueueIndex(0);
    setInputIndex(0);
    setErrorsThisStratagem(0);
    setTimeLeft(INITIAL_TIME);
    stratagemStartTimeRef.current = Date.now();
    setGameState("playing");
  }, [level, lastQueueSize, generateLevelQueue]);

  const handleInput = useCallback((direction: Direction) => {
    if (gameState !== "playing" || missionQueue.length === 0) return;

    const currentStratagem = missionQueue[currentQueueIndex];

    if (currentStratagem.sequence[inputIndex] === direction) {
      // Correct key press
      setLastInputCorrect(true);
      const nextInputIdx = inputIndex + 1;
      
      if (nextInputIdx === currentStratagem.sequence.length) {
        // Completed Stratagem
        audioManager.playCorrect();
        
        // Calculate Score
        const timeTaken = Date.now() - stratagemStartTimeRef.current;
        const complexityBonus = currentStratagem.sequence.length * 100;
        const speedBonus = Math.max(0, Math.floor((3000 - timeTaken) / 10)); // Bonus if under 3 seconds
        const errorPenalty = errorsThisStratagem * 50;
        
        const points = Math.max(10, complexityBonus + speedBonus - errorPenalty);
        setScore(prev => prev + points);
        
        // Time Reward
        const timeReward = BASE_TIME_REWARD + (currentStratagem.sequence.length * 0.1);
        setTimeLeft(prev => Math.min(prev + timeReward, MAX_TIME));
        
        const nextQueueIdx = currentQueueIndex + 1;
        if (nextQueueIdx >= missionQueue.length) {
          // End of Level
          audioManager.playSuccess();
          setGameState("break");
          setBreakTimeLeft(BREAK_DURATION);
        } else {
          setCurrentQueueIndex(nextQueueIdx);
          setInputIndex(0);
          setErrorsThisStratagem(0);
          stratagemStartTimeRef.current = Date.now();
        }
      } else {
        setInputIndex(nextInputIdx);
      }
    } else {
      // Mistake while typing
      audioManager.playHit();
      setLastInputCorrect(false);
      setInputIndex(0); // Reset sequence on error
      setErrorsThisStratagem(prev => prev + 1);
      setMistakesInGame(prev => prev + 1);
    }

    setTimeout(() => setLastInputCorrect(null), 100);
  }, [gameState, missionQueue, currentQueueIndex, inputIndex, errorsThisStratagem]);

  useEffect(() => {
    if (gameState === "playing") {
      audioManager.startBgm();
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            audioManager.stopBgm();
            audioManager.playFailure();
            calculateFinalStats();
            setGameState("gameover");
            return 0;
          }
          const drainRate = 0.18 + (level * 0.02);
          return prev - drainRate;
        });
      }, 100);
    } else if (gameState === "break") {
      audioManager.stopBgm();
      breakTimerRef.current = setInterval(() => {
        setBreakTimeLeft(prev => {
          if (prev <= 0.1) {
            startNextLevel();
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    } else {
      audioManager.stopBgm();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (breakTimerRef.current) clearInterval(breakTimerRef.current);
    };
  }, [gameState, level, startNextLevel, calculateFinalStats]);

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
    maxTime: MAX_TIME,
    breakTimeLeft,
    missionQueue,
    currentQueueIndex,
    inputIndex,
    lastInputCorrect,
    stats,
    startGame,
    handleInput
  };
};