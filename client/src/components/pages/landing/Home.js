import React from 'react';
// import sections
import Hero from '../landing/Hero';
import FeaturesTiles from '../landing/FeaturesTiles';
import Cta from '../landing/Cta';

const Home = () => {

  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      {/* <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" /> */}
      {/* <Testimonial topDivider /> */}
      <Cta split />
    </>
  );
}

export default Home;