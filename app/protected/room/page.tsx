"use client"

import { useGame } from "@/contexts/GameContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Copy, Play } from "lucide-react"
import { useState } from "react"

export default function Queue() {
  const { gameState, startGame, setMatchDuration } = useGame()
  const [copied, setCopied] = useState(false)

  const copyRoomCode = () => {
    if (gameState.roomCode) {
      navigator.clipboard.writeText(gameState.roomCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const durations = [
    { label: "Standard (30m)", value: 60 * 30 },
    {label: "Extended (1h)", value: 60 * 60 },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 p-4 max-w-5xl mx-auto w-full">
      <div className="text-center space-y-2">
        <h1 className="text-4xl tracking-tighter text-white uppercase">
          Lobby <span className="text-white">#{gameState.roomCode}</span>
        </h1>
        <p className="text-slate-white">Waiting for players to join...</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Room Settings */}
        <Card className="bg-slate-900/50 border-slate-800 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <ActivityIcon className="w-5 h-5" />
              Room Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Room Code</label>
              <div className="flex gap-2">
                <div className="flex-1 border rounded-md px-3 py-2">
                  <span className="text-white text-center">{gameState.roomCode}</span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyRoomCode}
                  className="border-slate-800 hover:bg-slate-800 bg-transparent"
                >
                  {copied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Match Duration
              </label>
              <div className="grid grid-cols-1 gap-2">
                {durations.map((d) => (
                  <Button
                    key={d.value}
                    variant={gameState.roundDuration === d.value ? "default" : "outline"}
                    onClick={() => setMatchDuration(d.value)}
                    className={`w-full justify-start ${
                      gameState.roundDuration === d.value
                        ? "bg-cyan-500 hover:bg-cyan-600 text-black"
                        : "border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {d.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => startGame()}
                className="w-full py-6 text-lg font-bold bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white border-0 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <Play className="w-5 h-5 mr-2 fill-current" /> START MATCH
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Players List */}
        <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Users className="w-5 h-5" />
              Connected Players
            </CardTitle>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/50">
              {gameState.players.length} / 8
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {gameState.players.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    player.id === gameState.player.id
                      ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                      : "bg-slate-950/50 border-slate-800"
                  }`}
                >
                  <Avatar className="h-12 w-12 border-2 border-slate-800">
                    <AvatarImage src={player.avatarUrl || "/placeholder.svg"} />
                    <AvatarFallback className="bg-slate-800 text-slate-400">
                      {player.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold ${player.id === gameState.player.id ? "text-cyan-400" : "text-white"}`}>
                        {player.name}
                      </h3>
                      {player.id === gameState.player.id && (
                        <Badge className="h-5 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border-0 text-[10px]">
                          YOU
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">${player.balance.toLocaleString()} ready</p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              ))}

              {/* Empty Slots */}
              {Array.from({ length: Math.max(0, 8 - gameState.players.length) }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-800/50 bg-slate-950/30 border-dashed opacity-50"
                >
                  <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="h-4 w-24 bg-slate-900 rounded" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
