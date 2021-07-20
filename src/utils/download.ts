export const openDownloadLink = (url, filename) => {
  const downloadLink = document.createElement('a')
  downloadLink.href = url
  filename && (downloadLink.download = filename)
  downloadLink.click()
}
