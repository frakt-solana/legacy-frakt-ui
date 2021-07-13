import React from 'react'

interface ILinkItem {
  url: string
  Icon: React.FunctionComponent
}

export const LinkItem = ({ url, Icon }: ILinkItem) => (
  <li>
    <a href={url} target='_blank' rel='noopener noreferrer'>
      <Icon />
    </a>
  </li>
)
