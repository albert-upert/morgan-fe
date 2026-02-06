interface IconProps {
  className?: string;
  color?: string;
}

export function GalleryIcon({
  className = "h-6 w-6",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 3h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 14l2.5-2.5a1.2 1.2 0 0 1 1.7 0L16 15.3l1-1a1.2 1.2 0 0 1 1.7 0"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
