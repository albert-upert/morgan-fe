interface IconProps {
  className?: string;
  color?: string;
}

export function LockIcon({
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
        d="M17.7998 11.1996H6.59976C5.7161 11.1996 4.99976 11.9159 4.99976 12.7996V18.3996C4.99976 19.2832 5.7161 19.9996 6.59976 19.9996H17.7998C18.6834 19.9996 19.3998 19.2832 19.3998 18.3996V12.7996C19.3998 11.9159 18.6834 11.1996 17.7998 11.1996Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.19995 11.1999V7.99988C8.19995 6.93901 8.62138 5.9216 9.37152 5.17145C10.1217 4.42131 11.1391 3.99988 12.2 3.99988C13.2608 3.99988 14.2782 4.42131 15.0284 5.17145C15.7785 5.9216 16.2 6.93901 16.2 7.99988V11.1999"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
