import { Element } from "react-scroll";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import BrandPromise from "./brand-promise";
import ContactUs from "./contact-us";
import Hero from "./hero";
import OurMarket from "./market";
import SignatureProperties from "./signature-properties";
import Testimonials from "./testimonials";

export const HomeComp = () => {
  const navigate = useNavigate(); // Initialize navigate

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

      {/* Floating Image Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <img
          src="images/list-button.png" // Replace with your image URL
          alt="Floating Button"
          className="w-12 h-12 object-cover  shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/add-listing")} // Navigate to /add-listing
        />
      </div>
    </>
  );
};
