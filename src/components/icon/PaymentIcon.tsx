interface IconProps {
  className?: string;
  color?: string;
}

export function PaymentIcon({
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
      <path d="M4 12H28" stroke={color} strokeWidth="2" />
      <path d="M4 16H28" stroke={color} strokeWidth="2" />
      <path d="M8 21H12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M16 21H18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
