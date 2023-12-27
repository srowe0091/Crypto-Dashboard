"use client";

import { formatCurrency, formatPercent } from "@/utils";
import { useCardDataHook } from "./hook";
import { TimeLineChart } from "../TimeLineChart";

export const Card = ({ data }) => {
  const { currencyChange, statusBackground } = useCardDataHook({ data });

  return (
    <div
      className={`w-full h-60 flex flex-col grow-0 shrink-0 px-4 py-2 bg-gradient-to-t ${statusBackground} to-neutral-900 rounded-xl border border-neutral-700 drop-shadow-xl`}
    >
      <p className="text-lg font-bold text-center mb-2">{data.name}</p>
      <div className="flex justify-between">
        <p className="font-bold">
          {data.ticker}/{data.toSymbol}
        </p>

        <span className="flex gap-2">
          <p className="font-bold">{formatPercent(data.percentDayChange)}</p>
          &#8226; {/* alt code for dot symbol */}
          <p className="font-bold">{currencyChange}</p>
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-3xl font-bold">
          {formatCurrency(data.currentPrice)}
        </p>

        <span className="shrink-0">
          <p className="text-sm">H: {formatCurrency(data.high)}</p>
          <p className="text-sm">L: {formatCurrency(data.low)}</p>
        </span>
      </div>

      <div className="flex-1 mt-4">
        <TimeLineChart ticker={data.ticker} />
      </div>
    </div>
  );
};
