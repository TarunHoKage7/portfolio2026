/**
 * Splits `stack` into [visible, overflowCount] at `max`.
 * When `max` is undefined or stack fits, returns the full array with 0 overflow.
 * Used by ProjectCard and ProjectRow to cap the tag list display.
 */
export function truncateStack(
  stack: string[],
  max?: number,
): [visible: string[], overflow: number] {
  if (!max || stack.length <= max) return [stack, 0];
  return [stack.slice(0, max), stack.length - max];
}
