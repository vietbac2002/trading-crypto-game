"use client"

import { useGame } from "@/contexts/GameContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarketListProps {
  selectedCoinId: string | null
  onSelectCoin: (id: string) => void
}

export function MarketList({ selectedCoinId, onSelectCoin }: MarketListProps) {
  const { gameState } = useGame()

  return (
    <Card className="h-full flex flex-col border-slate-800 bg-slate-900/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <DollarSign className="h-4 w-4" /> Market
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto space-y-2 pr-2">
        {gameState.coins.map((coin) => {
          const isSelected = selectedCoinId === coin.id
          const isUp = coin.trend === "up"

          return (
            <button
              key={coin.id}
              onClick={() => onSelectCoin(coin.id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg border transition-all hover:bg-slate-800",
                isSelected
                  ? "bg-slate-800 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                  : "bg-slate-950/50 border-slate-800",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                    isSelected ? "bg-cyan-500 text-black" : "bg-slate-800 text-slate-400",
                  )}
                >
                  {coin.symbol[0]}
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">{coin.name}</div>
                  <div className="text-xs text-slate-500">{coin.symbol}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-sm">
                  $
                  {coin.price < 1
                    ? coin.price.toFixed(6)
                    : coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <div
                  className={cn(
                    "text-xs flex items-center justify-end gap-1",
                    isUp ? "text-green-400" : "text-red-400",
                  )}
                >
                  {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {isUp ? "+" : ""}
                  {(coin.volatility * 100).toFixed(2)}%
                </div>
              </div>
            </button>
          )
        })}
      </CardContent>
    </Card>
  )
}
