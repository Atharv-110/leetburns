import * as htmlToImage from "html-to-image";
import { Card } from "pixel-retroui";
import React from "react";
import LInput from "../@ui/LInput";
import { IMAGES } from "../assets";
import useFetchData from "../hooks/useFetchData";
import Loader from "./Loader";

const Main = () => {
  const {
    username,
    setUsername,
    roastMessage,
    error,
    loading,
    handleKeyDown,
    fetchUserData,
  } = useFetchData();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const downloadImage = () => {
    const node = document.getElementById("image-node") as HTMLElement;
    const downloadBtn = node.querySelector("#download-btn") as HTMLElement;
    const cardEl = cardRef.current?.querySelector("div");
    const cardPEl = cardEl?.querySelector("p");

    downloadBtn.style.display = "none";
    const nodeDimensions = node.getBoundingClientRect();
    //const nodeHeight = nodeDimensions.height;
    const nodeWidth = nodeDimensions.width;
    cardPEl?.classList.add("leading-loose");
    cardEl?.classList.add("max-h-full", "overflow-hidden");
    if (nodeWidth < 768) {
      node.classList.remove("w-full");
      node.classList.add("h-[600px]", "w-[1080px]");
    }
    if (node) {
      htmlToImage
        .toPng(node, { pixelRatio: 2 })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${username}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("oops, something went wrong!", err);
        })
        .finally(() => {
          downloadBtn.style.display = "";
          cardEl?.classList.remove("max-h-full", "overflow-hidden");
          cardPEl?.classList.remove("leading-loose");
          if (nodeWidth < 768) {
            node.classList.remove("h-[600px]", "w-[1080px]");
            node.classList.add("w-full");
          }
        });
    }
  };

  return (
    <section
      ref={mainRef}
      className="max-w-4xl w-full mx-auto flex flex-col items-center mt-4 sm:mt-8"
    >
      <div className="w-full flex items-stretch gap-x-2 sm:gap-x-4">
        <LInput
          placeholder="Enter your leetcode username"
          icon={IMAGES.play}
          className="flex-1 text-xs sm:text-base"
          onChange={(e) => setUsername(e.target.value)}
          onIconClick={() => username && fetchUserData(username)}
          onKeyDown={handleKeyDown}
        />
        {roastMessage && !loading && (
          <img
            role="button"
            src={IMAGES.download}
            id="download-btn"
            className="w-7 sm:w-8 cursor-pointer hover:scale-90"
            onClick={() => downloadImage()}
            alt="download"
          />
        )}
      </div>
      {roastMessage && !loading ? (
        <div ref={cardRef} className="w-full mt-4 sm:mt-6">
          <Card
            shadowColor="none"
            className="max-h-[350px] sm:max-h-[450px] bg-white p-2 overflow-hidden overflow-y-auto"
          >
            <p className="text-xs sm:text-base text-justify leading-relaxed sm:leading-loose whitespace-pre-line">
              {roastMessage}
            </p>
          </Card>
        </div>
      ) : (
        loading && <Loader />
      )}
      {error.state && (
        <p className="mt-24 text-xs sm:text-sm text-red-500 text-center">
          {error?.message}
        </p>
      )}
    </section>
  );
};

const MemoizedMain = React.memo(Main);
export default MemoizedMain;
