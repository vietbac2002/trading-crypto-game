"use client"

import { useState } from "react"
import { useGame } from "@/contexts/GameContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OrderFormProps {
    selectedCoinId: string | null
}

export function OrderForm({ selectedCoinId }: OrderFormProps) {
    const { gameState, buyCoin, sellCoin } = useGame()
    const [amount, setAmount] = useState("")
    const [percentage, setPercentage] = useState(0)

    const coin = gameState.coins.find((c) => c.id === selectedCoinId)
    const player = gameState.player

    if (!coin) return null

    const holdings = player.portfolio[coin.id] || 0
    const holdingsValue = holdings * coin.price

    const handlePercentage = (value: number[], mode: "buy" | "sell") => {
        setPercentage(value[0])
        if (mode === "buy") {
            const maxBuy = player.balance * (value[0] / 100)
            setAmount(maxBuy.toFixed(2))
        } else {
            const maxSell = holdings * (value[0] / 100)
            setAmount(maxSell.toString()) // Keeping precision for small coins
        }
    }

    const handleBuy = () => {
        const val = Number.parseFloat(amount)
        if (isNaN(val) || val <= 0) return
        buyCoin(coin.id, val)
        setAmount("")
        setPercentage(0)
    }

    const handleSell = () => {
        const val = Number.parseFloat(amount)
        if (isNaN(val) || val <= 0) return
        sellCoin(coin.id, val)
        setAmount("")
        setPercentage(0)
    }

    return (
        <Card className="h-full border-slate-800 bg-slate-900/50">
            <CardHeader>
                <CardTitle className="text-sm uppercase tracking-widest text-slate-500">Order Terminal</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-950">
                        <TabsTrigger value="buy" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
                            BUY
                        </TabsTrigger>
                        <TabsTrigger value="sell" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                            SELL
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="buy" className="space-y-4 mt-4">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Available</span>
                            <span className="text-white font-mono">${player.balance.toLocaleString()}</span>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-slate-500">Amount (USD)</label>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="bg-slate-950 border-slate-800 font-mono"
                                placeholder="0.00"
                            />
                        </div>

                       

                        <Button onClick={handleBuy} className="w-full bg-green-500 hover:bg-green-400 text-black font-bold">
                            BUY {coin.symbol}
                        </Button>
                    </TabsContent>

                    <TabsContent value="sell" className="space-y-4 mt-4">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Holdings</span>
                            <span className="text-white font-mono">
                                {holdings < 0.001 ? holdings.toFixed(6) : holdings.toFixed(4)} {coin.symbol}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-slate-500">Amount ({coin.symbol})</label>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="bg-slate-950 border-slate-800 font-mono"
                                placeholder="0.00"
                            />
                        </div>

                       

                        <Button onClick={handleSell} variant="destructive" className="w-full font-bold">
                            SELL {coin.symbol}
                        </Button>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
