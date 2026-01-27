interface IconProps {
  className?: string;
  color?: string;
}

export function CurriculumIcon({
  className = "h-8 w-8",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 18"
      fill="none"
      className={className}
    >
      <path
        d="M0.75 13H4.11842"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0.75 5H4.11842"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12.75 1L12.75 17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0.75 9H4.11842"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="2.34229"
        y="0.75"
        width="13.6579"
        height="16.5"
        rx="3.25"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
