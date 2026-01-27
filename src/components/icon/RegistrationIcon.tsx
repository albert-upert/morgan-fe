interface IconProps {
  className?: string;
  color?: string;
}

export function RegistrationIcon({
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
        d="M25 4H7C5.34315 4 4 5.34315 4 7V25C4 26.6569 5.34315 28 7 28H25C26.6569 28 28 26.6569 28 25V7C28 5.34315 26.6569 4 25 4Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 19C18.2091 19 20 17.2091 20 15C20 12.7909 18.2091 11 16 11C13.7909 11 12 12.7909 12 15C12 17.2091 13.7909 19 16 19Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 27V25C9 23.9391 9.42143 22.9217 10.1716 22.1716C10.9217 21.4214 11.9391 21 13 21H19C20.0609 21 21.0783 21.4214 21.8284 22.1716C22.5786 22.9217 23 23.9391 23 25V27"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
