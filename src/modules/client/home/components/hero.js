import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeroBanner } from "./hero-banner";
import SearchBar from "../../../shared/components/SearchBar";

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
    <div className="relative w-full h-screen overflow-hidden">
      <Slider {...settings}>
        <div className="relative">
          <HeroBanner
            location={"colombo"}
            videoLink={"/images/banner/colombo.png"}
          />
        </div>
        <div className="relative">
          <HeroBanner location={"galle"} videoLink={"/images/banner/galle.png"} />
        </div>
        <div className="relative">
          <HeroBanner location={"kandy"} videoLink={"/images/banner/kandy.png"} />
        </div>
        <div className="relative">
          <HeroBanner
            location={"nuwara eliya"}
            videoLink={"/images/banner/nuwara-eliya.jpeg"}
          />
        </div>
        <div className="relative">
          <HeroBanner location={"dubai"} videoLink={"/images/banner/dubai.png"} />
        </div>
      </Slider>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
