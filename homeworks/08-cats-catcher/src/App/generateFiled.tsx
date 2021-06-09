import { useState, useEffect, useCallback } from "react";
import random from "lodash/random";

import { WINDOW_SIZE } from "./constants";

const generateGameField = (): boolean[][] =>
  Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => true));

const getPositions = (field: boolean[][]): number[] => {
  const x = random(0, 9);
  const y = random(0, 9);

  const isCellFree = field[x][y];

  if (isCellFree) {
    field[x][y] = false;
    return [x * WINDOW_SIZE, y * WINDOW_SIZE];
  }

  return getPositions(field);
};

const generatePositions = () => {
  const gameField = generateGameField();

  return Array.from({ length: 12 }).map(() => getPositions(gameField));
};

export const useGenerateWindowsPositions = () => {
  const [positions, setPositions] = useState<null | number[][]>(null);

  const handleGeneratePositions = useCallback(() => {
    const newPositions = generatePositions();
    setPositions(newPositions);
  }, []);

  useEffect(() => {
    handleGeneratePositions();
  }, [handleGeneratePositions]);

  return { positions, onReset: handleGeneratePositions };
};
