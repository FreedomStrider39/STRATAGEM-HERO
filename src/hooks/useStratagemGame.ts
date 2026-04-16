import { useState, useEffect, useCallback, useRef } from "react";
import { STRATAGEMS, Direction, Stratagem } from "@/data/stratagems";
import { audioManager } from "@/utils/audio";

const INITIAL_TIME = 40; 
const MAX_TIME = 40; 
const BREAK_DURATION = 4;
const BASE_TIME_REWARD = 1.2; 
const DISRUPTOR_REFRESH_MS = 2500;
const TRUMP_CARD_COOLDOWN = 5; 
const STRUGGLE_THRESHOLD = 3; 

export interface GameStats {
  roundBonus: number;
  perfectBonus: number;
  totalScore: number;
  maxCombo: number;
  accuracy: number;
  mistakes: number;
}

export const useStratagemGame = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "break" | "gameover" | "strike">("idle");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const [inputIndex, setInputIndex] = useState(0);
  const [lastInputCorrect, setLastInputCorrect] = useState<boolean | null>(null);
  
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalInputs, setTotalInputs] = useState(0);
  const [correctInputs, setCorrectInputs] = useState(0);
  
  const [isDisrupted, setIsDisrupted] = useState(false);
  const [disruptedCount, setDisruptedCount] = useState(0);
  const [disruptedLimit, setDisruptedLimit] = useState(0);
  const [showDisruptorDestroyed, setShowDisruptorDestroyed] = useState(false);
  const [activeSequence, setActiveSequence] = useState<Direction[]>([]);
  
  const [missionQueue, setMissionQueue] = useState<Stratagem[]>([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [isTrumpCard, setIsTrumpCard] = useState(false);
  
  const [mistakesInGame, setMistakesInGame] = useState(0);
  const [errorsThisStratagem, setErrorsThisStratagem] = useState(0);

  const [stats, setStats] = useState<GameStats>({
    roundBonus: 0,
    perfectBonus: 0,
    totalScore: 0,
    maxCombo: 0,
    accuracy: 0,
    mistakes: 0
  });
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const breakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disruptorIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stratagemStartTimeRef = useRef<number>(0);
  const lastDisruptedRoundRef = useRef<number>(0);
  const lastTrumpCardRoundRef = useRef<number>(-10);

  const handleInputRef = useRef<(dir: Direction) => void>(() => {});

  const getRandomDirection = (): Direction => {
    const dirs: Direction[] = ["U", "D", "L", "R"];
    return dirs[Math.floor(Math.random() * dirs.length)];
  };

  const generateRandomSequence = (length: number): Direction[] => {
    return Array.from({ length }, () => getRandomDirection());
  };

  const getRoundSize = (lvl: number) => {
    return 3 + lvl;
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
    audioManager.startBgm();
    
    const firstRoundSize = getRoundSize(1);
    const firstRound = generateRound(firstRoundSize);
    
    setScore(0);
    setLevel(1);
    setTimeLeft(INITIAL_TIME);
    setMissionQueue(firstRound);
    setCurrentQueueIndex(0);
    setInputIndex(0);
    setMistakesInGame(0);
    setErrorsThisStratagem(0);
    setCombo(0);
    setMaxCombo(0);
    setTotalInputs(0);
    setCorrectInputs(0);
    setIsTrumpCard(false);
    setIsDisrupted(false);
    setShowDisruptorDestroyed(false);
    lastDisruptedRoundRef.current = 1;
    lastTrumpCardRoundRef.current = -10;
    stratagemStartTimeRef.current = Date.now();
    setActiveSequence(firstRound[0].sequence);
    setGameState("playing");
  };

  const abortGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (breakTimerRef.current) clearInterval(breakTimerRef.current);
    if (disruptorIntervalRef.current) clearInterval(disruptorIntervalRef.current);
    audioManager.stopBgm();
    setGameState("idle");
  };

  const calculateFinalStats = useCallback(() => {
    const rBonus = level * 50;
    const pBonus = mistakesInGame === 0 ? 500 : 0;
    const accuracy = totalInputs > 0 ? Math.round((correctInputs / totalInputs) * 100) : 0;
    
    setStats({
      roundBonus: rBonus,
      perfectBonus: pBonus,
      totalScore: score + rBonus + pBonus,
      maxCombo: maxCombo,
      accuracy: accuracy,
      mistakes: mistakesInGame
    });
  }, [level, mistakesInGame, score, maxCombo, totalInputs, correctInputs]);

  const startNextLevel = useCallback(() => {
    const nextLvl = level + 1;
    const nextRoundSize = getRoundSize(nextLvl);
    const nextRound = generateRound(nextRoundSize);
    
    const roundsSinceLast = nextLvl - lastDisruptedRoundRef.current;
    const canDisrupt = nextLvl >= 6 && roundsSinceLast >= 5; 
    const shouldDisrupt = canDisrupt && Math.random() < 0.2;

    if (shouldDisrupt) {
      audioManager.playError();
      setIsDisrupted(true);
      lastDisruptedRoundRef.current = nextLvl;
      const limit = Math.floor(Math.random() * 3) + 2;
      setDisruptedLimit(limit);
      setDisruptedCount(0);
      setIsTrumpCard(false);
      const firstFake = generateRandomSequence(nextRound[0].sequence.length);
      setActiveSequence(firstFake);
    } else {
      setIsDisrupted(false);
      setDisruptedLimit(0);
      setDisruptedCount(0);
      setIsTrumpCard(false);
      setActiveSequence(nextRound[0].sequence);
    }

    setShowDisruptorDestroyed(false);
    setLevel(nextLvl);
    setMissionQueue(nextRound);
    setCurrentQueueIndex(0);
    setInputIndex(0);
    setErrorsThisStratagem(0);
    // Reset timer to full for the new level
    setTimeLeft(MAX_TIME);
    stratagemStartTimeRef.current = Date.now();
    setGameState("playing");
  }, [level]);

  useEffect(() => {
    if (gameState === "playing" && isDisrupted && !isTrumpCard) {
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
  }, [gameState, isDisrupted, isTrumpCard, currentQueueIndex, missionQueue]);

  const handleInput = useCallback((direction: Direction) => {
    if (gameState !== "playing" || missionQueue.length === 0) return;

    setTotalInputs(prev => prev + 1);

    if (activeSequence[inputIndex] === direction) {
      setCorrectInputs(prev => prev + 1);
      setLastInputCorrect(true);
      const nextInputIdx = inputIndex + 1;
      
      if (nextInputIdx === activeSequence.length) {
        audioManager.playCorrect();
        
        if (isTrumpCard) {
          audioManager.playEagleStrike();
          setScore(prev => prev + 1000);
          setGameState("strike");
          return;
        }

        const timeTaken = Date.now() - stratagemStartTimeRef.current;
        const complexityBonus = activeSequence.length * 12;
        const speedBonus = Math.max(0, Math.floor((2500 - timeTaken) / 50));
        const errorPenalty = errorsThisStratagem * 15;
        
        const currentCombo = errorsThisStratagem === 0 ? combo + 1 : 0;
        setCombo(currentCombo);
        if (currentCombo > maxCombo) setMaxCombo(currentCombo);
        
        const multiplier = 1 + (currentCombo * 0.1);
        const points = Math.max(5, Math.floor((complexityBonus + speedBonus - errorPenalty) * multiplier));
        setScore(prev => prev + points);
        
        // Time reward decreases slightly as level increases
        const levelPenalty = Math.max(0, (level - 1) * 0.05);
        const timeReward = Math.max(0.4, BASE_TIME_REWARD - levelPenalty);
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
            setTimeLeft(prev => Math.min(prev + 2.0, MAX_TIME)); 
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
          
          setIsTrumpCard(false);
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
      setCombo(0);
      
      const newErrors = errorsThisStratagem + 1;
      setErrorsThisStratagem(newErrors);
      setMistakesInGame(prev => prev + 1);

      if (
        isDisrupted && 
        !isTrumpCard && 
        newErrors >= STRUGGLE_THRESHOLD &&
        level > lastTrumpCardRoundRef.current + TRUMP_CARD_COOLDOWN &&
        Math.random() < 0.4
      ) {
        setIsTrumpCard(true);
        lastTrumpCardRoundRef.current = level;
        
        const eagle500kg = STRATAGEMS.find(s => s.name === "Eagle 500kg Bomb") || missionQueue[currentQueueIndex];
        missionQueue[currentQueueIndex] = eagle500kg;
        setActiveSequence(eagle500kg.sequence);
        setInputIndex(0);
        
        if (disruptorIntervalRef.current) clearInterval(disruptorIntervalRef.current);
      }
    }

    setTimeout(() => setLastInputCorrect(null), 100);
  }, [gameState, missionQueue, currentQueueIndex, inputIndex, errorsThisStratagem, activeSequence, isDisrupted, isTrumpCard, disruptedCount, disruptedLimit, combo, maxCombo, level]);

  useEffect(() => {
    handleInputRef.current = handleInput;
  }, [handleInput]);

  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            audioManager.playFailure();
            audioManager.stopBgm();
            calculateFinalStats();
            setGameState("gameover");
            return 0;
          }
          // Ramping up the drain rate more significantly per level
          const drainRate = 0.12 + (level * 0.025);
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
  }, [gameState, level, startNextLevel, calculateFinalStats]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") handleInputRef.current("U");
      if (e.key === "ArrowDown" || e.key === "s") handleInputRef.current("D");
      if (e.key === "ArrowLeft" || e.key === "a") handleInputRef.current("L");
      if (e.key === "ArrowRight" || e.key === "d") handleInputRef.current("R");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameState === "idle") {
      audioManager.playReady();
    }
  }, [gameState]);

  return {
    gameState,
    setGameState,
    score,
    level,
    timeLeft,
    maxTime: MAX_TIME,
    breakTimeLeft,
    setBreakTimeLeft,
    missionQueue,
    currentQueueIndex,
    inputIndex,
    lastInputCorrect,
    isDisrupted,
    isTrumpCard,
    showDisruptorDestroyed,
    activeSequence,
    stats,
    combo,
    startGame,
    abortGame,
    handleInput
  };
};