interface IconProps {
  className?: string;
  color?: string;
  dotColor?: string;
}

export function NotificationActiveIcon({
  className = "h-8 w-8",
  color = "currentColor",
  dotColor = "#EF4444",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 6C12.134 6 9 9.13401 9 13V18L7 22H25L23 18V13C23 9.13401 19.866 6 16 6Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13 22V23C13 24.6569 14.3431 26 16 26C17.6569 26 19 24.6569 19 23V22"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="22" cy="10" r="4" fill={dotColor} />
    </svg>
  );
}
