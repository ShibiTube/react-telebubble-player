/**
 * Simple clsx replacement - combines class names conditionally
 */
type ClsxInput = string | number | boolean | undefined | null | Record<string, boolean> | ClsxInput[];

export function clsx(...inputs: ClsxInput[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    const type = typeof input;
    
    if (type === 'string' || type === 'number') {
      classes.push(String(input));
    } else if (type === 'object') {
      if (Array.isArray(input)) {
        classes.push(clsx(...input));
      } else {
        const obj = input as Record<string, boolean>;
        for (const key in obj) {
          if (obj[key]) {
            classes.push(key);
          }
        }
      }
    }
  }
  
  return classes.join(' ');
}