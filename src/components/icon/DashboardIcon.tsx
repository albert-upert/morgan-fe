interface IconProps {
  className?: string;
  color?: string;
}

export function DashboardIcon({
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
        d="M12 4H6C4.89543 4 4 4.89543 4 6V12C4 13.1046 4.89543 14 6 14H12C13.1046 14 14 13.1046 14 12V6C14 4.89543 13.1046 4 12 4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 4H20C18.8954 4 18 4.89543 18 6V12C18 13.1046 18.8954 14 20 14H26C27.1046 14 28 13.1046 28 12V6C28 4.89543 27.1046 4 26 4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18H6C4.89543 18 4 18.8954 4 20V26C4 27.1046 4.89543 28 6 28H12C13.1046 28 14 27.1046 14 26V20C14 18.8954 13.1046 18 12 18Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 18H20C18.8954 18 18 18.8954 18 20V26C18 27.1046 18.8954 28 20 28H26C27.1046 28 28 27.1046 28 26V20C28 18.8954 27.1046 18 26 18Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
