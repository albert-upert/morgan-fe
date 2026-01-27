interface IconProps {
  className?: string;
  color?: string;
}

export function PawPrintIcon({
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
      <ellipse cx="16" cy="20" rx="6" ry="5" stroke={color} strokeWidth="2" />
      <circle cx="9" cy="12" r="3" stroke={color} strokeWidth="2" />
      <circle cx="23" cy="12" r="3" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="7" r="2" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="7" r="2" stroke={color} strokeWidth="2" />
    </svg>
  );
}
