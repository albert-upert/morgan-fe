interface IconProps {
  className?: string;
  color?: string;
}

export function InternshipIcon({
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
        d="M26 10H6C4.89543 10 4 10.8954 4 12V26C4 27.1046 4.89543 28 6 28H26C27.1046 28 28 27.1046 28 26V12C28 10.8954 27.1046 10 26 10Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 10V8C20 6.89543 19.1046 6 18 6H14C12.8954 6 12 6.89543 12 8V10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 19C17.1046 19 18 18.1046 18 17C18 15.8954 17.1046 15 16 15C14.8954 15 14 15.8954 14 17C14 18.1046 14.8954 19 16 19Z"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}
