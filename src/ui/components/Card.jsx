import { useMemo } from "react";

import { formatCurrency, formatPercent, clamp } from "@/utils";

// object that holds the intensity of the colors based on tailwinds default color palette
const colorIntensity = {
  green: {
    0: "bg-green-950",
    1: "bg-green-800",
    2: "bg-green-700",
    3: "bg-green-600",
  },
  red: {
    0: "bg-red-900 saturate-[0.4]",
    1: "bg-red-800 saturate-[0.6]",
    2: "bg-red-700 saturate-[0.7]",
    3: "bg-red-600",
  },
};

export const Card = ({ data }) => {
  // calculate the absolute number of the percentage difference
  const percentAbsoluteChange = formatCurrency(
    data.priceUsd * (data.changePercent24Hr / 100)
  );

  // determine color of the card and the intensity of the color
  const [color, intensity] = useMemo(() => {
    let intensity, color;
    // determine if the percentage is positive or negative
    let sign = Math.sign(data.changePercent24Hr);

    // if change is positive OR 0, then show a green state
    if (sign === 1 || sign === 0) {
      color = "green";
      // getting the floor on positive numbers to determine intensity level -> 2.9 is 2. 1.2 is 1. etc.
      intensity = Math.floor(data.changePercent24Hr);
    }

    // if change is negative, then show a red state
    if (sign === -1) {
      color = "red";
      // getting the ceil for negative numbers to determine intensity level -> -1.9 is 1. -3.9 is 3. etc. 
      intensity = Math.ceil(data.changePercent24Hr);
    }


    return [color, clamp(Math.abs(intensity), 0, 3)];
  }, [data]);

  return (
    <div
      className={`w-full h-52 grow-0 shrink-0 p-2 ${colorIntensity[color][intensity]}`}
    >
      <div className="flex justify-between">
        <span>
          <b>{data.name}:</b> &nbsp;{data.symbol}
        </span>

        <span className="flex gap-2">
          <p className="font-bold">{formatPercent(data.changePercent24Hr)}</p>
          &#8226; {/* alt code for dot symbol */}
          <p className="font-bold">{percentAbsoluteChange}</p>
        </span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-4xl font-bold">{formatCurrency(data.priceUsd)}</p>

        <span>
          <p>H: 4222</p>
          <p>L: 4010</p>
        </span>
      </div>
    </div>
  );
};
