import React from 'react';

interface LinkItem {
  url: string;
  Icon: React.FunctionComponent;
}

export const LinkItem = ({ url, Icon }: LinkItem): JSX.Element => (
  <li>
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Icon />
    </a>
  </li>
);
