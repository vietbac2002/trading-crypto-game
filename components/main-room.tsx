"use client"
import { useState } from 'react'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Users, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation'
export default function MainRoom() {
  const [roomCode, setRoomCode] = useState("")
  const [roomName, setRoomName] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const handleJoin = async () => {
    setErrorMessage("")
    const supabase = createClient()
    // 1. Search for the room
    const { data: roomData, error } = await supabase
      .from('rooms')
      .select('id')
      .eq('id', roomCode)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 typically means 'No rows found', which we handle separately
      console.error('Error searching for room:', error);
      setErrorMessage('An error occurred while searching for the room.');
      return;
    }

    // 2. Check if the room was found
    if (!roomData) {
      setErrorMessage('Room not found. Please check the code.');
      return;
    }

    const roomId = roomData.id;

    // 3. If found, insert a new member with a default balance of 1000
    const { error: insertError } = await supabase
      .from('room_members')
      .insert({
        room_id: roomId,
        current_balance: 1000, // Explicitly set the current balance
        player_name: playerName // Assuming playerName is available in scope
      });

    if (insertError) {
      console.error('Error inserting room member:', insertError);
      setErrorMessage('Failed to join the room. Please try again.');
      return;
    }

    // 4. Redirect to the room page
    redirect(`/protected/room/${roomId}`);
  }

  const handleCreate = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('rooms')
      .insert({
        status: 'LOBBY',
        start_time: new Date().toISOString(),
        name: roomName,
        end_time: null
      })
      .select('id')
      .single()
    const roomId = data?.id;
    // Join room
    const { error: insertError } = await supabase
      .from('room_members')
      .insert({
        room_id: roomId,
        current_balance: 1000,
        player_name: playerName
      });
    if (insertError) {
      console.error('Error inserting room member:', insertError);
      setErrorMessage('Failed to join the room after creation. Please try again.');
      return;
    }
    if (error) {
      console.error('Error creating room:', error)
      return
    }

    redirect(`/protected/room/${data.id}`)
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
                <Label htmlFor="room-code">Player Name</Label>
                <Input
                  id="room-code"
                  placeholder="Enter player name..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-lg py-3"
                />
              </div>

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
                disabled={!roomCode.trim() && !playerName.trim()}
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
                <Label htmlFor="create-player-name">Room Name</Label>
                <Input
                  id="create-player-name"
                  placeholder="Enter your room name..."
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-lg py-3"
                />
              </div>
              <Button
                onClick={handleCreate}
                className="w-full py-3 text-lg font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition-colors"
                disabled={!roomName.trim()}
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
