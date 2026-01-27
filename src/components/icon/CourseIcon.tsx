interface IconProps {
  className?: string;
  color?: string;
}

export function CourseIcon({
  className = "h-8 w-8",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 16"
      fill="none"
      className={className}
    >
      <path
        d="M12 11H14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 5H14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 1L9 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 8H14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="17.25"
        y="0.75"
        width="14.5"
        height="16.5"
        rx="3.25"
        transform="rotate(90 17.25 0.75)"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
