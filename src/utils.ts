import BN from 'bn.js';

export const frktBNToString = (bn: BN, precision = 6): string => {
  const bnStr = bn.toString(10);
  if (bnStr === '0') return '0';
  const integerPart = bnStr.slice(0, -8);
  const floatPart = bnStr.padStart(8, '0').slice(-8, -8 + precision);
  return `${integerPart || 0}.${floatPart || 0}`;
};

export const decimalBNToString = (
  bn: BN,
  precision = 2,
  decimals = 9,
): string => {
  const bnStr = bn.toString(10).padStart(decimals, '0');
  if (bnStr === '0') return '0';
  const integerPart = bnStr.slice(0, -decimals);

  let floatPart = bnStr.slice(bnStr.length - decimals);
  const number = floatPart.replace(/^0+/g, '').replace(/0+$/g, '');
  floatPart = floatPart.replace(/0+$/g, '');

  if (floatPart.length - number.length < precision) {
    floatPart = floatPart.slice(0, precision);
  }

  if (floatPart) floatPart = '.' + floatPart;
  return `${integerPart || 0}${floatPart}`;
};

export const shortBigNumber = (bn: BN, precision = 2, decimals = 9): string => {
  const abbrev = ['K', 'M', 'B', 'T'];
  const dec = [3, 6, 9, 12];
  const bnString = bn.toString();

  if (bnString.length >= decimals + dec[0]) {
    const decimalString = bn.toString().slice(0, -decimals);

    for (let i = dec.length - 1; i >= 0; i--) {
      const curDec = dec[i];
      if (decimalString.length <= curDec) continue;

      const result = decimalString.slice(
        0,
        decimalString.length - curDec + precision,
      );
      let floatPart = result.slice(-precision).replace(/0+$/g, '');
      if (floatPart) floatPart = '.' + floatPart;
      return `${result.slice(0, -precision) || 0}${floatPart}${abbrev[i]}`;
    }
  }

  return decimalBNToString(bn, precision, decimals);
};

export const floatStringToBn = (str: string, decimals = 8): BN => {
  const dotPosition = str.indexOf('.');
  let amountOfSignsAfterDot = 0;
  if (dotPosition !== -1) amountOfSignsAfterDot = str.length - dotPosition - 1;
  if (amountOfSignsAfterDot > decimals) {
    return new BN(
      str
        .slice(0, -Math.abs(decimals - amountOfSignsAfterDot))
        .replace('.', ''),
    );
  }
  return new BN(
    str
      .padEnd(str.length + decimals - amountOfSignsAfterDot, '0')
      .replace('.', ''),
  );
};
