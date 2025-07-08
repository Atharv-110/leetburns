import React from "react";

const Hero = () => {
  return (
    <section className="mt-10">
      <h1 className="text-center text-3xl md:text-5xl font-black tracking-widest">
        Leetburns
      </h1>
      <h2 className="text-center text-xs md:text-lg text-gray-700">
        The funniest thing since your last compile error
      </h2>
    </section>
  );
};

const MemoizedHero = React.memo(Hero);
export default MemoizedHero;
