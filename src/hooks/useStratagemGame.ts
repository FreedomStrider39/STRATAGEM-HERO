import { useState, useEffect, useCallback, useRef } from "react";
import { STRATAGEMS, Direction, Stratagem } from "@/data/stratagems";

const INITIAL_TIME = 10;
const TIME_BONUS_PER_STRATAGEM = 1.5;

export const useStratagemGame = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [currentStratagem, setCurrentStratagem] = useState<Stratagem | null>(null);
  const [inputIndex, setInputIndex] = useState(0);
  const [lastInputCorrect, setLastInputCorrect] = useState<boolean | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const pickRandomStratagem = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * STRATAGEMS.length);
    setCurrentStratagem(STRATAGEMS[randomIndex]);
    setInputIndex(0);
  }, []);

  const startGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(INITIAL_TIME);
    setGameState("playing");
    pickRandomStratagem();
  };

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
        
        // Level up logic (every 5 stratagems)
        if ((score + points) % 500 === 0) {
          setLevel(prev => prev + 1);
        }
        
        pickRandomStratagem();
      } else {
        setInputIndex(nextIndex);
      }
    } else {
      setLastInputCorrect(false);
      setInputIndex(0); // Reset on mistake
    }

    // Reset feedback after a short delay
    setTimeout(() => setLastInputCorrect(null), 100);
  }, [gameState, currentStratagem, inputIndex, pickRandomStratagem, score]);

  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            setGameState("gameover");
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

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
    currentStratagem,
    inputIndex,
    lastInputCorrect,
    startGame,
    handleInput
  };
};