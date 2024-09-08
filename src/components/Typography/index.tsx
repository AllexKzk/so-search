import { ReactNode } from 'react'
import './index.css'

interface ITypographyProps {
  children: ReactNode
  className?: string
}

function Typography({
  children,
  className,
}: ITypographyProps) {
  return <span className={className}>{children}</span>
}

export default Typography
