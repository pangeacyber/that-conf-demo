/**
 * v0 by Vercel.
 * @see https://v0.dev/t/INPKfXHzvP3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import axios from "axios"
import { DateRangePicker } from "@nextui-org/date-picker"
import {now, getLocalTimeZone, } from "@internationalized/date";
import { tsParticles } from "@tsparticles/engine";
import { loadEmojiShape } from "@tsparticles/shape-emoji";

export default function RaffleComponent() {
  const [winner, setWinner] = useState(null)
  const pickWinner = async () => {
    await loadEmojiShape(tsParticles);

    const winnerResp = await axios.post("/api/pick-winner",  {
      startTime: value.start,
      endTime: value.end
    })
    
    await tsParticles.load({
      id: "tsparticles",
      options: {
        /* options */
        /* here you can use particles.shape.type: "emoji" */
        particles: {
          shape: {
            type: ["💅", "💩"]
          }
        }
      },
    });

    setWinner(winnerResp.data);

  }

  const [client, setClient] = useState(false);
  
  let nw =  now(getLocalTimeZone());
  let then = nw.subtract({days: 5});


  let [value, setValue] = useState({
    start: then,
    end: nw
  });

  useEffect(() => {
    setClient(true);
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background" id="tsparticles">
      <div className="max-w-md w-full space-y-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Pick a Raffle Winner</h1>
          <p className="text-muted-foreground">Click the button to randomly select a winner.</p>
        </div>

    
        <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {client ?
                        <DateRangePicker
                          label="Event duration"
                          visibleMonths={1}
                          pageBehavior="single"
                          value={value}
                          onChange={setValue}
                          />
                        : <></> }
                    </div>
                </div>
        </div>


        <Button onClick={pickWinner} className="w-full">
          Pick Winner
        </Button>
        {winner && (
          <Card className="bg-card text-card-foreground">
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={winner.image_url} />
                <AvatarFallback>{winner.name}</AvatarFallback>
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