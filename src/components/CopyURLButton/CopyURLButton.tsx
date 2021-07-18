import React from 'react'
import { notify } from '../../utils/notifications'
import ButtonRegular from '../Button'
import { CopyClipboardIcon } from '../../icons'

const LINK_COPIED_NOTIFICATION_TEXT = 'Link copied successfully!'

interface ICopyURLButtonProps {
  className?: string
  size?: string
}
const CopyURLButton = ({ className, size = 'md' }: ICopyURLButtonProps) => {
  return (
    <ButtonRegular
      className={className}
      size={size}
      Icon={CopyClipboardIcon}
      onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        notify({
          message: LINK_COPIED_NOTIFICATION_TEXT,
          type: 'success',
        })
      }}
    >
      Copy link
    </ButtonRegular>
  )
}

export default CopyURLButton
