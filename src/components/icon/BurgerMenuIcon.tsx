interface IconProps {
  className?: string;
  color?: string;
}

export function BurgerMenuIcon({
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
      <path d="M5 8H27" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 16H27" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 24H27" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
