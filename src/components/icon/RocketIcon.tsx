interface IconProps {
  className?: string;
  color?: string;
}

export function RocketIcon({
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
        d="M10 18L4 28L14 22L10 18Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 18C10 18 6 14 6 9C6 4 10 4 16 4C22 4 26 4 26 9C26 14 22 18 22 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 22L22 18L10 18L14 22Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="11" r="2" stroke={color} strokeWidth="2" />
    </svg>
  );
}
