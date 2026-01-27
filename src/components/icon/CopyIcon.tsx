interface IconProps {
  className?: string;
  color?: string;
}

export function CopyIcon({
  className = "h-6 w-6",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23 23"
      fill="none"
      className={className}
    >
      <path
        d="M15.6833 12.3761V16.8561C15.6833 20.5894 14.19 22.0827 10.4567 22.0827H5.97667C2.24333 22.0827 0.75 20.5894 0.75 16.8561V12.3761C0.75 8.64275 2.24333 7.14941 5.97667 7.14941H10.4567C14.19 7.14941 15.6833 8.64275 15.6833 12.3761Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.0827 5.97667V10.4567C22.0827 14.19 20.5894 15.6833 16.8561 15.6833H15.6827V12.3767C15.6827 8.64333 14.1894 7.15 10.4561 7.15H7.14941V5.97667C7.14941 2.24333 8.64275 0.75 12.3761 0.75H16.8561C20.5894 0.75 22.0827 2.24333 22.0827 5.97667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
