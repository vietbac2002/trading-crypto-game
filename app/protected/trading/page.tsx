"use client"

import { useState } from "react"
import { useGame } from "@/contexts/GameContext"
import { MarketList } from "@/components/market-list"
import { TradingChart } from "@/components/trading-chart"
import { OrderForm } from "@/components/order-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Wallet, RefreshCcw } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Dashboard() {
  const { gameState, resetGame } = useGame()
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>("bitcoin")

  const totalPortfolioValue = Object.entries(gameState.player.portfolio).reduce((acc, [coinId, amount]: [string, number]) => {
    const coin = gameState.coins.find((c) => c.id === coinId)
    return acc + amount  * (coin?.price || 0)
  }, 0)

  const totalNetWorth = gameState.player.balance + totalPortfolioValue
  const profit = totalNetWorth - gameState.player.initialBalance
  const isProfit = profit >= 0

  if (gameState.status === "finished") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-6 p-4 text-center">
        <h1 className="text-5xl font-black text-white">SESSION CLOSED</h1>
        <Card className="w-full max-w-md border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle>Performance Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-mono font-bold text-white">
              ${totalNetWorth.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <div className={`text-xl font-mono ${isProfit ? "text-green-400" : "text-red-400"}`}>
              {isProfit ? "+" : ""}
              {profit.toLocaleString(undefined, { maximumFractionDigits: 2 })} (
              {((profit / gameState.player.initialBalance) * 100).toFixed(2)}%)
            </div>
            <Button onClick={resetGame} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold">
              <RefreshCcw className="mr-2 h-4 w-4" /> REBOOT SYSTEM
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col gap-4 p-2 max-w-[1600px] mx-auto">
      {/* Top Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-24 shrink-0">
        <Card className="bg-slate-900/50 border-slate-800 flex items-center p-4">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-500/10 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase">Net Worth</div>
              <div className="text-2xl font-mono font-bold text-white">
                ${totalNetWorth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 flex items-center p-4">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/10 p-3 rounded-full">
              <Clock className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase">Time Remaining</div>
              <div
                className={`text-2xl font-mono font-bold ${gameState.timeLeft < 60 ? "text-red-400 animate-pulse" : "text-white"}`}
              >
                {Math.floor(gameState.timeLeft / 60)}:{(gameState.timeLeft % 60).toString().padStart(2, "0")}
              </div>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2 bg-slate-900/50 border-slate-800 p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/50" />
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-1" />
            <div className="space-y-1 w-full">
              <div className="text-xs text-yellow-400 uppercase font-bold">News Feed</div>
              <ScrollArea className="h-[3.5rem]">
                {gameState.events.length > 0 ? (
                  gameState.events.map((event) => (
                    <div key={event.id} className="text-sm mb-2 border-b border-slate-800/50 pb-1 last:border-0">
                      <span
                        className={
                          event.impact === "positive"
                            ? "text-green-400"
                            : event.impact === "negative"
                              ? "text-red-400"
                              : "text-slate-300"
                        }
                      >
                        [{event.title}]
                      </span>
                      <span className="text-slate-500 ml-2">{event.description}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-600 text-sm italic">Scanning for market events...</div>
                )}
              </ScrollArea>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Left: Market List */}
      

        {/* Center: Chart */}
        <div className="md:col-span-9 h-full min-h-[300px]">
          <TradingChart selectedCoinId={selectedCoinId} />
        </div>

        {/* Right: Trade Panel & Portfolio Summary */}
        <div className="md:col-span-3 flex flex-col gap-4 h-full min-h-[300px]">
          <div className="flex-1">
            <OrderForm selectedCoinId={selectedCoinId} />
          </div>

         
        </div>
      </div>
    </div>
  )
}
