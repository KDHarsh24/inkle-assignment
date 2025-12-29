export default function getUniqueValues(data, key) {
  if (!Array.isArray(data)) return []
  const seen = new Set()
  const out = []

  for (const item of data) {
    const raw = item?.[key]
    if (raw == null) continue
    const v = String(raw).trim().toLowerCase()
    if (seen.has(v)) continue
    seen.add(v)
    // return values in Title Case for display
    out.push(v.charAt(0).toUpperCase() + v.slice(1))
  }

  return out.sort((a, b) => a.localeCompare(b))
}
