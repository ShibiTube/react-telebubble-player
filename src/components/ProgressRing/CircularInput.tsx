import React, {
  useRef,
  useMemo,
  useCallback,
  useState,
  KeyboardEvent,
} from 'react';
import {
  Coordinates,
  polarToCartesian,
  valueToAngle,
  calculateNearestValueToPoint,
  getElementPosition,
  absPos,
} from './utils';
import {
  CircularInputContext,
  CircularInputProvider,
} from './context';
import { CircularTrack } from './CircularTrack';
import { CircularProgress } from './CircularProgress';
import { CircularThumb } from './CircularThumb';

type DefaultHTMLProps = React.SVGProps<SVGSVGElement>;

type CircularInputProps = Omit<DefaultHTMLProps, 'onChange'> & {
  value: number;
  radius?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  clickTolerance?: number;
  // disallow some props
  ref?: undefined;
  width?: undefined;
  height?: undefined;
  viewBox?: undefined;
  onClick?: undefined;
};

export function CircularInput({
  value = 0.25,
  radius = 100,
  onChange = () => { },
  onChangeEnd = () => { },
  clickTolerance = 5,
  tabIndex = 0,
  children,
  ...props
}: CircularInputProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const size = radius * 2;
  const center = useMemo(() => ({ x: radius, y: radius }), [radius]);

  // Accessibility
  const [isFocused, setFocused] = useState(false);

  const isReadonly = !onChange;

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<SVGSVGElement>) => {
      if (!isFocused) return;
      const { keyCode } = e;

      // arrow up, arrow right, page up, space
      const isIncrement =
        keyCode === 38 ||
        keyCode === 39 ||
        keyCode === 33 ||
        keyCode === 32;
      // arrow down, arrow left, page down
      const isDecrement =
        keyCode === 40 || keyCode === 37 || keyCode === 34;

      if (isIncrement) {
        onChange(Math.min(1, value + 0.1));
      }

      if (isDecrement) {
        onChange(Math.max(0, value - 0.1));
      }

      if (isIncrement || isDecrement) {
        e.preventDefault();
      }
    },
    [isFocused, onChange, value]
  );

  const accessibilityProps = {
    tabIndex,
    role: 'slider',
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  };

  // Geometry utilities

  const getPointFromValue = useCallback(
    (v?: number) =>
      polarToCartesian({
        center,
        angle: valueToAngle(v || value),
        radius,
      }),
    [value, center, radius]
  );

  const getValueFromPointerEvent = useCallback(
    (e: Event) =>
      calculateNearestValueToPoint({
        point: absPos(e as any),
        container: getElementPosition(
          containerRef.current
        ) as Coordinates,
        value,
        center,
        radius,
      }),
    [value, center, radius]
  );

  // Context

  const context = useMemo(
    (): CircularInputContext => ({
      value,
      radius,
      center,
      isFocused,
      setFocused,
      onChange,
      onChangeEnd,
      getPointFromValue,
      getValueFromPointerEvent,
    }),
    [
      value,
      radius,
      center,
      onChange,
      onChangeEnd,
      isFocused,
      setFocused,
      getPointFromValue,
      getValueFromPointerEvent,
    ]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (isReadonly) return;

      // Check if click is on the thumb - if so, don't handle it here
      const target = e.target as SVGElement;
      if (target.tagName === 'circle' && target.getAttribute('r') === '8') {
        // This is a click on the thumb, let the drag handler deal with it
        return;
      }

      // For all other clicks, allow them to bubble up to the video player
      // This will trigger play/pause functionality
      // Don't prevent default or stop propagation
    },
    [isReadonly]
  );

  const style = {
    overflow: 'visible',
    outline: 'none',
    ...(props.style || {}),
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    pointerEvents: 'auto', // Allow SVG to receive events
  };

  return (
    <CircularInputProvider value={context}>
      <svg
        {...props}
        ref={containerRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={style}
        onClick={handleClick}
        {...(!isReadonly ? accessibilityProps : {})}
      >
        {children ? (
          typeof children === 'function' ? (
            (children as any)(context)
          ) : (
            children
          )
        ) : (
          <>
            <CircularTrack />
            <CircularProgress />
            <CircularThumb />
          </>
        )}
      </svg>
    </CircularInputProvider>
  );
}
