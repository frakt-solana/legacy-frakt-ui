import React from 'react';

const icon = (
  <g stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd">
    <path d="M1.388 7h40.269" strokeLinecap="square"></path>
    <path d="M37 1l6 6-6 6"></path>
  </g>
);

export const ArrowRightIcon = ({
  className,
  fill,
  stroke,
}: any): JSX.Element => (
  <svg
    className={className || ''}
    fill={fill || '#FFFFFF'}
    stroke={stroke || 'none'}
    viewBox="0 0 45 14"
  >
    {icon}
  </svg>
);

export default ArrowRightIcon;
