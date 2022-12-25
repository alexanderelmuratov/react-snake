import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSound from 'use-sound';
import snakeSound from './sounds/snake-sound.wav';
import { useInterval } from './useInterval';
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from './constants';
import { MobileButtons } from 'MobileButtons';
import grass from './images/grass.jpg';

const App = () => {
  const canvasRef = useRef();

  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);

  const [play] = useSound(snakeSound);

  useInterval(() => gameLoop(), speed);

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    setScore(0);
  };

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    toast.error(`GAME OVER! YOU'VE GOT ${score} POINT(S)!`);
  };

  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

  const createApple = () =>
    apple.map((_, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    // snake collides with the wall
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;
    // snake collides with itself
    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }

    return false;
  };

  const checkAppleCollision = newSnake => {
    // snake collides with apple
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      // check if new apple doesn't appear inside the snake
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      play();
      setApple(newApple);
      setScore(score => score + 1);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);

    context.fillStyle = 'green';
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));

    context.fillStyle = 'red';
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  return (
    <StyledWrapper role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>
      <StyledCanvas
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      <StyledStartButton onClick={startGame}>
        {gameOver ? 'Start Game' : `Score: ${score}`}
      </StyledStartButton>
      <MobileButtons move={moveSnake} />
      <ToastContainer position="top-center" autoClose={5000} theme="colored" />
    </StyledWrapper>
  );
};

export default App;

// ========== STYLES ==========
const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${grass}) #000;
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const StyledCanvas = styled.canvas`
  display: block;
  margin-top: 5px;
  margin-right: auto;
  margin-left: auto;
  border: none;
  background-color: wheat;
  box-shadow: 1px 1px 4px #555;
`;

const StyledStartButton = styled.button`
  display: flex;
  justify-content: center;
  width: 200px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  font-size: 24px;
  text-transform: uppercase;
  color: black;
  background-color: deepskyblue;
  border-radius: 100px;
  outline: none;
  border: 0px;
  box-shadow: 1px 1px 4px #555;
  cursor: pointer;
`;
