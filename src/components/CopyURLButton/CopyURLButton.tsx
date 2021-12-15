import React from 'react';
import { notify } from '../../utils/solanaUtils';
import ButtonRegular from '../Button';
import { CopyClipboardIcon } from '../../icons';

const LINK_COPIED_NOTIFICATION_TEXT = 'Link copied successfully!';

interface CopyURLButtonProps {
  className?: string;
  size?: string;
}
const CopyURLButton = ({
  className,
  size = 'md',
}: CopyURLButtonProps): JSX.Element => {
  return (
    <ButtonRegular
      className={className}
      size={size}
      Icon={CopyClipboardIcon}
      onClick={(): void => {
        navigator.clipboard.writeText(window.location.href);
        notify({
          message: LINK_COPIED_NOTIFICATION_TEXT,
          type: 'success',
        });
      }}
    >
      Copy link
    </ButtonRegular>
  );
};

export default CopyURLButton;
