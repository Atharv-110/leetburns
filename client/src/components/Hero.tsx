import React from "react";

const Hero = () => {
  return (
    <section className="mt-8 md:mt-10">
      <h1 className="text-center text-3xl md:text-6xl font-black tracking-widest">
        Leetburns
      </h1>
      <h2 className="text-center text-base md:text-xl md:mt-1">
        The funniest thing since your last compile error
      </h2>
    </section>
  );
};

export default React.memo(Hero);
