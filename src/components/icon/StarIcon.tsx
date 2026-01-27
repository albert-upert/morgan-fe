interface IconProps {
  className?: string;
  color?: string;
  filled?: boolean;
}

export function StarIcon({
  className = "h-8 w-8",
  color = "currentColor",
  filled = false,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill={filled ? color : "none"}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 3L19.708 11.164L28.458 12.272L22.229 18.236L23.813 26.928L16 22.736L8.187 26.928L9.771 18.236L3.542 12.272L12.292 11.164L16 3Z"
        stroke={filled ? "none" : color}
        fill={filled ? color : "none"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
