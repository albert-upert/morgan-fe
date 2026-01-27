interface IconProps {
  className?: string;
  color?: string;
}

export function StudentProfileIcon({
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
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="12" cy="14" r="3" stroke={color} strokeWidth="2" />
      <path
        d="M7 22C7 19.7909 8.79086 18 11 18H13C15.2091 18 17 19.7909 17 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 12H26"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 16H26"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
