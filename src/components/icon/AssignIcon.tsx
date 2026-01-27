interface IconProps {
  className?: string;
  color?: string;
}

export function AssignIcon({
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
      <rect
        x="6"
        y="4"
        width="20"
        height="24"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M11 4V8H21V4"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M11 14H21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 19H17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
