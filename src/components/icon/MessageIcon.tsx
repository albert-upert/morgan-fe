interface IconProps {
  className?: string;
  color?: string;
}

export function MessageIcon({
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
        d="M9.20044 10.7499H14.8004"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.00024 17.3828H11.2002L14.7603 19.8586C15.2883 20.2267 16.0002 19.8335 16.0002 19.1644V17.3828C18.4002 17.3828 20.0002 15.7099 20.0002 13.2006V8.18203C20.0002 5.67274 18.4002 3.99988 16.0002 3.99988H8.00024C5.60024 3.99988 4.00024 5.67274 4.00024 8.18203V13.2006C4.00024 15.7099 5.60024 17.3828 8.00024 17.3828Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
