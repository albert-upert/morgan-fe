interface IconProps {
  className?: string;
  color?: string;
}

export function SearchIcon({
  className = "h-5 w-5",
  color = "currentColor",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.25942 15.1851C12.5322 15.1851 15.1853 12.532 15.1853 9.25918C15.1853 5.98638 12.5322 3.33325 9.25942 3.33325C5.98662 3.33325 3.3335 5.98638 3.3335 9.25918C3.3335 12.532 5.98662 15.1851 9.25942 15.1851Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6666 16.6664L13.4444 13.4442"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
