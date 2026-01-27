interface IconProps {
  className?: string;
  color?: string;
}

export function PackageIcon({
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
      <path
        d="M4 10L16 4L28 10V22L16 28L4 22V10Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M16 16V28" stroke={color} strokeWidth="2" />
      <path d="M4 10L16 16L28 10" stroke={color} strokeWidth="2" />
      <path d="M10 7L22 13" stroke={color} strokeWidth="2" />
    </svg>
  );
}
