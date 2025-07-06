import React from "react";
import Hero from "../Hero";
import Main from "../Main";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col justify-start">
      <Hero />
      <Main />
    </div>
  );
};

export default React.memo(HomePage);
