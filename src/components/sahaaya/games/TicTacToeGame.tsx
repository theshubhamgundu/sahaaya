"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RefreshCw, Award, Meh, Grip } from 'lucide-react';

type Player = 'X' | 'O';
type SquareValue = Player | null;
type Board = SquareValue[][];

const initialBoard = (): Board => [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const calculateWinner = (board: Board): Player | 'Draw' | null => {
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[0] === line[2]) {
      return line[0];
    }
  }

  if (board.every(row => row.every(cell => cell !== null))) {
    return 'Draw';
  }

  return null;
};

export function TicTacToeGame() {
  const [board, setBoard] = React.useState<Board>(initialBoard());
  const [currentPlayer, setCurrentPlayer] = React.useState<Player>('X');
  const [winner, setWinner] = React.useState<Player | 'Draw' | null>(null);
  const [isAiThinking, setIsAiThinking] = React.useState(false);

  const userPlayer: Player = 'X';
  const aiPlayer: Player = 'O';

  const handleSquareClick = (row: number, col: number) => {
    if (board[row][col] || winner || currentPlayer !== userPlayer || isAiThinking) {
      return;
    }

    const newBoard = board.map((r, rIndex) =>
      r.map((c, cIndex) => (rIndex === row && cIndex === col ? userPlayer : c))
    );
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(aiPlayer);
      setIsAiThinking(true);
      // AI makes a move after a short delay
      setTimeout(() => {
        makeAiMove(newBoard);
        setIsAiThinking(false);
      }, 500);
    }
  };

  const makeAiMove = (currentBoard: Board) => {
    const availableMoves: { row: number; col: number }[] = [];
    currentBoard.forEach((row, rIndex) => {
      row.forEach((cell, cIndex) => {
        if (!cell) {
          availableMoves.push({ row: rIndex, col: cIndex });
        }
      });
    });

    if (availableMoves.length > 0) {
      // AI makes a random move to make it easy for the user
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const newBoardAfterAi = currentBoard.map((r, rIndex) =>
        r.map((c, cIndex) =>
          rIndex === randomMove.row && cIndex === randomMove.col ? aiPlayer : c
        )
      );
      setBoard(newBoardAfterAi);
      const gameWinner = calculateWinner(newBoardAfterAi);
      if (gameWinner) {
        setWinner(gameWinner);
      } else {
        setCurrentPlayer(userPlayer);
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setCurrentPlayer(userPlayer);
    setWinner(null);
    setIsAiThinking(false);
  };

  const getStatusMessage = () => {
    if (winner) {
      if (winner === userPlayer) return { text: "You win! Great job!", Icon: Award, color: 'text-green-500' };
      if (winner === aiPlayer) return { text: "AI wins! Try again!", Icon: Meh, color: 'text-red-500' }; // Should be rare
      return { text: "It's a draw!", Icon: Grip, color: 'text-foreground/80' };
    }
    if (isAiThinking) return { text: "AI is thinking...", Icon: Grip, color: 'text-foreground/80' };
    return { text: `Your turn (${userPlayer})`, Icon: Grip, color: 'text-foreground/80' };
  };

  const { text: statusText, Icon: StatusIcon, color: statusColor } = getStatusMessage();

  return (
    <div className="flex flex-col items-center space-y-4 p-4 rounded-lg bg-card">
      <div className={cn("flex items-center text-xl font-semibold mb-2", statusColor)}>
        <StatusIcon className="mr-2 h-6 w-6" />
        {statusText}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((row, rIndex) =>
          row.map((cell, cIndex) => (
            <Button
              key={`${rIndex}-${cIndex}`}
              variant="outline"
              className={cn(
                "w-20 h-20 md:w-24 md:h-24 text-4xl font-bold flex items-center justify-center border-2 rounded-md transition-all duration-150",
                "hover:bg-accent/50 focus:ring-2 focus:ring-primary",
                cell === 'X' ? 'text-blue-500' : cell === 'O' ? 'text-pink-500' : 'text-foreground',
                (winner && board[rIndex][cIndex] && (
                    (winner === 'X' && board[rIndex][cIndex] === 'X') || 
                    (winner === 'O' && board[rIndex][cIndex] === 'O')
                )) ? 'bg-primary/20' : ''
              )}
              onClick={() => handleSquareClick(rIndex, cIndex)}
              disabled={!!cell || !!winner || isAiThinking}
              aria-label={`Square ${rIndex}-${cIndex}, Value: ${cell || 'Empty'}`}
            >
              {cell}
            </Button>
          ))
        )}
      </div>
      <Button onClick={resetGame} variant="default" className="mt-4 text-base px-6 py-2.5">
        <RefreshCw className="mr-2 h-5 w-5" />
        New Game
      </Button>
    </div>
  );
}