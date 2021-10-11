import React from 'react';

interface LinkItemInterface {
  url: string;
  Icon: React.FunctionComponent;
}

export const LinkItem = ({ url, Icon }: LinkItemInterface): JSX.Element => (
  <li>
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Icon />
    </a>
  </li>
);
