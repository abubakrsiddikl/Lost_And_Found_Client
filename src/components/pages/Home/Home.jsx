import React from "react";
import Banner from "./Banner";
import Latest from "./Latest";
import SuccessStory from "./SuccessStory";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Latest></Latest>
      <SuccessStory></SuccessStory>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;
