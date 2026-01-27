interface IconProps {
  className?: string;
  color?: string;
}

export function PencilIcon({
  className = "h-6 w-6",
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
        d="M21.4719 6.2248C21.7545 5.94222 22.09 5.71807 22.4592 5.56514C22.8284 5.41221 23.2241 5.3335 23.6237 5.3335C24.0234 5.3335 24.4191 5.41221 24.7883 5.56514C25.1575 5.71807 25.493 5.94222 25.7755 6.2248C26.0581 6.50738 26.2823 6.84284 26.4352 7.21205C26.5881 7.58125 26.6668 7.97697 26.6668 8.37659C26.6668 8.77622 26.5881 9.17193 26.4352 9.54113C26.2823 9.91034 26.0581 10.2458 25.7755 10.5284L11.2509 25.053L5.3335 26.6668L6.94734 20.7494L21.4719 6.2248Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.3696 10.6211L21.1969 7.44833"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
