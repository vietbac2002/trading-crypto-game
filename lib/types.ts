export type Coin = {
  id: string
  symbol: string
  name: string
  price: number
  priceHistory: number[] // For charts
  trend: "up" | "down" | "neutral"
  volatility: number // How much it moves
}

export type Player = {
  id: string
  name: string
  avatarUrl?: string // added avatarUrl
  balance: number
  portfolio: Record<string, number> // coinId -> amount
  initialBalance: number
}

export type GameEvent = {
  id: string
  title: string
  description: string
  impact: "positive" | "negative" | "neutral"
  coinId?: string // If it affects a specific coin
  timestamp: number
}

export type GameState = {
  status: "lobby" | "queue" | "playing" | "finished" // added queue status
  roomCode?: string // added roomCode
  players: Player[] // added players list for the room
  timeLeft: number
  roundDuration: number // in seconds
  coins: Coin[]
  player: Player
  events: GameEvent[]
  highscores: { name: string; profit: number }[]
}
