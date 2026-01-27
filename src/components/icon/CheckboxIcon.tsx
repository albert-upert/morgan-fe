interface IconProps {
  className?: string;
  color?: string;
  checked?: boolean;
}

export function CheckboxIcon({
  className = "h-8 w-8",
  color = "currentColor",
  checked = false,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="6"
        y="6"
        width="20"
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      {checked && (
        <path
          d="M10 16L14 20L22 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
