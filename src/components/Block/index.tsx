import { ReactNode } from 'react'
import './index.css'

interface IBlockProps {
  children: ReactNode
  className?: string
}

export default function Block({
  children,
  className,
}: IBlockProps) {
  return (
    <div className={`${className} block`}>{children}</div>
  )
}
