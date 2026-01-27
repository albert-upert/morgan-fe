interface IconProps {
  className?: string;
  color?: string;
}

export function AlertIcon({
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
        d="M14.5412 4.72902L9.21894 7.28381C8.80933 7.48043 8.37167 7.52969 7.92552 7.42974C7.63354 7.36433 7.48753 7.33163 7.36996 7.3182C5.91007 7.15149 5.00012 8.30693 5.00012 9.63561V10.3648C5.00012 11.6935 5.91007 12.8489 7.36996 12.6822C7.48753 12.6688 7.63355 12.636 7.92552 12.5707C8.37167 12.4707 8.80933 12.52 9.21894 12.7166L14.5412 15.2714C15.7628 15.8579 16.3737 16.1511 17.0548 15.9225C17.7359 15.694 17.9696 15.2035 18.4372 14.2226C19.7211 11.5292 19.7211 8.47127 18.4372 5.77776C17.9696 4.79688 17.7359 4.30644 17.0548 4.07787C16.3737 3.84931 15.7628 4.14255 14.5412 4.72902Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7668 19.0168L10.5737 20C7.88444 17.8672 8.21299 16.85 8.21299 12.8H9.12005C9.48815 15.0888 10.3564 16.1728 11.5545 16.9576C12.2925 17.441 12.4446 18.458 11.7668 19.0168Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.60022 12.3999V7.59985"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
