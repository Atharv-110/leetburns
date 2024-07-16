import React from "react";
import Hero from "../Hero";
import Main from "../Main";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Main />
    </>
  );
};

export default React.memo(HomePage);
