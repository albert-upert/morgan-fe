interface IconProps {
  className?: string;
  color?: string;
}

export function LanguageCenterIcon({
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
      <path d="M4 16H28" stroke={color} strokeWidth="2" />
      <path d="M16 4C12 8 12 24 16 28" stroke={color} strokeWidth="2" />
      <path d="M16 4C20 8 20 24 16 28" stroke={color} strokeWidth="2" />
      <path d="M6 10H26" stroke={color} strokeWidth="2" />
      <path d="M6 22H26" stroke={color} strokeWidth="2" />
    </svg>
  );
}
