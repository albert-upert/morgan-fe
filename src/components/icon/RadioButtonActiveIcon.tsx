interface IconProps {
  className?: string;
  color?: string;
}

export function RadioButtonActiveIcon({
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
      <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="2" />
      <circle cx="16" cy="16" r="5" fill={color} />
    </svg>
  );
}
