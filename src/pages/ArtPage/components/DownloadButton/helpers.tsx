export const openDownloadLink = (url: string, filename: string): void => {
  const downloadLink = document.createElement('a')
  downloadLink.href = url
  filename && (downloadLink.download = filename)
  downloadLink.click()
}
