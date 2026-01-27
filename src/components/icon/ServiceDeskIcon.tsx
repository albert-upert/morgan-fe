interface IconProps {
  className?: string;
  color?: string;
}

export function ServiceDeskIcon({
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
      <path d="M6 24H26" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M8 24V16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16V24"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="16" cy="6" r="2" stroke={color} strokeWidth="2" />
      <path
        d="M10 28H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
