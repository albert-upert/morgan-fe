interface IconProps {
  className?: string;
  color?: string;
}

export function ShoppingCartIcon({
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
        d="M4 4H6L8 20H24L28 8H10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="26" r="2" stroke={color} strokeWidth="2" />
      <circle cx="22" cy="26" r="2" stroke={color} strokeWidth="2" />
    </svg>
  );
}
