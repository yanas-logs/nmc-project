import { ReactNode } from "react";

export default function RatingStar({
  rating,
  children,
}: {
  rating: number;
  children: ReactNode;
}) {
  const StarRegular = (
    <span aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M9.104 2.9a1 1 0 0 1 1.794 0l1.93 3.91l4.317.628a1 1 0 0 1 .554 1.706l-3.124 3.044l.738 4.3a1 1 0 0 1-1.451 1.054l-3.86-2.03l-3.862 2.03a1 1 0 0 1-1.45-1.055l.737-4.299l-3.124-3.044a1 1 0 0 1 .554-1.706l4.317-.627l1.93-3.912Zm.897.442l-1.93 3.911a1 1 0 0 1-.753.547L3 8.428l3.124 3.044a1 1 0 0 1 .287.885l-.737 4.3l3.86-2.03a1 1 0 0 1 .931 0l3.861 2.03l-.737-4.3a1 1 0 0 1 .287-.885L17 8.428L12.683 7.8a1 1 0 0 1-.752-.547l-1.93-3.911Z"
        />
      </svg>
    </span>
  );
  const FillStar = (
    <span aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M9.104 2.9a1 1 0 0 1 1.794 0l1.93 3.91l4.317.628a1 1 0 0 1 .554 1.706l-3.124 3.044l.738 4.3a1 1 0 0 1-1.451 1.054l-3.86-2.03l-3.862 2.03a1 1 0 0 1-1.45-1.055l.737-4.299l-3.124-3.044a1 1 0 0 1 .554-1.706l4.317-.627l1.93-3.912Z"
        />
      </svg>
    </span>
  );
  const HalfStar = (
    <span aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          d="M9.104 2.9a.988.988 0 0 1 .898-.558a.99.99 0 0 1 .896.557l1.93 3.912l4.317.627a1 1 0 0 1 .554 1.706l-3.124 3.044l.738 4.3a1 1 0 0 1-1.451 1.054l-3.86-2.03l-3.862 2.03a1 1 0 0 1-1.45-1.055l.737-4.299l-3.124-3.044a1 1 0 0 1 .554-1.706l4.317-.627l1.93-3.912Zm.898 11.612a1 1 0 0 1 .464.115l3.861 2.03l-.737-4.3a1 1 0 0 1 .287-.885l3.124-3.044l-4.317-.628a1 1 0 0 1-.752-.547l-1.93-3.91v11.169Z"
        />
      </svg>
    </span>
  );
  return (
    <span className="flex items-center gap-4 text-sm rounded text-slate-500">
      <span
        className="flex gap-1 text-amber-400"
        role="img"
        aria-label="Rating: 4 out of 5 stars"
      >
        {rating >= 1 ? FillStar : rating >= 0.5 ? HalfStar : StarRegular}
        {rating >= 2 ? FillStar : rating >= 1.5 ? HalfStar : StarRegular}
        {rating >= 3 ? FillStar : rating >= 2.5 ? HalfStar : StarRegular}
        {rating >= 4 ? FillStar : rating >= 3.5 ? HalfStar : StarRegular}
        {rating >= 5 ? FillStar : rating >= 4.5 ? HalfStar : StarRegular}
      </span>
      <span>{children}</span>
    </span>
  );
}
