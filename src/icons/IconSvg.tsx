import React from 'react';

const IconSvg = React.memo(
  ({ className, icon, size, fill, stroke, ...props }: any) => {
    return (
      <svg
        className={className || ''}
        style={{ width: size, height: size }}
        fill={fill || '#FFFFFF'}
        stroke={stroke || 'none'}
        {...props}
      >
        {icon}
      </svg>
    );
  },
);

IconSvg.displayName = 'IconSvg';

export default IconSvg;
