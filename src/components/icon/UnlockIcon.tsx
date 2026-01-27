interface IconProps {
  className?: string;
  color?: string;
}

export function UnlockIcon({
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
        x="7"
        y="14"
        width="18"
        height="14"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M11 14V10C11 7.23858 13.2386 5 16 5C18.7614 5 21 7.23858 21 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="21" r="2" fill={color} />
    </svg>
  );
}
