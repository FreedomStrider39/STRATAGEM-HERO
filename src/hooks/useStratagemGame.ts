import { useState, useEffect, useCallback, useRef } from "react";
import { STRATAGEMS, Direction, Stratagem } from "@/data/stratagems";

const INITIAL_TIME = 10;
const TIME_BONUS_PER_STRATAGEM = 1.5;
const STRATAGEMS_PER_LEVEL = 5;
const BREAK_DURATION = 10;

export const useStratagemGame = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "break" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const [currentStratagem, setCurrentStratagem] = useState<Stratagem | null>(null);
  const [inputIndex, setInputIndex] = useState(0);
  const [lastInputCorrect, setLastInputCorrect] = useState<boolean | null>(null);
  const [completedInLevel, setCompletedInLevel] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const breakTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pickRandomStratagem = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * STRATAGEMS.length);
    setCurrentStratagem(STRATAGEMS[randomIndex]);
    setInputIndex(0);
  }, []);

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(INITIAL_TIME);
    setCompletedInLevel(0);
    setGameState("playing");
    pickRandomStratagem();
  };

  const startNextLevel = useCallback(() => {
    setLevel(prev => prev + 1);
    setCompletedInLevel(0);
    setTimeLeft(INITIAL_TIME);
    setGameState("playing");
    pickRandomStratagem();
  }, [pickRandomStratagem]);

  const handleInput = useCallback((direction: Direction) => {
    if (gameState !== "playing" || !currentStratagem) return;

    if (currentStratagem.sequence[inputIndex] === direction) {
      setLastInputCorrect(true);
      const nextIndex = inputIndex + 1;
      
      if (nextIndex === currentStratagem.sequence.length) {
        // Stratagem completed
        const points = currentStratagem.sequence.length * 100;
        setScore(prev => prev + points);
        setTimeLeft(prev => Math.min(prev + TIME_BONUS_PER_STRATAGEM, 15));
        
        const nextCompleted = completedInLevel + 1;
        if (nextCompleted >= STRATAGEMS_PER_LEVEL) {
          setGameState("break");
          setBreakTimeLeft(BREAK_DURATION);
          setCurrentStratagem(null);
        } else {
          setCompletedInLevel(nextCompleted);
          pickRandomStratagem();
        }
      } else {
        setInputIndex(nextIndex);
      }
    } else {
      setLastInputCorrect(false);
      setInputIndex(0); // Reset on mistake
    }

    // Reset feedback after a short delay
    setTimeout(() => setLastInputCorrect(null), 100);
  }, [gameState, currentStratagem, inputIndex, pickRandomStratagem, completedInLevel]);

  // Game Timer
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            setGameState("gameover");
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState]);

  // Break Timer
  useEffect(() => {
    if (gameState === "break") {
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
      if (breakTimerRef.current) clearInterval(breakTimerRef.current);
    }
    return () => { if (breakTimerRef.current) clearInterval(breakTimerRef.current); };
  }, [gameState, startNextLevel]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": handleInput("U"); break;
        case "ArrowDown": handleInput("D"); break;
        case "ArrowLeft": handleInput("L"); break;
        case "ArrowRight": handleInput("R"); break;
        case "w": handleInput("U"); break;
        case "s": handleInput("D"); break;
        case "a": handleInput("L"); break;
        case "d": handleInput("R"); break;
      }
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
    currentStratagem,
    inputIndex,
    lastInputCorrect,
    completedInLevel,
    totalInLevel: STRATAGEMS_PER_LEVEL,
    startGame,
    handleInput
  };
};