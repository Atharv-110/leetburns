import { useState } from "react";
import LInput from "../@ui/LInput";
import { IMAGES } from "../assets";
import { Card } from "pixel-retroui";

const Main = () => {
  const [username, setUsername] = useState<string>("");
  console.log(username);

  return (
    <section className="max-w-[720px] mx-auto flex flex-col items-center mt-10">
      <LInput
        placeholder="Enter your leetcode username"
        icon={IMAGES.play}
        className="w-full text-sm"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Card shadowColor="black" className="w-full mt-10 bg-white p-4">
        <p className="text-sm text-justify text-gray-800 tracking-wide">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
          possimus est rem harum molestias unde odit in suscipit modi voluptates
          magni ipsum dolorem! Dolorem necessitatibus quas, nostrum accusamus
          dicta delectus rerum, quia ducimus earum vitae corporis amet labore
          esse iusto architecto fugiat inventore quisquam quam totam eveniet
          illum odio iste quidem. Sed doloribus, voluptates illum repellat
          temporibus necessitatibus natus laudantium quos, eaque asperiores
          fuga. Quidem voluptatibus culpa quod perspiciatis consequuntur
          commodi, beatae quae eaque, omnis dolor aperiam assumenda aut,
          delectus quos odit soluta ipsa nisi eveniet. Molestiae eveniet iure
          quod impedit nihil fugiat, quidem blanditiis et neque fugit! Fugiat,
          nostrum minima exercitationem harum quisquam reiciendis laboriosam
          iusto molestiae, enim qui sunt architecto impedit. Dolor architecto
          doloribus quaerat dolorem consectetur excepturi voluptates quas dolore
          atque consequatur doloremque earum esse assumenda quis, labore
          eligendi porro a magni est iste, adipisci corrupti perspiciatis
          minima! At eligendi sequi aut facere sunt eum est maxime.
        </p>
      </Card>
    </section>
  );
};

export default Main;
