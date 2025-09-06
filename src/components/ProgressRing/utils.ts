import { MouseEvent, TouchEvent } from 'react';

export const DEG_360_IN_RAD = radians(360);
export const ANGLE_OFFSET = Math.PI;

export type Coordinates = {
  x: number;
  y: number;
};

export function polarToCartesian({
  center,
  angle,
  radius,
}: {
  center: Coordinates;
  angle: number;
  radius: number;
}): Coordinates {
  return {
    x: center.x + Math.sin(angle) * radius,
    y: center.y + Math.cos(angle) * radius,
  };
}

export function radians(deg: number) {
  return (deg * Math.PI) / 180;
}

export function degrees(rad: number) {
  return (rad * 180) / Math.PI;
}

export function matrixScale(scale: number, x: number, y: number) {
  return `matrix(${scale}, 0, 0, ${scale}, ${x - scale * x}, ${y - scale * y})`;
}

export function clamp(min: number, max: number, value: number) {
  return Math.min(Math.max(value, min), max);
}

export function calculateNearestValueToPoint({
  center: { x: centerX, y: centerY },
  container: { x: containerX, y: containerY },
  point: { x: pointX, y: pointY },
  radius,
  value,
}: {
  center: Coordinates;
  container: Coordinates;
  point: Coordinates;
  radius: number;
  value: number;
}) {
  // Calculate the angle from center to the click point
  const clickX = pointX - containerX - centerX;
  const clickY = pointY - containerY - centerY;

  // Calculate angle in radians (0 to 2π)
  let angle = Math.atan2(clickX, -clickY);

  // Convert to 0-1 range (0 = top, 0.25 = right, 0.5 = bottom, 0.75 = left)
  if (angle < 0) {
    angle += 2 * Math.PI;
  }

  // Convert to 0-1 value
  const newValue = angle / (2 * Math.PI);

  // Clamp to 0-1 range
  return Math.max(0, Math.min(1, newValue));
}

export function calcAngleDiff(x1: number, y1: number, x2: number, y2: number) {
  let arcTangent = Math.atan2(x1 * y2 - y1 * x2, x1 * x2 + y1 * y2);
  if (arcTangent < 0) {
    arcTangent += 2 * Math.PI;
  }
  return (arcTangent * 180) / Math.PI;
}

export function valueToAngle(value: number) {
  return -value * DEG_360_IN_RAD + ANGLE_OFFSET;
}

export function absPos(e: TouchEvent | MouseEvent) {
  const touchEvent = (e as TouchEvent).touches && (e as TouchEvent);
  if (touchEvent) {
    return {
      x:
        touchEvent.changedTouches[0].pageX -
        (window.scrollX || window.pageXOffset),
      y:
        touchEvent.changedTouches[0].pageY -
        (window.scrollY || window.pageYOffset),
    };
  }
  const mouseEvent = (e as MouseEvent).pageX && (e as MouseEvent);
  if (mouseEvent) {
    return {
      x: mouseEvent.pageX - (window.scrollX || window.pageXOffset),
      y: mouseEvent.pageY - (window.scrollY || window.pageYOffset),
    };
  }
  throw new Error(
    'Unknown event type received (expected: MouseEvent | TouchEvent)'
  );
}

export function stopEvent(e: Event | MouseEvent | TouchEvent) {
  e.stopPropagation();
  e.preventDefault();
}

export function getElementPosition(el?: Element | null) {
  if (!el) return;
  const { left: x, top: y } = el.getBoundingClientRect();
  return { x, y };
}
