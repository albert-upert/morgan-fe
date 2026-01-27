interface IconProps {
  className?: string;
  color?: string;
}

export function BillIcon({
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
        d="M19.9997 7.10932V8.99052C19.9997 10.2188 19.1996 10.9961 17.9356 10.9961H15.1996V5.56237C15.1996 4.6995 15.9276 3.99988 16.8156 3.99988C17.6876 4.00765 18.4876 4.34969 19.0636 4.90939C19.6396 5.47686 19.9997 6.25422 19.9997 7.10932Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 7.8868V18.7698C4 19.415 4.75201 19.7804 5.28002 19.3917L6.64804 18.3967C6.96804 18.1635 7.41605 18.1946 7.70405 18.4744L9.03207 19.7726C9.34408 20.0758 9.85608 20.0758 10.1681 19.7726L11.5121 18.4667C11.7921 18.1946 12.2401 18.1635 12.5521 18.3967L13.9201 19.3917C14.4481 19.7726 15.2002 19.4073 15.2002 18.7698V5.55472C15.2002 4.69962 15.9202 4 16.8002 4H8.00006H7.20005C4.80001 4 4 5.39147 4 7.10944V7.8868Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.59998 12.5585H12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.59998 9.4491H12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.19617 12.5507H7.20315"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.19617 9.44128H7.20315"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
