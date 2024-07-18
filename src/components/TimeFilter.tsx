import React from "react";
import {DatePicker} from "@nextui-org/react";
import {now, getLocalTimeZone} from "@internationalized/date";

export default function TimeFilter() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4">
      <DatePicker
        label="From"
        variant="bordered"
        hideTimeZone
        defaultValue={now(getLocalTimeZone())}
      />
     <DatePicker
        label="To"
        variant="bordered"
        hideTimeZone
        defaultValue={now(getLocalTimeZone())}
      />
    </div>
  );
}