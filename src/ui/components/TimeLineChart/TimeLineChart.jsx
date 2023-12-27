"use client";

import { useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import { PropagateLoader } from "react-spinners";
import { fromUnixTime, getHours } from "date-fns";

import { formatCurrency, timeConversion } from "@/utils";
import { useTimeLineData } from "./useTimeLineData";

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="bg-black px-2 py-1 rounded-lg">
        <p className="text-small font-bold">
          {label} : {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
}

export const TimeLineChart = ({ ticker }) => {
  // keeping track of animation state when its done animating to improve performance when window is resizing.
  const [animationState, toggleAnimationState] = useState(true);

  const { data, isLoading } = useTimeLineData(ticker);

  // render a spinner when its loading
  if (isLoading) {
    return (
      <div className="w-full flex justify-center mt-12">
        <PropagateLoader color="#fff" size={10} />
      </div>
    );
  }

  // if no data appears, just show the user something went wrong
  if (data?.length === 0) {
    return (
      <p className="text-sm text-center mt-12">
        Timeline data could not be fetched at this moment.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis
          dataKey={(data) => timeConversion(getHours(fromUnixTime(data.time)))}
          minTickGap={70}
          tickCount={4}
          tickLine={false}
          axisLine={false}
          style={{ fill: "white" }}
        />
        <YAxis hide domain={["dataMin", "dataMax"]} />

        <Tooltip content={<CustomTooltip />} />

        <Line
          dot={false}
          dataKey="close"
          stroke="#fff"
          animationDuration={1000}
          isAnimationActive={animationState}
          onAnimationStart={() => toggleAnimationState(true)}
          onAnimationEnd={() => toggleAnimationState(false)}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
