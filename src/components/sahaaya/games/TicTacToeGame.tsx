// @ts-nocheck
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

const checkLine = (a: SquareValue, b: SquareValue, c: SquareValue): Player | null => {
  if (a && a === b && a === c) {
    return a;
  }
  return null;
};

const calculateWinnerAndLine = (board: Board): { winner: Player | 'Draw' | null, line: number[][] | null } => {
  const linesMeta = [
    // Rows
    [{r:0,c:0}, {r:0,c:1}, {r:0,c:2}],
    [{r:1,c:0}, {r:1,c:1}, {r:1,c:2}],
    [{r:2,c:0}, {r:2,c:1}, {r:2,c:2}],
    // Columns
    [{r:0,c:0}, {r:1,c:0}, {r:2,c:0}],
    [{r:0,c:1}, {r:1,c:1}, {r:2,c:1}],
    [{r:0,c:2}, {r:1,c:2}, {r:2,c:2}],
    // Diagonals
    [{r:0,c:0}, {r:1,c:1}, {r:2,c:2}],
    [{r:0,c:2}, {r:1,c:1}, {r:2,c:0}],
  ];

  for (const lineCoords of linesMeta) {
    const [a, b, c] = lineCoords;
    const lineWinner = checkLine(board[a.r][a.c], board[b.r][b.c], board[c.r][c.c]);
    if (lineWinner) {
      return { winner: lineWinner, line: lineCoords.map(coord => [coord.r, coord.c]) };
    }
  }

  if (board.every(row => row.every(cell => cell !== null))) {
    return { winner: 'Draw', line: null };
  }

  return { winner: null, line: null };
};


export function TicTacToeGame() {
  const [board, setBoard] = React.useState<Board>(initialBoard());
  const [currentPlayer, setCurrentPlayer] = React.useState<Player>('X');
  const [winnerInfo, setWinnerInfo] = React.useState<{ winner: Player | 'Draw' | null, line: number[][] | null }>({ winner: null, line: null });
  const [isAiThinking, setIsAiThinking] = React.useState(false);

  const userPlayer: Player = 'X';
  const aiPlayer: Player = 'O';

  const handleSquareClick = (row: number, col: number) => {
    if (board[row][col] || winnerInfo.winner || currentPlayer !== userPlayer || isAiThinking) {
      return;
    }

    const newBoard = board.map((r, rIndex) =>
      r.map((c, cIndex) => (rIndex === row && cIndex === col ? userPlayer : c))
    );
    setBoard(newBoard);

    const gameResult = calculateWinnerAndLine(newBoard);
    if (gameResult.winner) {
      setWinnerInfo(gameResult);
    } else {
      setCurrentPlayer(aiPlayer);
      setIsAiThinking(true);
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
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const newBoardAfterAi = currentBoard.map((r, rIndex) =>
        r.map((c, cIndex) =>
          rIndex === randomMove.row && cIndex === randomMove.col ? aiPlayer : c
        )
      );
      setBoard(newBoardAfterAi);
      const gameResult = calculateWinnerAndLine(newBoardAfterAi);
      if (gameResult.winner) {
        setWinnerInfo(gameResult);
      } else {
        setCurrentPlayer(userPlayer);
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard());
    setCurrentPlayer(userPlayer);
    setWinnerInfo({ winner: null, line: null });
    setIsAiThinking(false);
  };

  const getStatusMessage = () => {
    if (winnerInfo.winner) {
      if (winnerInfo.winner === userPlayer) return { text: "You win! Great job!", Icon: Award, color: 'text-green-500' };
      if (winnerInfo.winner === aiPlayer) return { text: "AI wins! Try again!", Icon: Meh, color: 'text-destructive' }; // AI wins use destructive color
      return { text: "It's a draw!", Icon: Grip, color: 'text-foreground/80' };
    }
    if (isAiThinking) return { text: "AI is thinking...", Icon: Grip, color: 'text-foreground/80' };
    return { text: `Your turn (${userPlayer})`, Icon: Grip, color: 'text-foreground/80' };
  };

  const { text: statusText, Icon: StatusIcon, color: statusColor } = getStatusMessage();

  const isWinningCell = (r: number, c: number) => {
    if (!winnerInfo.line) return false;
    return winnerInfo.line.some(coord => coord[0] === r && coord[1] === c);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 rounded-lg bg-card">
      <div className={cn("flex items-center text-xl font-semibold mb-2", statusColor)}>
        <StatusIcon className="mr-2 h-6 w-6" />
        {statusText}
      </div>
      <div className="p-2 rounded-xl border-2 animate-border-pulse">
        <div className="grid grid-cols-3 gap-1.5 md:gap-2">
          {board.map((row, rIndex) =>
            row.map((cell, cIndex) => (
              <Button
                key={`${rIndex}-${cIndex}`}
                variant="outline" // Uses border-input by default
                className={cn(
                  "w-20 h-20 md:w-24 md:h-24 text-4xl font-bold flex items-center justify-center rounded-md transition-all duration-150",
                  // Cell content colors
                  cell === 'X' ? 'text-primary' : cell === 'O' ? 'text-destructive' : 'text-foreground',
                  // Winning cells highlighting
                  winnerInfo.winner && isWinningCell(rIndex, cIndex)
                    ? 'bg-primary/20 !border-primary ring-2 ring-primary scale-105 shadow-lg'
                    : '',
                  // Dim non-relevant cells when game is over
                  winnerInfo.winner && !isWinningCell(rIndex, cIndex) && cell !== null ? 'opacity-50' : '',
                  winnerInfo.winner && !isWinningCell(rIndex, cIndex) && cell === null ? 'opacity-30' : '',
                  // Hover and focus
                  !winnerInfo.winner && "hover:bg-accent/20 focus:bg-accent/20",
                  // Default border, variant="outline" already applies one. We can override if needed or ensure it's consistent.
                  "border-input" // Ensuring border-input is explicitly mentioned if variant default is changed
                )}
                onClick={() => handleSquareClick(rIndex, cIndex)}
                disabled={!!cell || !!winnerInfo.winner || isAiThinking}
                aria-label={`Square ${rIndex}-${cIndex}, Value: ${cell || 'Empty'}`}
              >
                {cell}
              </Button>
            ))
          )}
        </div>
      </div>
      <Button onClick={resetGame} variant="default" className="mt-4 text-base px-6 py-2.5">
        <RefreshCw className="mr-2 h-5 w-5" />
        New Game
      </Button>
    </div>
  );
}
