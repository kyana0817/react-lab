import { ChangeEvent } from 'react'

interface SliderProps {
  label: string
  name: string
  value: number
  min: number
  max: number
  step: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  decimals?: number
}

export const Slider = ({
  label,
  name,
  value,
  min,
  max,
  step,
  onChange,
  decimals = 2,
}: SliderProps) => {
  return (
    <div className="mb-3">
      <label>
        <span className="text-white text-sm">
          {label}
          :
        </span>
        {' '}
        <span className="text-pink-500 font-bold">
          {value.toFixed(decimals)}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full block mt-2 accent-pink-500"
        />
      </label>
    </div>
  )
}
