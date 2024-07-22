/**
 * v0 by Vercel.
 * @see https://v0.dev/t/INPKfXHzvP3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function RaffleComponent() {
  const [winner, setWinner] = useState(null)
  const pickWinner = () => {
    setWinner(null)
    setTimeout(() => {
      setWinner({
        email: "john@example.com",
        profilePic: "/placeholder-user.jpg",
        name: "John Doe",
      })
    }, 1500)
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="max-w-md w-full space-y-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Pick a Raffle Winner</h1>
          <p className="text-muted-foreground">Click the button to randomly select a winner.</p>
        </div>
        <Button onClick={pickWinner} className="w-full">
          Pick Winner
        </Button>
        {winner && (
          <Card className="bg-card text-card-foreground">
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{winner.name.split(" ").map((word) => word[0])}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{winner.name}</div>
                <div className="text-sm text-muted-foreground">{winner.email}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}