import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeroBanner } from "./hero-banner";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: false,
  };

  return (
    <div className={"relative w-full h-screen overflow-hidden"}>
      <Slider {...settings}>
        <HeroBanner location={"colombo"} videoLink={"/video/colombo.mp4"} />
        <HeroBanner location={"galle"} videoLink={"/video/galle.mp4"} />
        <HeroBanner location={"matara"} videoLink={"/video/matara.mp4"} />
        <HeroBanner
          location={"nuwara eliya"}
          videoLink={"/video/nuwara-eliya.mp4"}
        />
        <HeroBanner location={"dubai"} videoLink={"/video/dubai.mp4"} />
      </Slider>
    </div>
  );
};

export default Hero;
