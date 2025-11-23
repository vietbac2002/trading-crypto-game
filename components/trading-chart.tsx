"use client"
import { useState } from "react"
import dynamic from "next/dynamic";
const AdvancedRealTimeChart = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
    {
        ssr: false,
    }
);

interface TradingChartProps {
    selectedCoinId: string | null
}

export function TradingChart({ selectedCoinId }: TradingChartProps) {
    const [currentSymbol, setCurrentSymbol] = useState("BINANCE:BTCUSDT")
    console.log("Selected Coin ID:", currentSymbol);
    return (
        <AdvancedRealTimeChart symbol={currentSymbol}
            theme="dark" autosize allow_symbol_change={true}
            hotlist={true}
            
            details={true} />
    )
}
