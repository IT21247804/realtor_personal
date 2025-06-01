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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
        },
      },
    ],
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

      {/* SearchBar Container with Responsive Positioning */}
      <div className="absolute w-full px-4 md:px-20 transform -translate-y-1/2 z-10 top-1/2 md:top-[35%]">
        <div className="max-w-7xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Optional Overlay for Better Text Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none" />
    </div>
  );
};

export default Hero;
