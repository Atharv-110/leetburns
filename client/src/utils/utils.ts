import * as htmlToImage from "html-to-image";
export const generateImage = (node: HTMLElement, username: string | null) => {
  htmlToImage
    .toPng(node, { pixelRatio: 3 })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${username}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.error("oops, something went wrong!", err);
    });
};
