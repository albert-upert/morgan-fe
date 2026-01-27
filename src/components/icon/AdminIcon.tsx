interface IconProps {
  className?: string;
  color?: string;
}

export function AdminIcon({
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
        d="M19.1596 14.045L14.045 19.1596C12.9245 20.2801 11.0835 20.2801 9.95498 19.1596L4.84042 14.045C3.71986 12.9245 3.71986 11.0835 4.84042 9.95498L9.95498 4.84042C11.0755 3.71986 12.9165 3.71986 14.045 4.84042L19.1596 9.95498C20.2801 11.0835 20.2801 12.9245 19.1596 14.045Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.39392 7.40173L16.5985 16.6063"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5985 7.40173L7.39392 16.6063"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
