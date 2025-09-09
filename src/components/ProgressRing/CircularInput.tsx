import {
  useRef,
  useMemo,
  useCallback,
  useState,
  KeyboardEvent,
} from 'react'
import {
  Coordinates,
  polarToCartesian,
  valueToAngle,
  calculateNearestValueToPoint,
  getElementPosition,
  absPos,
} from './utils'
import {
  CircularInputContext,
  CircularInputProvider,
} from './CircularInputContext'
import { CircularTrack } from './CircularTrack'
import { CircularProgress } from './CircularProgress'
import { CircularThumb } from './CircularThumb'

type DefaultHTMLProps = React.JSX.IntrinsicElements['svg']

type Props = Omit<DefaultHTMLProps, 'onChange'> & {
  value: number
  radius?: number
  onChange?: (value: number) => void
  clickTolerance?: number
  hasStarted?: boolean
  children?: React.ReactNode | ((context: CircularInputContext) => React.ReactNode)
  // disallow some props
  ref?: undefined
  width?: undefined
  height?: undefined
  viewBox?: undefined
  onClick?: undefined
}

export function CircularInput({
  value = 25,
  radius = 100,
  onChange = () => { },
  clickTolerance = 5,
  hasStarted = false,
  tabIndex = 0,
  children,
  ...props
}: Props) {
  const containerRef = useRef<SVGSVGElement>(null)
  const size = radius * 2
  const center = useMemo(() => ({ x: radius, y: radius }), [radius])

  // Accessibility
  const [isFocused, setFocused] = useState(false)

  const isReadonly = !onChange

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    setFocused(false)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<SVGSVGElement>) => {
      if (!isFocused) return
      const { keyCode } = e

      // arrow up, arrow right, page up, space
      const isIncrement =
        keyCode === 38 ||
        keyCode === 39 ||
        keyCode === 33 ||
        keyCode === 32
      // arrow down, arrow left, page down
      const isDecrement =
        keyCode === 40 || keyCode === 37 || keyCode === 34

      if (isIncrement) {
        onChange(Math.min(100, value + 10))
      }

      if (isDecrement) {
        onChange(Math.max(0, value - 10))
      }

      if (isIncrement || isDecrement) {
        e.preventDefault()
      }
    },
    [isFocused, onChange, value]
  )

  const accessibilityProps = {
    tabIndex,
    role: 'slider',
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  }

  // Geometry utilities

  const getPointFromValue = useCallback(
    (v?: number) =>
      polarToCartesian({
        center,
        angle: valueToAngle((v || value) / 100),
        radius,
      }),
    [value, center, radius]
  )

  const getValueFromPointerEvent = useCallback(
    (e: Event) =>
      calculateNearestValueToPoint({
        point: absPos(e as any),
        container: getElementPosition(
          containerRef.current
        ) as Coordinates,
        value: value / 100,
        center,
        radius,
      }) * 100,
    [value, center, radius]
  )

  // Context

  const context = useMemo(
    (): CircularInputContext => ({
      value,
      radius,
      center,
      isFocused,
      setFocused,
      onChange,
      getPointFromValue,
      getValueFromPointerEvent,
      clickTolerance,
      hasStarted,
    }),
    [
      value,
      radius,
      center,
      onChange,
      isFocused,
      setFocused,
      getPointFromValue,
      getValueFromPointerEvent,
      clickTolerance,
      hasStarted,
    ]
  )


  const handleSvgClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    // Only handle progress ring clicks if video has started
    if (!hasStarted) return;

    // Check if click is within tolerance of the ring
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const distanceFromCenter = Math.sqrt(
      Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)
    );

    // Add small tolerance around the ring (10px buffer)
    const tolerance = 10;
    const minDistance = radius - tolerance;
    const maxDistance = radius + tolerance;

    // Only handle clicks within the tolerance zone
    if (distanceFromCenter >= minDistance && distanceFromCenter <= maxDistance) {
      // Stop propagation only when clicking on the progress ring
      e.stopPropagation();
      const nearestValue = getValueFromPointerEvent(e.nativeEvent);
      onChange(nearestValue);
    }
    // If click is outside the ring area, let the event bubble up for play/pause
  }, [radius, getValueFromPointerEvent, onChange, hasStarted]);

  const style = {
    overflow: 'visible',
    outline: 'none',
    ...(props.style || {}),
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  }

  return (
    <CircularInputProvider value={context}>
      <svg
        {...props}
        ref={containerRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={style}
        onClick={handleSvgClick}
        {...(!isReadonly ? accessibilityProps : {})}
      >
        {children ? (
          typeof children === 'function' ? (
            children(context)
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
  )
}