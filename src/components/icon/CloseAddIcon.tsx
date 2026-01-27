interface IconProps {
  className?: string;
  color?: string;
}

export function CloseAddIcon({
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
      <path d="M16 8V24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 16H24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
