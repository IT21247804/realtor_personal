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
        <HeroBanner
          location={"colombo"}
          videoLink={"/images/banner/colombo.png"}
        />
        <HeroBanner location={"galle"} videoLink={"/images/banner/galle.png"} />
        <HeroBanner location={"kandy"} videoLink={"/images/banner/kandy.png"} />
        <HeroBanner
          location={"nuwara eliya"}
          videoLink={"/images/banner/nuwara-eliya.jpeg"}
        />
        <HeroBanner location={"dubai"} videoLink={"/images/banner/dubai.png"} />
      </Slider>
    </div>
  );
};

export default Hero;
