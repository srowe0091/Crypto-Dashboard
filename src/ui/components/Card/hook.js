import { useMemo } from "react";

import { formatCurrency, clamp } from "@/utils";

const colorIntensity = {
  green: {
    0: "from-green-950",
    1: "from-green-800",
    2: "from-green-700",
    3: "from-green-600",
  },
  red: {
    0: "from-red-900 saturate-[0.4]",
    1: "from-red-800 saturate-[0.6]",
    2: "from-red-700 saturate-[0.7]",
    3: "from-red-600",
  },
};

export const useCardDataHook = ({ data }) => {
  // parsing the difference from the start of day
  const currencyChange = useMemo(() => {
    // counting the number of leading zeroes. just to handle the case of very small differences likes 0.00045 since mantissa is defaulted to only show 2 decimals
    const leadingZeroes =
      data?.dayChange?.toString().match(/(\.0*)/)[0].length - 1;

    return formatCurrency(data.dayChange, {
      mantissa: leadingZeroes > 1 ? leadingZeroes + 2 : 2,
    });
  }, [data]);

  // determine color of the card and the intensity of the color
  const [color, intensity] = useMemo(() => {
    let intensity, color;
    // determine if the percentage is positive or negative
    let sign = Math.sign(data.percentDayChange);

    // if change is positive OR 0, then show a green state
    if (sign === 1 || sign === 0) {
      color = "green";
      // getting the floor on positive numbers to determine intensity level -> 2.9 is 2. 1.2 is 1. etc.
      intensity = Math.floor(data.percentDayChange);
    }

    // if change is negative, then show a red state
    if (sign === -1) {
      color = "red";
      // getting the ceil for negative numbers to determine intensity level -> -1.9 is 1. -3.9 is 3. etc.
      intensity = Math.ceil(data.percentDayChange);
    }

    return [color, clamp(Math.abs(intensity), 0, 3)];
  }, [data]);

  return {
    currencyChange,
    statusBackground: colorIntensity[color][intensity],
  };
};
