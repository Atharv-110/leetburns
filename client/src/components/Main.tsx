import { useState } from "react";
import LInput from "../@ui/LInput";
import { IMAGES } from "../assets";
import { Card } from "pixel-retroui";
import axios from "axios";
import React from "react";
import Loader from "./Loader";

const Main = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [roastMessage, setRoastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchResponse = async () => {
    if (username) {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/${username}`
      );
      setRoastMessage(res.data.roast);
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchResponse();
    }
  };

  return (
    <section className="max-w-[770px] mx-auto flex flex-col items-center mt-4 md:mt-10">
      <LInput
        placeholder="Enter your leetcode username"
        icon={IMAGES.play}
        className="w-full text-xs md:text-base"
        onChange={(e) => setUsername(e.target.value)}
        onIconClick={fetchResponse}
        onKeyDown={handleKeyDown}
      />
      {roastMessage && !loading ? (
        <Card
          shadowColor="#1f2937"
          borderColor="#1f2937"
          className="w-full mt-6 md:mt-10 bg-white p-1 md:px-4 md:py-2 max-h-[260px] md:max-h-[420px] overflow-hidden overflow-y-auto"
        >
          <p className="text-[0.75rem] md:text-[1rem] text-justify md:leading-[2rem]">
            {roastMessage}
          </p>
        </Card>
      ) : (
        loading && <Loader />
      )}
    </section>
  );
};

export default React.memo(Main);
