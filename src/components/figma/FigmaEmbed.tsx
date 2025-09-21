/** @jsxImportSource react */
// Avoid importing React types to keep lints simple in this setup

type FigmaEmbedProps = {
  url: string
  title?: string
  className?: string
  style?: Record<string, unknown>
}

/**
 * Lightweight iframe wrapper to embed public Figma files/frames.
 * Accepts a Figma share URL or embed URL. If a regular share URL is provided,
 * it will be converted to an embed URL automatically.
 */
export function FigmaEmbed(props: FigmaEmbedProps) {
  const { url, title = 'Figma Embed', className, style } = props

  let embedUrl = url
  try {
    const u = new URL(url)
    if (!(u.hostname.includes('www.figma.com') && u.pathname.startsWith('/embed'))) {
      const embed = new URL('https://www.figma.com/embed')
      embed.searchParams.set('embed_host', 'figma-embed')
      embed.searchParams.set('url', url)
      embedUrl = embed.toString()
    }
  } catch {
    embedUrl = url
  }

  return (
    <div className={className} style={style}>
      <iframe
        title={title}
        src={embedUrl}
        style={{ border: '1px solid rgba(0,0,0,0.1)', width: '100%', height: '100%' }}
        allowFullScreen
      />
    </div>
  )
}

export default FigmaEmbed

