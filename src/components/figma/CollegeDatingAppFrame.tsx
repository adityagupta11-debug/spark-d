import React from 'react'
import { FigmaEmbed, type FigmaEmbedProps } from './FigmaEmbed'

/**
 * Preconfigured embed for the "College Dating App" Figma frame.
 * Usage: <CollegeDatingAppFrame height={900} />
 */
export default function CollegeDatingAppFrame(
  props: Omit<FigmaEmbedProps, 'url'>
) {
  const FRAME_URL =
    'https://www.figma.com/make/h1IighE64Yi29UxpScokW3/College-Dating-App?node-id=0-1&t=HbXwjmEfJAQmq7t7-1'

  return <FigmaEmbed url={FRAME_URL} title="College Dating App – Figma" {...props} />
}

