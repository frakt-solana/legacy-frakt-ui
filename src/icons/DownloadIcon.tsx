import React from 'react';

import IconSvg from './IconSvg';

const icon = (
  <>
    <path d="m225.556 354.445 145-145-48.333-48.333-64.444 64.444v-225.556h-64.444v225.556l-64.444-64.444-48.333 48.333z" />
    <path d="m0 386.667h451.111v64.444h-451.111z" />
  </>
);

//TODO: Describe type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const DownloadIcon = (props: any): JSX.Element => (
  <IconSvg icon={icon} viewBox="0 0 451.111 451.111" {...props} />
);

export default DownloadIcon;
