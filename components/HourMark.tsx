import type { Moment } from "@/lib/blends";

// The hour, as the sun's place over a horizon. A sign, not a decoration: low left for morning,
// high for midday, low right and a crescent for evening.
const SUN: Record<Moment, [number, number]> = { morning: [7, 11], midday: [16, 3.5], evening: [25, 11] };

export default function HourMark({ moment, size = 28 }: { moment: Moment; size?: number }) {
  const [cx, cy] = SUN[moment];
  return (
    <svg width={size} height={(size * 16) / 32} viewBox="0 0 32 16" fill="none" aria-hidden className="shrink-0">
      <path d="M3 14.5 A13 13 0 0 1 29 14.5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.2 1.6" />
      <line x1="0.5" y1="14.5" x2="31.5" y2="14.5" stroke="currentColor" strokeWidth="0.9" />
      {moment === "evening" ? (
        <path d={`M${cx + 2.2} ${cy - 2.4} a2.6 2.6 0 1 0 0 4.8 a2 2 0 1 1 0 -4.8z`} fill="currentColor" />
      ) : (
        <circle cx={cx} cy={cy} r="2.4" fill="currentColor" />
      )}
    </svg>
  );
}
