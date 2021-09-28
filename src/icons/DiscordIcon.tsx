import React from 'react';

import IconSvg from './IconSvg';

const icon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M32.0768 0H0.0767822V32H32.0768V0ZM24.0264 10.0874C24.1036 10.2133 25.0544 11.7628 25.9007 14.6704C26.7445 17.5698 27.0651 21.66 27.0768 21.824C27.0752 21.8265 27.0728 21.8303 27.0697 21.8353C26.9264 22.0663 25.1715 24.8943 20.5587 24.8943L19.364 23.1643C20.7025 22.8089 21.9788 22.2358 23.1471 21.4581L22.4328 20.3851C20.548 21.6396 18.3501 22.3028 16.0768 22.3028C13.8034 22.3028 11.6055 21.6396 9.72072 20.3851L9.00645 21.4581C10.1748 22.2358 11.4511 22.8089 12.7895 23.1643L11.5948 24.8943C6.9821 24.8943 5.22719 22.0663 5.08387 21.8353C5.08075 21.8303 5.07839 21.8265 5.07678 21.824C5.08843 21.66 5.40902 17.5698 6.25292 14.6704C7.09916 11.7628 8.04995 10.2133 8.12719 10.0874C8.12987 10.083 8.1315 10.0804 8.13203 10.0795C8.18832 10.0107 9.58377 8.34081 12.947 7.10563L13.3914 8.31563C11.7914 8.90327 10.6562 9.6202 10.032 10.0834C11.8958 9.52679 14.113 9.18592 16.0768 9.18592C18.0405 9.18592 20.2578 9.52679 22.1216 10.0834C21.4973 9.62016 20.3621 8.90327 18.7621 8.31563L19.2065 7.10563C22.5698 8.34081 23.9653 10.0107 24.0216 10.0795C24.0221 10.0804 24.0237 10.083 24.0264 10.0874ZM11.8075 18.0427H13.0966V15.8943H11.8075V18.0427ZM19.057 18.0427H20.3461V15.8943H19.057V18.0427Z"
  />
);

export const DiscordIcon = (props: any): JSX.Element => (
  <IconSvg icon={icon} viewBox="0 0 33 32" {...props} />
);

export default DiscordIcon;
