interface IconProps {
  className?: string;
  color?: string;
}

export function CloseIcon({
  className = "h-5 w-5",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
