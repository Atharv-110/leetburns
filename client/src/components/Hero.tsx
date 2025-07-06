import React from "react";

const Hero = () => {
  return (
    <section className="mt-12">
      <h1 className="text-center text-4xl md:text-5xl font-black tracking-widest">
        Leetburns
      </h1>
      <h2 className="text-center text-sm md:text-lg">
        The funniest thing since your last compile error
      </h2>
    </section>
  );
};

export default React.memo(Hero);
