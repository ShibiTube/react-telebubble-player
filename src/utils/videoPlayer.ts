import { SizeCalculationResult } from "@/components/VideoPlayer/types";

/**
 * Calculate numeric size from size prop (number or string)
 * @param size - Size prop from component
 * @returns Numeric size value, defaults to 300 if size is a string
 */
export const getNumericSize = (size: number | string): number => {
  if (typeof size === 'number') return size;
  
  // For percentage strings, we can't determine the actual size without container context
  // So we return a reasonable default that will be overridden by CSS
  if (typeof size === 'string' && size.includes('%')) {
    return 400; // Default for percentage-based sizing
  }
  
  return 300;
};

/**
 * Calculate CSS variables for the video player container
 * @param size - Size prop from component
 * @param numericSize - Numeric size value
 * @returns CSS variables object for styling
 */
export const getCssVariables = (size: number | string, numericSize: number): React.CSSProperties => {
  return {
    "--size": typeof size === 'number' ? `${size}px` : size,
    "--min-size": `${Math.max(120, numericSize / 2)}px`,
  } as React.CSSProperties;
};

/**
 * Calculate size-related values for the video player
 * @param size - Size prop from component
 * @returns Object containing numeric size and CSS variables
 */
export const calculateSize = (size: number | string): SizeCalculationResult => {
  const numericSize = getNumericSize(size);
  const cssVariables = getCssVariables(size, numericSize);

  return {
    numericSize,
    cssVariables,
  };
};
