interface IconProps {
  className?: string;
  color?: string;
}

export function GuardianshipIcon({
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
      <circle cx="12" cy="10" r="4" stroke={color} strokeWidth="2" />
      <circle cx="22" cy="12" r="3" stroke={color} strokeWidth="2" />
      <path
        d="M4 26C4 21.5817 7.58172 18 12 18C16.4183 18 20 21.5817 20 26"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 22C20 19.2386 22.2386 17 25 17C27.7614 17 30 19.2386 30 22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
