interface IconProps {
  className?: string;
  color?: string;
}

export function FileIcon({
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
        d="M20 11.1V10.2C20 6.80588 20 5.10883 18.8973 4.05441C17.7947 3 16.02 3 12.4706 3H11.5294C7.98002 3 6.20532 3 5.10266 4.05441C4 5.10883 4 6.80588 4 10.2V13.8C4 17.1941 4 18.8912 5.10266 19.9456C6.20532 21 7.98001 21 11.5294 21H12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.44421 7.44434H15.5553"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.44421 11.8887H12.8887"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.9999 19.8162V16.625C19.9999 15.3743 18.6568 14 16.9999 14C15.343 14 13.9999 15.3743 13.9999 16.625V19.6875C13.9999 20.3697 14.7325 21 15.6363 21C16.54 21 17.2726 20.3697 17.2726 19.6875V17.2941"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
