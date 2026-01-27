interface IconProps {
  className?: string;
  color?: string;
}

export function GladiIcon({
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
        x="6"
        y="12"
        width="14"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M10 12V10C10 7.79086 11.7909 6 14 6H22C24.2091 6 26 7.79086 26 10V20C26 22.2091 24.2091 24 22 24H20"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="13" cy="17" r="2" stroke={color} strokeWidth="2" />
      <path
        d="M13 19V24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
