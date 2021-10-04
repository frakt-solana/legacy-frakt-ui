import { Frakt } from './../../contexts/frakts';

export const checkIsArtInMigration = (art: Frakt): boolean =>
  art?.metadata.is_old_version === false &&
  art?.metadata.is_minted === true &&
  art?.metadata.minted_token_pubkey === '11111111111111111111111111111111';
