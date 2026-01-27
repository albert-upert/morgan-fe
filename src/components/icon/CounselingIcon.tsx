interface IconProps {
  className?: string;
  color?: string;
}

export function CounselingIcon({
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
      <circle cx="10" cy="10" r="4" stroke={color} strokeWidth="2" />
      <circle cx="22" cy="10" r="4" stroke={color} strokeWidth="2" />
      <path
        d="M4 24C4 20.6863 6.68629 18 10 18C11.5 18 12.87 18.5 14 19.3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 19.3C19.13 18.5 20.5 18 22 18C25.3137 18 28 20.6863 28 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 16V26"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 22H20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
