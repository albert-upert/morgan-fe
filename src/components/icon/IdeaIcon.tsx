interface IconProps {
  className?: string;
  color?: string;
}

export function IdeaIcon({
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
        d="M16 4C12.134 4 9 7.134 9 11C9 13.395 10.255 15.508 12.125 16.719C12.6813 17.0938 13 17.7188 13 18.375V21C13 21.5523 13.4477 22 14 22H18C18.5523 22 19 21.5523 19 21V18.375C19 17.7188 19.3187 17.0938 19.875 16.719C21.745 15.508 23 13.395 23 11C23 7.134 19.866 4 16 4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 22V24C13 25.1046 13.8954 26 15 26H17C18.1046 26 19 25.1046 19 24V22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 28H19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
