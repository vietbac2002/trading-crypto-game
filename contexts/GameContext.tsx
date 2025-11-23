"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useRef } from "react"
import type { Coin, GameState, GameEvent, Player } from "@/lib/types"

const INITIAL_BALANCE = 10000
const ROUND_DURATION = 300 // 5 minutes

const INITIAL_COINS: Coin[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 45000,
    priceHistory: [45000],
    trend: "neutral",
    volatility: 0.005,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3000,
    priceHistory: [3000],
    trend: "neutral",
    volatility: 0.008,
  },
  { id: "solana", symbol: "SOL", name: "Solana", price: 100, priceHistory: [100], trend: "neutral", volatility: 0.015 },
  { id: "doge", symbol: "DOGE", name: "Dogecoin", price: 0.1, priceHistory: [0.1], trend: "neutral", volatility: 0.03 },
  {
    id: "pepe",
    symbol: "PEPE",
    name: "Pepe",
    price: 0.000001,
    priceHistory: [0.000001],
    trend: "neutral",
    volatility: 0.05,
  },
]

const MOCK_EVENTS = [
  { title: "Regulation Rumors", description: "Gov talks about crypto bans.", impact: "negative" },
  { title: "Tech Breakthrough", description: "New scaling solution found.", impact: "positive" },
  { title: "Whale Movement", description: "Large wallet moves funds.", impact: "neutral" },
  { title: "Exchange Hack", description: "Major exchange security breach.", impact: "negative" },
  { title: "Institutional Buy", description: "Big bank buys crypto.", impact: "positive" },
]

const MOCK_BOT_NAMES = ["CryptoKing", "HodlMaster", "MoonBoy", "DiamondHands", "SatoshiFan", "BearWhale", "AlphaSeeker"]

interface GameContextType {
  gameState: GameState
  enterQueue: (playerName: string) => void
  setMatchDuration: (duration: number) => void
  startGame: () => void
  buyCoin: (coinId: string, amount: number) => void
  sellCoin: (coinId: string, amount: number) => void
  resetGame: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    status: "lobby",
    timeLeft: ROUND_DURATION,
    roundDuration: ROUND_DURATION,
    coins: INITIAL_COINS,
    player: {
      id: "1",
      name: "Trader",
      balance: INITIAL_BALANCE,
      portfolio: {},
      initialBalance: INITIAL_BALANCE,
    },
    players: [], // init empty players list
    events: [],
    highscores: [
      { name: "Satoshi", profit: 50000 },
      { name: "Vitalik", profit: 25000 },
      { name: "GoxUser", profit: -10000 },
    ],
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const botJoinerRef = useRef<NodeJS.Timeout | null>(null) // ref for simulated bot joining

