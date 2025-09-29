export const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes)) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  let n = bytes
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024
    i++
  }
  return `${n.toFixed(1)} ${units[i]}`
}

export const formatSpeed = (bps?: number) => {
  if (!bps || bps <= 0) return '-'
  return `${formatBytes(bps)}/s`
}

export const formatEta = (sec?: number | null) => {
  if (!sec && sec !== 0) return '-'
  const s = Math.max(0, sec)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const r = Math.floor(s % 60)
  if (h > 0) return `${h}h ${m}m ${r}s`
  if (m > 0) return `${m}m ${r}s`
  return `${r}s`
}
