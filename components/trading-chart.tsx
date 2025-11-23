"use client"

import { useGame } from "@/contexts/GameContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { useState } from "react"

interface TradingChartProps {
    selectedCoinId: string | null
}

export function TradingChart({ selectedCoinId }: TradingChartProps) {
    const [symbol, setSymbol] = useState("NASDAQ:AAPL");

    return (
        <AdvancedRealTimeChart theme="dark" autosize></AdvancedRealTimeChart>
    )
}
