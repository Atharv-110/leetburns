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
  const downloadImage = () => {
    const node = document.getElementById("image-node") as HTMLElement;
    const downloadBtn = node.querySelector("#download-btn") as HTMLElement;
    downloadBtn.style.display = "none";
    if (node) {
      htmlToImage
        .toPng(node)
        .then((dataUrl) => {
          console.log("Image URL:", dataUrl);

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
        });
    }
  };
  return (
    <section className="max-w-4xl w-full mx-auto flex flex-col items-center mt-8">
      <div className="w-full flex items-stretch gap-x-4">
        <LInput
          placeholder="Enter your leetcode username"
          icon={IMAGES.play}
          className="flex-1 text-xs md:text-base"
          onChange={(e) => setUsername(e.target.value)}
          onIconClick={() => username && fetchUserData(username)}
          onKeyDown={handleKeyDown}
        />
        {roastMessage && (
          <img
            role="button"
            src={IMAGES.download}
            id="download-btn"
            className="w-10 cursor-pointer"
            onClick={() => downloadImage()}
            alt="download"
          />
        )}
      </div>
      {roastMessage && !loading ? (
        <Card
          shadowColor="#1f2937"
          borderColor="#1f2937"
          className="w-full mt-6 max-h-[300px] sm:max-h-[450px] bg-white p-2 overflow-hidden overflow-y-auto"
        >
          <p className="text-xs md:text-base text-justify leading-relaxed md:leading-loose whitespace-pre-line">
            {roastMessage}
          </p>
        </Card>
      ) : (
        loading && <Loader />
      )}
      {error.state && (
        <p className="mt-24 text-xs md:text-sm text-red-500 text-center">
          {error?.message}
        </p>
      )}
    </section>
  );
};

const MemoizedMain = React.memo(Main);
export default MemoizedMain;
