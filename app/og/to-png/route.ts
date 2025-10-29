import sharp from 'sharp'
export const runtime = 'nodejs'

export async function GET(req: Request) {
  let url = new URL(req.url).searchParams.get('u')
  if (!url) return new Response('Missing ?u=', { status: 400 })
  if (!url?.startsWith('https'))
    url = new URL(url, process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL!).toString()

  const webp = await fetch(url).then(r => r.arrayBuffer())
  const pngBuf = await sharp(Buffer.from(webp)).png().toBuffer()

  const body = new Uint8Array(pngBuf)

  return new Response(body, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  })
}
