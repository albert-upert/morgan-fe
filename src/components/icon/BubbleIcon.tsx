interface IconProps {
  className?: string;
  color?: string;
}

export function BubbleIcon({
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
        d="M14.8483 12.2079C17.1149 12.2079 18.9523 10.3705 18.9523 8.10391C18.9523 5.83732 17.1149 3.99988 14.8483 3.99988C12.5817 3.99988 10.7443 5.83732 10.7443 8.10391C10.7443 10.3705 12.5817 12.2079 14.8483 12.2079Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M7.46413 17.9518C8.82496 17.9518 9.92815 16.8487 9.92815 15.4878C9.92815 14.127 8.82496 13.0238 7.46413 13.0238C6.10329 13.0238 5.00012 14.127 5.00012 15.4878C5.00012 16.8487 6.10329 17.9518 7.46413 17.9518Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M15.6726 19.9997C16.8037 19.9997 17.7207 19.0828 17.7207 17.9517C17.7207 16.8206 16.8037 15.9037 15.6726 15.9037C14.5416 15.9037 13.6246 16.8206 13.6246 17.9517C13.6246 19.0828 14.5416 19.9997 15.6726 19.9997Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
