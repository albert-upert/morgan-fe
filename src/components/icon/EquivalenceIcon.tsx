interface IconProps {
  className?: string;
  color?: string;
}

export function EquivalenceIcon({
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
        width="10"
        height="10"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <rect
        x="18"
        y="16"
        width="10"
        height="10"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M14 11H18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 21H18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M9 20V26" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M23 6V12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
