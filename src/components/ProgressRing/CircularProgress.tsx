import React, { useCallback } from 'react'
import { useCircularInputContext, CircularTrack } from '.'
import { Props as CircularTrackProps } from './CircularTrack'
import { DEG_360_IN_RAD } from './utils'

type Props = React.JSX.IntrinsicElements['circle'] &
  CircularTrackProps & {
    // disallow some props
    strokeDasharray?: undefined
    strokeDashoffset?: undefined
    transform?: undefined
  }

const defaultProps = {
  stroke: '#3D99FF',
}

export const CircularProgress = (props: Props) => {
  const { value, radius, center, getValueFromPointerEvent, onChange } = useCircularInputContext()
  const innerCircumference = DEG_360_IN_RAD * radius

  const handleClick = useCallback((e: React.MouseEvent<SVGCircleElement>) => {
    e.stopPropagation()
    if (onChange) {
      const nearestValue = getValueFromPointerEvent(e.nativeEvent)
      onChange(nearestValue)
    }
  }, [onChange, getValueFromPointerEvent])

  return (
    <CircularTrack
      {...props}
      strokeDasharray={innerCircumference}
      strokeDashoffset={innerCircumference * (1 - value / 100)}
      transform={`rotate(-90 ${center.x} ${center.y})`}
      onClick={handleClick}
      style={{ cursor: 'pointer', ...props.style }}
    />
  )
}

CircularProgress.defaultProps = defaultProps