  // Game Loop
  useEffect(() => {
    if (gameState.status !== "playing") {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setGameState((prev : any) => {
        // 1. Update Time
        const newTimeLeft = prev.timeLeft - 1
        if (newTimeLeft <= 0) {
          return { ...prev, status: "finished", timeLeft: 0 }
        }

        // 2. Simulate Prices
        const newCoins = prev.coins.map((coin: Coin) => {
          const changePercent = (Math.random() - 0.5) * coin.volatility * 2
          const newPrice = Math.max(0.00000001, coin.price * (1 + changePercent))
          const newHistory = [...coin.priceHistory, newPrice].slice(-50) // Keep last 50 points
          return {
            ...coin,
            price: newPrice,
            priceHistory: newHistory,
            trend: newPrice > coin.price ? "up" : newPrice < coin.price ? "down" : "neutral",
          }
        })

        // 3. Random Events (5% chance every second)
        let newEvents = [...prev.events]
        if (Math.random() < 0.02) {
          const randomEventTemplate = MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)]
          const affectedCoin = newCoins[Math.floor(Math.random() * newCoins.length)]

          // Apply event impact to price
          if (randomEventTemplate.impact === "positive") affectedCoin.price *= 1.1
          if (randomEventTemplate.impact === "negative") affectedCoin.price *= 0.9

          const newEvent: GameEvent = {
            id: Date.now().toString(),
            title: randomEventTemplate.title,
            description: `${randomEventTemplate.description} (${affectedCoin.symbol})`,
            impact: randomEventTemplate.impact as any,
            coinId: affectedCoin.id,
            timestamp: Date.now(),
          }
          newEvents = [newEvent, ...newEvents].slice(0, 5) // Keep last 5 events
        }

        return { ...prev, timeLeft: newTimeLeft, coins: newCoins, events: newEvents }
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState.status])

  useEffect(() => {
    if (gameState.status !== "queue") {
      if (botJoinerRef.current) clearInterval(botJoinerRef.current)
      return
    }

    botJoinerRef.current = setInterval(() => {
      setGameState((prev : any) => {
        if (prev.players.length >= 8) return prev // Max 8 players

        const randomName = MOCK_BOT_NAMES[Math.floor(Math.random() * MOCK_BOT_NAMES.length)]
        const newBot: Player = {
          id: `bot-${Date.now()}`,
          name: randomName,
          avatarUrl: `/placeholder.svg?height=40&width=40&query=${randomName}`,
          balance: INITIAL_BALANCE,
          portfolio: {},
          initialBalance: INITIAL_BALANCE,
        }

        // Only add if name doesn't exist
        if (prev.players.some((p: Player) => p.name === newBot.name)) return prev

        return {
          ...prev,
          players: [...prev.players, newBot],
        }
      })
    }, 3500) // Add a bot every 3.5 seconds

    return () => {
      if (botJoinerRef.current) clearInterval(botJoinerRef.current)
    }
  }, [gameState.status])

  const enterQueue = (playerName: string) => {
    const player: Player = {
      id: "1",
      name: playerName || "Trader",
      avatarUrl: `/placeholder.svg?height=40&width=40&query=${playerName}`,
      balance: INITIAL_BALANCE,
      portfolio: {},
      initialBalance: INITIAL_BALANCE,
    }

    setGameState((prev : any) => ({
      ...prev,
      status: "queue",
      roomCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      player: player,
      players: [player],
      timeLeft: ROUND_DURATION, // Default duration
      roundDuration: ROUND_DURATION,
    }))
  }

  const setMatchDuration = (duration: number) => {
    setGameState((prev) => ({
      ...prev,
      roundDuration: duration,
      timeLeft: duration,
    }))
  }

  const startGame = () => {
    // Stop bot joiner if running
    if (botJoinerRef.current) clearInterval(botJoinerRef.current)

    setGameState((prev) => ({
      ...prev,
      status: "playing",
      coins: INITIAL_COINS, // Reset prices
      events: [],
    }))
  }

  const buyCoin = (coinId: string, amountUSD: number) => {
    setGameState((prev) => {
      const coin = prev.coins.find((c) => c.id === coinId)
      if (!coin || prev.player.balance < amountUSD) return prev

      const amountCoin = amountUSD / coin.price

      return {
        ...prev,
        player: {
          ...prev.player,
          balance: prev.player.balance - amountUSD,
          portfolio: {
            ...prev.player.portfolio,
            [coinId]: (prev.player.portfolio[coinId] || 0) + amountCoin,
          },
        },
      }
    })
  }

  const sellCoin = (coinId: string, amountCoin: number) => {
    setGameState((prev) => {
      const coin = prev.coins.find((c) => c.id === coinId)
      const currentHoldings = prev.player.portfolio[coinId] || 0

      if (!coin || currentHoldings < amountCoin) return prev

      const amountUSD = amountCoin * coin.price

      return {
        ...prev,
        player: {
          ...prev.player,
          balance: prev.player.balance + amountUSD,
          portfolio: {
            ...prev.player.portfolio,
            [coinId]: currentHoldings - amountCoin,
          },
        },
      }
    })
  }

  const resetGame = () => {
    setGameState((prev) => ({ ...prev, status: "lobby", players: [] }))
  }

  return (
    <GameContext.Provider value={{ gameState, enterQueue, setMatchDuration, startGame, buyCoin, sellCoin, resetGame }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) throw new Error("useGame must be used within a GameProvider")
  return context
}
