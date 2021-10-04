import React from 'react';

import IconSvg from './IconSvg';

const icon = (
  <g>
    <path
      d="M425.934,0H171.662c-18.122,0-32.864,14.743-32.864,32.864v77.134c6.985,0,144.07,0,149.543,0
				c34.664,0,62.865,28.201,62.865,62.865c0,6.489,0,145.491,0,147.139h74.728c18.121,0,32.864-14.743,32.864-32.865V32.864
				C458.797,14.743,444.055,0,425.934,0z"
    />
    <path
      d="M288.339,139.998H34.068c-18.121,0-32.865,14.743-32.865,32.865v254.272C1.204,445.257,15.946,460,34.068,460h254.272
				c18.122,0,32.865-14.743,32.865-32.864V172.863C321.206,154.741,306.461,139.998,288.339,139.998z"
    />
  </g>
);

//TODO: Describe type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CopyClipboardIcon = (props: any): JSX.Element => (
  <IconSvg icon={icon} viewBox="0 0 460 460" {...props} />
);

export default CopyClipboardIcon;
