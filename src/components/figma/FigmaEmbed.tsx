// @ts-nocheck
import React, { useState } from 'react'

export interface FigmaEmbedProps {
  /** Full Figma file or frame URL (can include node-id, mode, etc.) */
  url: string
  /** Container className for sizing/styling */
  className?: string
  /** Container width (default: 100%) */
  width?: number | string
  /** Container height (default: 800) */
  height?: number | string
  /** Additional container styles */
  style?: React.CSSProperties
  /** Allow fullscreen (default: true) */
  allowFullscreen?: boolean
  /** Accessible title for the iframe (default: "Figma embed") */
  title?: string
}

/**
 * Renders a responsive Figma embed iframe for a given file or frame URL.
 */
export function FigmaEmbed(props: FigmaEmbedProps) {
  const {
    url,
    className,
    width = '100%',
    height = 800,
    style,
    allowFullscreen = true,
    title = 'Figma embed',
  } = props

  const embedSrc = `https://www.figma.com/embed?embed_host=app&url=${encodeURIComponent(url)}`

  return (
    <div className={className} style={{ width, height, position: 'relative', ...(style as any) }}>
      <iframe
        title={title}
        style={{ border: '1px solid rgba(0,0,0,0.1)', width: '100%', height: '100%' }}
        src={embedSrc}
        allowFullScreen={allowFullscreen}
        loading="lazy"
      />
    </div>
  )
}

