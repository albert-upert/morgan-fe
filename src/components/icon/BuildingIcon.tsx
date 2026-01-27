interface IconProps {
  className?: string;
  color?: string;
}

export function BuildingIcon({
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
        d="M4 28H28"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 28V8L12 4V28"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12H28V28H12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10V10.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 14V14.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 18V18.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 22V22.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 16H17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M23 16H24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 20H17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M23 20H24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 28V24H22V28"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
