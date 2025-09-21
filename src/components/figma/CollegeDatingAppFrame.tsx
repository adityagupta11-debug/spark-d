import * as React from 'react'
import { FigmaEmbed } from './FigmaEmbed'

type Props = {
  className?: string
  style?: Record<string, unknown>
}

// Provided by user
const SHARE_URL = 'https://www.figma.com/make/h1IighE64Yi29UxpScokW3/College-Dating-App?node-id=0-1&t=HbXwjmEfJAQmq7t7-1'

export function CollegeDatingAppFrame(props: Props) {
  const { className, style } = props
  return (
    <FigmaEmbed
      url={SHARE_URL}
      title="College Dating App — Figma"
      className={className}
      style={style}
    />
  )
}

export default CollegeDatingAppFrame

