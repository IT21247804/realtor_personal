import { Element } from 'react-scroll';
import BrandPromise from "./brand-promise";
import ContactUs from "./contact-us";
import Hero from "./hero";
import OurMarket from "./market";
import SignatureProperties from "./signature-properties";
import Testimonials from "./testimonials";

export const HomeComp = () => {
  return (
    <>
      <Hero />
      <SignatureProperties />
      <BrandPromise />
      <OurMarket />
      <Testimonials />
      <Element name="contact-us">
        <ContactUs />
      </Element>
    </>
  );
};