interface IconProps {
  className?: string;
  color?: string;
}

export function PlusIcon({
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
      <path d="M16 6V26" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M6 16H26" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
