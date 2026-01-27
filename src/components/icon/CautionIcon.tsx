interface IconProps {
  className?: string;
  color?: string;
}

export function CautionIcon({
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
        d="M14.2679 5.46447C15.0377 4.69464 16.2623 4.69464 17.0321 5.46447L26.5355 14.9679C27.3053 15.7377 27.3053 16.9623 26.5355 17.7321L17.0321 27.2355C16.2623 28.0054 15.0377 28.0054 14.2679 27.2355L4.76447 17.7321C3.99464 16.9623 3.99464 15.7377 4.76447 14.9679L14.2679 5.46447Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 11V17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="21" r="1" fill={color} />
    </svg>
  );
}
