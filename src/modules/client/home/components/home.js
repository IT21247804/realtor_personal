import BrandPromise from "./brand-promise";
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
    </>
  );
};
