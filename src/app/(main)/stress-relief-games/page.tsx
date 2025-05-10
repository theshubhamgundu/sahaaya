import { TicTacToeGame } from '@/components/sahaaya/games/TicTacToeGame';
import { PunchingBagGame } from '@/components/sahaaya/games/PunchingBagGame';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Smile, Zap } from 'lucide-react';

export default function StressReliefGamesPage() {
  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-foreground tracking-tight">Relax and Recharge</h2>
        <p className="text-lg text-muted-foreground mt-1">Take a moment for yourself with these simple games.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border-border">
          <CardHeader>
            <div className="flex items-center">
              <Smile className="h-7 w-7 mr-2 text-primary" />
              <CardTitle className="text-2xl">Tic-Tac-Toe</CardTitle>
            </div>
            <CardDescription className="text-base">
              A classic game to unwind. Try to get three in a row!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TicTacToeGame />
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border-border">
          <CardHeader>
             <div className="flex items-center">
              <Zap className="h-7 w-7 mr-2 text-primary" />
              <CardTitle className="text-2xl">Punching Bag</CardTitle>
            </div>
            <CardDescription className="text-base">
              Release some tension. Click or tap the bag!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PunchingBagGame />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}