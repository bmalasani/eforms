import { alpha } from '@mui/material';

export function pxToRem(number: number, baseNumber = 16) {
  return `${number / baseNumber}rem`;
}

export function boxShadow(
  offset: [number, number],
  radius: [number, number],
  color: string,
  opacity: number,
  inset = ''
) {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${alpha(
    color,
    opacity
  )}`;
}

export function boxColorShadow(main: string, state: string) {
  return `${boxShadow([0, 4], [20, 0], main, 0.14)}, ${boxShadow([0, 7], [10, -5], state, 0.4)}`;
}

export function linearGradient(color: { main: string; state: string }, angle = 195) {
  return `linear-gradient(${angle}deg, ${color.main}, ${color.state})`;
}

export function iff(condition: boolean, truth: any, falsy: any) {
  if (condition) return truth;
  return falsy;
}
