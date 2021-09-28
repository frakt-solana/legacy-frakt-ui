export const checkIsArtInMigration = (art: any): boolean =>
  art?.metadata.is_old_version === false &&
  art?.metadata.is_minted === true &&
  art?.metadata.minted_token_pubkey === '11111111111111111111111111111111';
