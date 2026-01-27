interface IconProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

export function CheckIcon({
  className = "h-5 w-5",
  color = "currentColor",
  strokeWidth = 2,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 10L8 14L16 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
