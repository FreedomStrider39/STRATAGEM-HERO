import { useState, useEffect, useCallback, useRef } from "react";
import { STRATAGEMS, Direction, Stratagem } from "@/data/stratagems";
import { audioManager } from "@/utils/audio";

const INITIAL_TIME = 30;
const MAX_TIME = 30;
const BREAK_DURATION = 4;
const BASE_TIME_REWARD = 1.0;
const DISRUPTOR_REFRESH_MS = 2500;

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
  
  // Challenges
  const [isDisrupted, setIsDisrupted] = useState(false);
  const [disruptedCount, setDisruptedCount] = useState(0);
  const [disruptedLimit, setDisruptedLimit] = useState(0);
  const [showDisruptorDestroyed, setShowDisruptorDestroyed] = useState(false);
  const [activeSequence, setActiveSequence] = useState<Direction[]>([]);
  
  const [missionQueue, setMissionQueue] = useState<Stratagem[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  
  const [mistakesInGame, setMistakesInGame] = useState(0);
  const [errorsThisStratagem, setErrorsThisStratagem] = useState(0);

  const [stats, setStats] = useState<GameStats>({
    roundBonus: 0,
    timeBonus: 0,
    perfectBonus: 0,
    totalScore: 0
  });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const breakTimerRef = useRef<NodeJS.Timeout | null>(null);
  const disruptorIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stratagemStartTimeRef = useRef<number>(0);
  const lastDisruptedRoundRef = useRef<number>(0);

  const getRandomDirection = (): Direction => {
    const dirs: Direction[] = ["U", "D", "L", "R"];
    return dirs[Math.floor(Math.random() * dirs.length)];
  };

  const generateRandomSequence = (length: number): Direction[] => {
    return Array.from({ length }, () => getRandomDirection());
  };

  const getRoundSize = (lvl: number) => {
    // Base size is 8. After level 5, add 2 more per level.
    if (lvl <= 5) return 8;
    return 8 + (lvl - 5) * 2;
  };

  const generateRound = (size: number) => {
    const round: Stratagem[] = [];
    for (let i = 0; i < size; i++) {
      const randomStrat = STRATAGEMS[Math.floor(Math.random() * STRATAGEMS.length)];
      round.push(randomStrat);
    }
    return round;
  };

  const startGame = () => {
    audioManager.playStart();
    audioManager.startBgm(true);
    
    const firstRoundSize = getRoundSize(1);
    const firstRound = generateRound(firstRoundSize);
    
    setScore(0);
    setLevel(1);
    setTimeLeft(INITIAL_TIME);
    setMissionQueue(firstRound);
    setCurrentQueueIndex(0);
    setInputIndex(0);
    setActiveSequence(firstRound[0].sequence);
    setMistakesInGame(0);
    setErrorsThisStratagem(0);
    setIsDisrupted(false);
    setDisruptedCount(0);
    setDisruptedLimit(0);
    setShowDisruptorDestroyed(false);
    lastDisruptedRoundRef.current = -5;
    stratagemStartTimeRef.current = Date.now();
    setGameState("playing");
  };

  const calculateFinalStats = useCallback(() => {
    const rBonus = level * 50;
    const tBonus = Math.floor(timeLeft * 10);
    const pBonus = mistakesInGame === 0 ? 500 : 0;
    
    setStats({
      roundBonus: rBonus,
      timeBonus: tBonus,
      perfectBonus: pBonus,
      totalScore: score + rBonus + tBonus + pBonus
    });
  }, [level, timeLeft, mistakesInGame, score]);

  const startNextLevel = useCallback(() => {
    const nextLvl = level + 1;
    const nextRoundSize = getRoundSize(nextLvl);
    const nextRound = generateRound(nextRoundSize);
    
    const roundsSinceLast = nextLvl - lastDisruptedRoundRef.current;
    const canDisrupt = nextLvl >= 5 && roundsSinceLast >= 4;
    const shouldDisrupt = canDisrupt && Math.random() < 0.25;

    if (shouldDisrupt) {
      audioManager.playError();
      setIsDisrupted(true);
      lastDisruptedRoundRef.current = nextLvl;
      const limit = Math.floor(Math.random() * 3) + 2;
      setDisruptedLimit(limit);
      setDisruptedCount(0);
      const firstFake = generateRandomSequence(nextRound[0].sequence.length);
      setActiveSequence(firstFake);
    } else {
      setIsDisrupted(false);
      setDisruptedLimit(0);
      setDisruptedCount(0);
      setActiveSequence(nextRound[0].sequence);
    }

    setShowDisruptorDestroyed(false);
    setLevel(nextLvl);
    setMissionQueue(nextRound);
    setCurrentQueueIndex(0);
    setInputIndex(0);
    setErrorsThisStratagem(0);
    setTimeLeft(INITIAL_TIME);
    stratagemStartTimeRef.current = Date.now();
    setGameState("playing");
  }, [level, calculateFinalStats]);

  useEffect(() => {
    if (gameState === "playing" && isDisrupted) {
      disruptorIntervalRef.current = setInterval(() => {
        const currentStrat = missionQueue[currentQueueIndex];
        if (currentStrat) {
          setActiveSequence(generateRandomSequence(currentStrat.sequence.length));
          setInputIndex(0);
          audioManager.playHit();
        }
      }, DISRUPTOR_REFRESH_MS);
    } else {
      if (disruptorIntervalRef.current) clearInterval(disruptorIntervalRef.current);
    }
    return () => {
      if (disruptorIntervalRef.current) clearInterval(disruptorIntervalRef.current);
    };
  }, [gameState, isDisrupted, currentQueueIndex, missionQueue]);

  const handleInput = useCallback((direction: Direction) => {
    if (gameState !== "playing" || missionQueue.length === 0) return;

    if (activeSequence[inputIndex] === direction) {
      setLastInputCorrect(true);
      const nextInputIdx = inputIndex + 1;
      
      if (nextInputIdx === activeSequence.length) {
        audioManager.playCorrect();
        
        const timeTaken = Date.now() - stratagemStartTimeRef.current;
        const complexityBonus = activeSequence.length * 12;
        const speedBonus = Math.max(0, Math.floor((2500 - timeTaken) / 50));
        const errorPenalty = errorsThisStratagem * 15;
        
        const points = Math.max(5, complexityBonus + speedBonus - errorPenalty);
        setScore(prev => prev + points);
        
        const timeReward = BASE_TIME_REWARD + (activeSequence.length * 0.1);
        setTimeLeft(prev => Math.min(prev + timeReward, MAX_TIME));
        
        const nextQueueIdx = currentQueueIndex + 1;
        
        let nextIsDisrupted = isDisrupted;
        if (isDisrupted) {
          const newCount = disruptedCount + 1;
          setDisruptedCount(newCount);
          if (newCount >= disruptedLimit) {
            nextIsDisrupted = false;
            setIsDisrupted(false);
            setShowDisruptorDestroyed(true);
            audioManager.playSuccess();
            setTimeout(() => setShowDisruptorDestroyed(false), 3000);
          }
        }

        if (nextQueueIdx >= missionQueue.length) {
          audioManager.playSuccess();
          setGameState("break");
          setBreakTimeLeft(BREAK_DURATION);
        } else {
          const nextStrat = missionQueue[nextQueueIdx];
          setCurrentQueueIndex(nextQueueIdx);
          setInputIndex(0);
          setErrorsThisStratagem(0);
          
          if (nextIsDisrupted) {
            setActiveSequence(generateRandomSequence(nextStrat.sequence.length));
          } else {
            setActiveSequence(nextStrat.sequence);
          }
          
          stratagemStartTimeRef.current = Date.now();
        }
      } else {
        audioManager.playHit();
        setInputIndex(nextInputIdx);
      }
    } else {
      audioManager.playError();
      setLastInputCorrect(false);
      setInputIndex(0);
      setErrorsThisStratagem(prev => prev + 1);
      setMistakesInGame(prev => prev + 1);
    }

    setTimeout(() => setLastInputCorrect(null), 100);
  }, [gameState, missionQueue, currentQueueIndex, inputIndex, errorsThisStratagem, activeSequence, isDisrupted, disruptedCount, disruptedLimit]);

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
    isDisrupted,
    showDisruptorDestroyed,
    activeSequence,
    stats,
    startGame,
    handleInput
  };
};