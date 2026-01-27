interface IconProps {
  className?: string;
  color?: string;
}

export function ComplaintIcon({
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
        d="M15.2 4H8.8C5.6 4 4 5.6 4 8.8V19.2C4 19.64 4.36 20 4.8 20H15.2C18.4 20 20 18.4 20 15.2V8.8C20 5.6 18.4 4 15.2 4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7276 8.6719L8.57561 12.8239C8.41561 12.9839 8.26362 13.2959 8.23162 13.5199L8.00762 15.1039C7.92762 15.6799 8.32762 16.0799 8.90362 15.9999L10.4876 15.7759C10.7116 15.7439 11.0236 15.5919 11.1836 15.4319L15.3356 11.2799C16.0476 10.5679 16.3916 9.7359 15.3356 8.6799C14.2796 7.6159 13.4476 7.9519 12.7276 8.6719Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1355 9.26416C12.4875 10.5202 13.4715 11.5122 14.7355 11.8642"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
