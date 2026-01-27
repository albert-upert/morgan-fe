interface IconProps {
  className?: string;
  color?: string;
}

export function MoreCircleIcon({
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
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" />
      <circle cx="11" cy="16" r="1.5" fill={color} />
      <circle cx="16" cy="16" r="1.5" fill={color} />
      <circle cx="21" cy="16" r="1.5" fill={color} />
    </svg>
  );
}
