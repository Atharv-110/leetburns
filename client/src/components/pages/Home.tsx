import React from "react";
import Hero from "../Hero";
import Main from "../Main";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-start">
      <Hero />
      <Main />
    </div>
  );
};

const MemoizedHomePage = React.memo(HomePage);
export default MemoizedHomePage;
