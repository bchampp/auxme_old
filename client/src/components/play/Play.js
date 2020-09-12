import React from 'react';
// import sections
import Hero from '../sections/Hero';
import FeaturesTiles from '../sections/FeaturesTiles';
import FeaturesSplit from '../sections/FeaturesSplit';
import Testimonial from '../sections/Testimonial';
import Cta from '../sections/Cta';

const Play = () => {

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

export default Play;