export const openDownloadLink = (url: string, filename?: string): void => {
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  filename && (downloadLink.download = filename);
  downloadLink.click();
};

export const downloadImageFromURL = (
  imageUrl: string,
  imageName?: string,
): Promise<void> =>
  fetch(imageUrl)
    .then((image) => image.blob())
    .then((imageBlob) => {
      const imageURL = URL.createObjectURL(imageBlob);
      openDownloadLink(imageURL, imageName);
    });
