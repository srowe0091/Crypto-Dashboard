import numbro from "numbro";

// setting numbro defaults for all formats. can be overwritten
numbro.setDefaults({
  thousandSeparated: true,
  mantissa: 2,
});

/**
 * Converts numbers to currencies
 * @param {number} amount
 * @param {numbro.Format} options
 * @returns string "$3,145.35"
 */
export const formatCurrency = (amount, options) =>
  numbro(amount).formatCurrency({ average: false, ...options });

/**
 * Converts numbers to percentages
 * @param {number} number number to convert to a percent
 * @returns string "3.35%"
 */
export const formatPercent = (number) =>
  numbro(number).format({ postfix: "%" });

/**
 * This will ensure that the provided value will stay in between the absolute min and max
 * @param {number} val value to clamp
 * @param {number} min absolute minimum value
 * @param {number} max absolute maximum value
 * @returns number between min and max
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/**
 * Converts 24 hour time to 12 hours with am/pm strings
 * @param {number} hour
 * @returns String in 12 hour format
 */
export const timeConversion = (hour) =>
  hour >= 12 ? `${hour % 12 || 12}pm` : `${hour || 12}am`;
