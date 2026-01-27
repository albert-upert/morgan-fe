interface IconProps {
  className?: string;
  color?: string;
}

export function SyncIcon({
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
        d="M4 16C4 9.37258 9.37258 4 16 4C19.7135 4 23.0087 5.77173 25.1066 8.5M28 16C28 22.6274 22.6274 28 16 28C12.2865 28 8.99127 26.2283 6.89341 23.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 8.5H25.1066V3.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 23.5H6.89341V28.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
