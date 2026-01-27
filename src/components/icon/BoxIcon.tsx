interface IconProps {
  className?: string;
  color?: string;
}

export function BoxIcon({
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
        d="M26 10.6667L16 16L6 10.6667"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 28V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.3333 21.3333V10.6667C27.3328 10.2638 27.2347 9.86753 27.0483 9.51413C26.8618 9.16073 26.5931 8.86169 26.2667 8.64L17.7333 3.30667C17.4067 3.08491 17.0301 2.96826 16.6458 2.96826C16.2616 2.96826 15.885 3.08491 15.5583 3.30667L7.025 8.64C6.6986 8.86169 6.42991 9.16073 6.24345 9.51413C6.057 9.86753 5.95891 10.2638 5.95834 10.6667V21.3333C5.95891 21.7362 6.057 22.1325 6.24345 22.4859C6.42991 22.8393 6.6986 23.1383 7.025 23.36L15.5583 28.6933C15.885 28.9151 16.2616 29.0317 16.6458 29.0317C17.0301 29.0317 17.4067 28.9151 17.7333 28.6933L26.2667 23.36C26.5931 23.1383 26.8618 22.8393 27.0483 22.4859C27.2347 22.1325 27.3328 21.7362 27.3333 21.3333Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
