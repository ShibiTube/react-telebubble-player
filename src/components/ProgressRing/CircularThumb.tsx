import { useRef, useCallback } from 'react'
import { useCircularInputContext, useCircularDrag } from './'

export const CircularThumb = (props: React.JSX.IntrinsicElements['circle'] & { hasStarted?: boolean }) => {
  const { getPointFromValue, isFocused, getValueFromPointerEvent, onChange } = useCircularInputContext()
  const ref = useRef<SVGCircleElement | null>(null)
  const { isDragging } = useCircularDrag(ref)
  const { hasStarted = false } = props

  const handleClick = useCallback((e: React.MouseEvent<SVGCircleElement>) => {
    e.stopPropagation()
    if (onChange) {
      const nearestValue = getValueFromPointerEvent(e.nativeEvent)
      onChange(nearestValue)
    }
  }, [onChange, getValueFromPointerEvent])

  const point = getPointFromValue()

  // Check conditions after all hooks are called
  if (!point || !hasStarted) return null

  const { x, y } = point

  const style = {
    transition: 'r 150ms cubic-bezier(0.215, 0.61, 0.355, 1)',
    cursor: 'pointer',
    ...(props.style || {}),
  }
  return (
    <circle
      r={isFocused || isDragging ? 8 : 6}
      fill="#ffffff"
      stroke="#ff0000"
      strokeWidth={2}
      {...props}
      style={style}
      ref={ref}
      cx={x}
      cy={y}
      onClick={handleClick}
    />
  )
}