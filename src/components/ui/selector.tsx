"use client";

import React, { useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import dayjs from 'dayjs';

export default function Selector() {
  let nw =  dayjs();
  let then = dayjs().subtract(3, 'day');

  let [value, setValue] = React.useState({
    start: then,
    end: nw
  });

  return (
    <div>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="space-y-4">
            <Label htmlFor="start-time"> Start</Label>
            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker defaultValue={dayjs().subtract(3, 'day')} />
            </LocalizationProvider>
            
          </div>
          <div className="space-y-4">
            <Label htmlFor="end-date">End</Label>
            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDateTimePicker defaultValue={dayjs()} />
            </LocalizationProvider>     
          </div>
          <div className="space-y-4">
            <Label htmlFor="end-date">Polling</Label>
            <br></br>
            <Switch aria-label="polling" />
          </div>
          <div className="space-y-4">
            <br></br>
            <Button> Confirm</Button>
          </div>
        </div>
    </div>
  )
}

