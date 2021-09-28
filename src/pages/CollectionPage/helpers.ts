import { COLOR, SHAPE } from '../../components/ArtCard/constants';

export const sortArtsByNew = (arts: Array<any>): Array<any> =>
  [...arts].sort(({ metadata: metadataA }, { metadata: metadataB }) => {
    return metadataB?.created_at - metadataA?.created_at;
  });

export const sortArtsByRarity = (arts: Array<any>): Array<any> =>
  [...arts].sort(
    ({ attributes: attributesA }, { attributes: attributesB }) =>
      attributesA.rarity - attributesB.rarity,
  );

export const sortArts = (
  arts: Array<any>,
  sortBy: string,
): Array<any> => (sortBy === 'rarity' ? sortArtsByRarity : sortArtsByNew)(arts);

export const pluralize = (count: number, noun: string, suffix = 's'): string =>
  count ? `${count} ${noun}${count !== 1 ? suffix : ''}` : `0 ${noun}${suffix}`;

export const getPointsForArt = (art: any): number => {
  const pointsMatrix = {
    [SHAPE.Wave]: {
      [COLOR.Magenta]: 1760,
      [COLOR.Red]: 880,
      [COLOR.Orange]: 587,
      [COLOR.White]: 440,
    },
    [SHAPE.Eye]: {
      [COLOR.Magenta]: 352,
      [COLOR.Red]: 176,
      [COLOR.Orange]: 117,
      [COLOR.White]: 88,
    },
    [SHAPE.Star]: {
      [COLOR.Magenta]: 88,
      [COLOR.Red]: 44,
      [COLOR.Orange]: 29,
      [COLOR.White]: 22,
    },
    [SHAPE.Portal]: {
      [COLOR.Magenta]: 59,
      [COLOR.Red]: 29,
      [COLOR.Orange]: 20,
      [COLOR.White]: 15,
    },
    [SHAPE.Net]: {
      [COLOR.Magenta]: 40,
      [COLOR.Red]: 20,
      [COLOR.Orange]: 13,
      [COLOR.White]: 10,
    },
  };

  return pointsMatrix[art.attributes.shape as number][art.attributes.color];
};
