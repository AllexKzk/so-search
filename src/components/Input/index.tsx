import './index.css'
import { ReactComponent as Search } from '../../assets/search.svg'
import { useRef } from 'react'

interface IInputProps {
  className?: string
  placeholder?: string
  onFocus?: () => void
  request?: (search: string) => void
}
export default function Input({
  placeholder,
  className,
  onFocus,
  request,
}: IInputProps) {
  const onClick = () =>
    request?.(input.current?.value ?? '')

  const input = useRef<HTMLInputElement>(null)

  return (
    <div className={className}>
      <input
        ref={input}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      <button onClick={onClick}>
        <Search className='w-auto h-[20px] m-auto' />
      </button>
    </div>
  )
}
