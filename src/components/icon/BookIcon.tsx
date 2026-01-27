interface IconProps {
  className?: string;
  color?: string;
}

export function BookIcon({
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
        d="M20 16.0643V5.72048C20 4.69209 19.216 3.92938 18.264 4.01508H18.216C16.536 4.16933 13.984 5.08631 12.56 6.04613L12.424 6.1404C12.192 6.29466 11.808 6.29466 11.576 6.1404L11.376 6.01185C9.952 5.0606 7.408 4.15219 5.728 4.00651C4.776 3.92081 4 4.69209 4 5.71191V16.0643C4 16.887 4.624 17.6583 5.392 17.7611L5.624 17.7954C7.36 18.0439 10.04 18.9866 11.576 19.8865L11.608 19.9036C11.824 20.0321 12.168 20.0321 12.376 19.9036C13.912 18.9952 16.6 18.0439 18.344 17.7954L18.608 17.7611C19.376 17.6583 20 16.887 20 16.0643Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9999 6.42322V19.278"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.60017 8.99353H6.80017"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.20017 11.5648H6.80017"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
