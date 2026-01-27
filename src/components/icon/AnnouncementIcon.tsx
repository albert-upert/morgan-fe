interface IconProps {
  className?: string;
  color?: string;
}

export function AnnouncementIcon({
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
        d="M22 12C22 12 24 14 24 17C24 20 22 22 22 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 14V20C6 21.1046 6.89543 22 8 22H10L18 28V8L10 14H8C6.89543 14 6 14.8954 6 16V14Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
