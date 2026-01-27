interface IconProps {
  className?: string;
  color?: string;
}

export function ProfileIcon({
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
        d="M7.86206 14.7853C6.73024 15.4592 3.76269 16.8353 5.57013 18.5573C6.45305 19.3984 7.43639 20 8.6727 20H15.7273C16.9636 20 17.947 19.3984 18.8298 18.5573C20.6373 16.8353 17.6698 15.4592 16.5379 14.7853C13.8838 13.2049 10.5162 13.2049 7.86206 14.7853Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7996 7.6C15.7996 9.58822 14.1878 11.2 12.1996 11.2C10.2114 11.2 8.59961 9.58822 8.59961 7.6C8.59961 5.61178 10.2114 4 12.1996 4C14.1878 4 15.7996 5.61178 15.7996 7.6Z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
