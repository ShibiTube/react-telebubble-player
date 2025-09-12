import {
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
  KeyboardEvent,
} from 'react'
import {
  polarToCartesian,
  valueToAngle,
  calculateNearestValueToPoint,
} from '@/utils/progressRing'
import {
  ProgressRingInputContext,
  ProgressRingInputProvider,
} from '@/components/ProgressRing/ProgressRingInputContext'
import { Track } from '@/components/ProgressRing/Track'
import { Progress } from '@/components/ProgressRing/Progress'
import { Thumb } from '@/components/ProgressRing/Thumb'

type DefaultHTMLProps = React.JSX.IntrinsicElements['svg']

type Props = Omit<DefaultHTMLProps, 'onChange'> & {
  value: number
  radius?: number
  onChange?: (value: number) => void
  clickTolerance?: number
  hasStarted?: boolean
  children?: React.ReactNode | ((context: ProgressRingInputContext) => React.ReactNode)
  // disallow some props
  ref?: undefined
  width?: undefined
  height?: undefined
  viewBox?: undefined
  onClick?: undefined
}

export function ProgressRingInput({
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
  const [actualRadius, setActualRadius] = useState(radius)
  const size = actualRadius * 2
  const center = useMemo(() => ({ x: actualRadius, y: actualRadius }), [actualRadius])

  // Calculate actual radius based on container size
  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const containerSize = Math.min(rect.width, rect.height)
        const newRadius = containerSize / 2
        setActualRadius(newRadius)
      }
    }

    updateRadius()

    const resizeObserver = new ResizeObserver(updateRadius)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

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
      const { key } = e

      // arrow up, arrow right, page up, space
      const isIncrement =
        key === 'ArrowUp' ||
        key === 'ArrowRight' ||
        key === 'PageUp' ||
        key === ' '
      // arrow down, arrow left, page down
      const isDecrement =
        key === 'ArrowDown' || key === 'ArrowLeft' || key === 'PageDown'

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
        radius: actualRadius,
      }),
    [value, center, actualRadius]
  )

  const getValueFromPointerEvent = useCallback(
    (e: Event) => {
      // Get coordinates directly from native event
      const nativeEvent = e as MouseEvent | TouchEvent;
      let clientX: number, clientY: number;
      
      if ('touches' in nativeEvent && nativeEvent.touches.length > 0) {
        clientX = nativeEvent.touches[0].clientX;
        clientY = nativeEvent.touches[0].clientY;
      } else if ('changedTouches' in nativeEvent && nativeEvent.changedTouches.length > 0) {
        clientX = nativeEvent.changedTouches[0].clientX;
        clientY = nativeEvent.changedTouches[0].clientY;
      } else {
        clientX = (nativeEvent as MouseEvent).clientX;
        clientY = (nativeEvent as MouseEvent).clientY;
      }
      
      // Get SVG element position and convert to SVG coordinates
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return value;
      
      // Convert client coordinates to SVG coordinates
      const svgX = ((clientX - rect.left) / rect.width) * size;
      const svgY = ((clientY - rect.top) / rect.height) * size;
      
      const point = {
        x: svgX,
        y: svgY,
      };
      
      // Use SVG coordinate system for calculation
      return calculateNearestValueToPoint({
        point,
        container: { x: 0, y: 0 }, // SVG origin
        value: value / 100,
        center,
        radius: actualRadius,
      }) * 100;
    },
    [value, center, actualRadius, size]
  )

  // Context

  const context = useMemo(
    (): ProgressRingInputContext => ({
      value,
      radius: actualRadius,
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
      actualRadius,
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

    // Use the same coordinate system as getValueFromPointerEvent
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * size;
    const clickY = ((e.clientY - rect.top) / rect.height) * size;

    // Calculate distance from the actual ring center (not container center)
    const distanceFromCenter = Math.sqrt(
      Math.pow(clickX - center.x, 2) + Math.pow(clickY - center.y, 2)
    );

    // Add tolerance around the ring based on clickTolerance prop
    const tolerance = clickTolerance;
    const minDistance = actualRadius - tolerance;
    const maxDistance = actualRadius + tolerance;

    // Only handle clicks within the tolerance zone
    if (distanceFromCenter >= minDistance && distanceFromCenter <= maxDistance) {
      // Stop propagation only when clicking on the progress ring
      e.stopPropagation();
      const nearestValue = getValueFromPointerEvent(e.nativeEvent);
      onChange(nearestValue);
    }
    // If click is outside the ring area, let the event bubble up for play/pause
  }, [center, actualRadius, clickTolerance, getValueFromPointerEvent, onChange, hasStarted, size]);

  const style = {
    overflow: 'visible',
    outline: 'none',
    ...(props.style || {}),
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  }

  return (
    <ProgressRingInputProvider value={context}>
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
            <Track />
            <Progress />
            <Thumb />
          </>
        )}
      </svg>
    </ProgressRingInputProvider>
  )
}
