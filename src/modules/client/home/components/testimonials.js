import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "./testimonial-card";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      className={
        "w-full px-4 py-6 md:px-6 md:py-10 lg:px-8 lg:py-20 mx-auto text-center overflow-hidden bg-[#e6ce9f]/20 "
      }
    >
      <motion.h1
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },
          show: {
            y: 0,
            opacity: 1,
            transition: {
              type: "keyframes",
              duration: 0.2,
              delay: 0.2,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.6 }}
        className={
          "mb-6 text-xl md:text-4xl lg:text-6xl transition-all ease-in-out duration-500 uppercase font-semibold md:font-bold text-[#272c63] tracking-widest title-font"
        }
      >
        testimonials
      </motion.h1>

      <motion.p
        variants={{
          hidden: {
            opacity: 0,
            y: -30,
          },
          show: {
            y: 0,
            opacity: 1,
            transition: {
              type: "keyframes",
              duration: 0.4,
              delay: 0.3,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.6 }}
        className={
          "mb-6 md:mb-8 lg:mb-10 font-semibold italic tracking-widest text-[#272c63]"
        }
      >
        What they say about us!
      </motion.p>

      <Slider {...settings}>
        <TestimonialCard
          image={"/images/person01.jpeg"}
          company={""}
          message={
            "I recently had the pleasure of working with Salindu at the Real Realtor (Pvt) Ltd to find an apartment in Colombo, and I must say, their service was nothing short of exceptional."
          }
          name={"Mats Hegan"}
          role={""}
        />
        <TestimonialCard
          image={"/images/person02.jpeg"}
          company={"SPERA LABS"}
          message={
            "I recently had the pleasure of purchasing land through ‘The Realtor and I must say, their service exceeded my expectations. They not only found the perfect piece of land for me, but they also negotiated a great price. Their professionalism and dedication to their clients are truly remarkable. I highly recommend ‘The Realtor’ for their exceptional service and expertise in real estate. Thank you for helping me find the perfect land!"
          }
          name={"Sahan Yapa"}
          role={"ceo"}
        />
        <TestimonialCard
          image={"/images/person03.jpeg"}
          company={""}
          message={
            "We recently bought Penthouse Apartment in Colombo. We highly recommend this real estate\n" +
            '"The Real Realtor (Pvt) Ltd"\n' +
            "and the agent\n" +
            '"Salindu Hettiarachchi " to anyone looking for an experienced, reliable, and\n' +
            "knowledgeable professional. We were delighted with their services throughout the\n" +
            "entire process of buying our home. They provided us with extremely helpful advice\n" +
            "and guidance every step of the way and ensured that we understood all aspects\n" +
            "involved in purchasing a property."
          }
          name={"Udaya Perera"}
          role={""}
        />
        <TestimonialCard
          image={"/images/person04.jpeg"}
          company={""}
          message={
            "I recently found an apartment in Battaramulle through Salindu and he provided excellent service as a realtor."
          }
          name={"Harith Sankalpa"}
          role={""}
        />
      </Slider>
    </div>
  );
};

export default Testimonials;
