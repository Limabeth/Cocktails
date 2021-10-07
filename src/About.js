import React from "react";

import "./styles/About.css";

const IMG_Fallout = require("./images/fallout.png").default;

const About = () => {
  return (
    <div className="about">
      <span>About website</span>
      <div>
        <img src={IMG_Fallout} alt="Fallout Thumbs up"></img>
        <p>
          Created by the most exquisite of the cocktail enthusiasts, this
          website provides an extensive database of cocktails from all over the
          world. When browsing through the list and selecting the one you fancy,
          you can also view its recipe, the ingredients needed to make it and
          more additional information in case you'd like a very detailed
          description. Furthermore, you might want to create your own list of
          favourite drinks so that, for instance, you can check it before going
          to a bar with your date and make sure you get the best drinks for both
          of you!
        </p>
      </div>
    </div>
  );
};

export default About;
