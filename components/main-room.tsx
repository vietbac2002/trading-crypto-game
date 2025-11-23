"use client"
import { useState } from 'react'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Users, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
export default function Lobby() {
  const [playerName, setPlayerName] = useState("")
  const [roomCode, setRoomCode] = useState("")
  const router = useRouter(); 

  const handleJoin = () => {
    if (!playerName.trim() || !roomCode.trim()) return
    // joinGame(playerName, roomCode)
  }

  const handleCreate = () => {
    if (!playerName.trim()) return
    // createGame(playerName)
    router.push('/protected/room');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Trading Crypto Game Lobby</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-cyan-400">Join Room</CardTitle>
              <CardDescription className="text-center">Enter your room code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="room-code">Room Code</Label>
                <Input
                  id="room-code"
                  placeholder="Enter room code..."
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-lg py-3"
                />
              </div>
              <Button
                onClick={handleJoin}
                className="w-full py-3 text-lg font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition-colors"
                disabled={!playerName.trim() || !roomCode.trim()}
              >
                <Users className="mr-2 h-5 w-5" />
                JOIN ROOM
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-cyan-400">Create Room</CardTitle>
              <CardDescription className="text-center">Start a new game room</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="create-room-name">Room Name</Label>
                <Input
                  id="create-room-name"
                  placeholder="Enter your room name..."
                  // value={roomCode}
                  // onChange={(e) => setRoomCode(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-lg py-3"
                />
              </div>
              <Button
                onClick={handleCreate}
                className="w-full py-3 text-lg font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition-colors"
                disabled={!playerName.trim()}
              >
                <Plus className="mr-2 h-5 w-5" />
                CREATE ROOM
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
