import { useRef, useCallback } from 'react'
import { useCircularInputContext } from './'
import { useCircularDrag } from './useCircularDrag'

export type Props = React.JSX.IntrinsicElements['circle'] & {
  // disallow some props
  ref?: undefined
  cx?: undefined
  cy?: undefined
  r?: undefined
}

export const defaultProps = {
  stroke: '#CEE0F5',
  fill: 'none',
  strokeWidth: 20,
  strokeLinecap: 'round',
}

export const CircularTrack = ({ strokeWidth, ...props }: Props) => {
  const { radius, center, getValueFromPointerEvent, onChange } = useCircularInputContext()
  const ref = useRef<SVGCircleElement | null>(null)
  useCircularDrag(ref)

  const handleClick = useCallback((e: React.MouseEvent<SVGCircleElement>) => {
    e.stopPropagation()
    if (onChange) {
      const nearestValue = getValueFromPointerEvent(e.nativeEvent)
      onChange(nearestValue)
    }
  }, [onChange, getValueFromPointerEvent])

  return (
    <circle
      strokeWidth={strokeWidth}
      {...props}
      ref={ref}
      cx={center.x}
      cy={center.y}
      r={radius}
      onClick={handleClick}
      style={{ cursor: 'pointer', ...props.style }}
    />
  )
}

CircularTrack.defaultProps = defaultProps