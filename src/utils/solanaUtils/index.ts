import { notification } from 'antd';

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function notify({
  message = '',
  description = null,
  type = 'info',
}: {
  message: string;
  description?: string;
  type: 'info' | 'error' | 'success';
}): void {
  (notification as any)[type]({
    className: 'frakt__notification',
    message,
    description,
    placement: 'bottomRight',
  });
}

export const isSmallNumber = (val: number): boolean => {
  return val < 0.001 && val > 0;
};
export const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatNumber = {
  format: (val?: number, useSmall?: boolean): string | number => {
    if (!val) {
      return '--';
    }
    if (useSmall && isSmallNumber(val)) {
      return 0.001;
    }

    return numberFormatter.format(val);
  },
};

export function ipfsUriToCid(uri: string): string | null {
  const baseRegex = /^ipfs:\/\//;
  const ipfsRegex = new RegExp(baseRegex.source + '.+');
  if (ipfsRegex.test(uri)) {
    return uri.replace(baseRegex, '');
  }
  return null;
}

export function ipfsUriToGatewayUrl(uri: string): string {
  const ipfsHost = 'https://ipfs.io';
  const cid = ipfsUriToCid(uri);
  return cid ? `${ipfsHost}/ipfs/${cid}` : uri;
}
