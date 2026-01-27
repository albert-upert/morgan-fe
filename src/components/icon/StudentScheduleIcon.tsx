interface IconProps {
  className?: string;
  color?: string;
}

export function StudentScheduleIcon({
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
        x="5"
        y="6"
        width="22"
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <path d="M5 12H27" stroke={color} strokeWidth="2" />
      <path d="M10 4V8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M22 4V8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="18" r="3" stroke={color} strokeWidth="2" />
      <path
        d="M16 17V18.5L17 19.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
