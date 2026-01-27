interface IconProps {
  className?: string;
  color?: string;
}

export function NotificationIcon({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.66757 17.9063V17.6727C6.70184 16.9816 6.92333 16.312 7.3092 15.7329C7.95149 15.0373 8.39117 14.1849 8.58212 13.265C8.58212 12.5541 8.58211 11.8331 8.64421 11.1222C8.96502 7.69964 12.3491 5.33333 15.6918 5.33333H15.7746C19.1173 5.33333 22.5014 7.69964 22.8326 11.1222C22.8947 11.8331 22.8326 12.5541 22.8843 13.265C23.0778 14.187 23.5171 15.0421 24.1572 15.7431C24.546 16.317 24.7678 16.9842 24.7988 17.6727V17.8961C24.8219 18.8246 24.5022 19.7299 23.8985 20.4452C23.1008 21.2816 22.0183 21.8019 20.8559 21.9077C17.4475 22.2733 14.0086 22.2733 10.6002 21.9077C9.43911 21.7973 8.35816 21.2778 7.55757 20.4452C6.96322 19.7294 6.64774 18.8294 6.66757 17.9063Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.1259 25.4412C13.6584 26.1097 14.4405 26.5423 15.299 26.6433C16.1575 26.7443 17.0216 26.5054 17.7001 25.9795C17.9088 25.8239 18.0965 25.6431 18.2589 25.4412"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
