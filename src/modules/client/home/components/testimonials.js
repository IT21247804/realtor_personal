import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Spin, notification } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "./testimonial-card";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-testimonials`);
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        notification.error({
          message: "Error Fetching Testimonials",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

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
        Testimonials
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
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            image={`${process.env.REACT_APP_MYSQL_ENDPOINT}/${testimonial.image}`}
            message={testimonial.review}
            name={testimonial.fullname}
            role={testimonial.designation}
            company={testimonial.company}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;