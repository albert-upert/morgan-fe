/**
 * Ticket IDs in UI often include a `#` prefix; route params must be the bare id
 * (e.g. `FM-2025-0103`). Also fixes bad links like `/ticket/%23FM-...`.
 */
export function normalizeTicketRouteId(
  raw: string | undefined
): string | undefined {
  if (raw == null || raw === "") return undefined;
  let s = raw;
  try {
    s = decodeURIComponent(s);
  } catch {
    /* keep s */
  }
  return s.startsWith("#") ? s.slice(1) : s;
}
