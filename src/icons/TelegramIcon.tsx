import React from 'react';

import IconSvg from './IconSvg';

const icon = (
  <>
    <g clipPath="url(#clip0)">
      <path d="M21.4978 11.3487L14.3711 17.9731C14.1207 18.2058 13.9589 18.5183 13.9132 18.8571L13.6707 20.6559C13.6383 20.8959 13.3006 20.9201 13.2344 20.6872L12.3008 17.407C12.1943 17.0326 12.3496 16.6329 12.681 16.4288L21.3162 11.11C21.4712 11.0147 21.6311 11.2247 21.4978 11.3487ZM32.0768 0V32H0.0767822V0H32.0768ZM24.9556 7.68803L6.82249 14.6832C6.37545 14.8557 6.37888 15.4895 6.82776 15.6571L11.246 17.3064L12.9563 22.8063C13.0659 23.1585 13.4969 23.2884 13.7827 23.0553L16.2456 21.0474C16.5038 20.837 16.8712 20.8267 17.1408 21.0224L21.5833 24.2477C21.8891 24.4698 22.3222 24.3023 22.3991 23.9323L25.653 8.27972C25.737 7.87608 25.3404 7.53955 24.9556 7.68803Z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="32" height="32" transform="translate(0.0767822)" />
      </clipPath>
    </defs>
  </>
);

//TODO: Describe type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const TelegramIcon = (props: any): JSX.Element => (
  <IconSvg icon={icon} viewBox="0 0 32 32" {...props} />
);

export default TelegramIcon;
