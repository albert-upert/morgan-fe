interface IconProps {
  className?: string;
  color?: string;
}

export function FlagIcon({
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
      <path d="M6 28V5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6 5C6 5 8 3 12 3C16 3 16 5 20 5C24 5 26 3 26 3V17C26 17 24 19 20 19C16 19 16 17 12 17C8 17 6 19 6 19V5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
