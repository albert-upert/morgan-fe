interface IconProps {
  className?: string;
  color?: string;
}

export function CalendarIcon({
  className = "h-8 w-8",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="4"
        y="6"
        width="24"
        height="22"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <path d="M4 12H28" stroke={color} strokeWidth="2" />
      <path d="M10 4V8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M22 4V8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
