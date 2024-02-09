import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const TicketBanner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    fade: true,
    auto: true,
    cssEase: "linear",
  };

  return (
    <Slider {...settings}>
      <Link to="/ticketing" className="h-[280px] w-[350px] ">
        <div>
          <img
            className="w-[350px] h-[280px] object-cover rounded-md"
            src="../golden_hour.jpg"
            alt="a"
          />
          <ul className="mx-5 mt-3">
            <li>IU</li>
            <li>hello</li>
            <li>YYYY.MM.DD</li>
          </ul>
        </div>
      </Link>
      <Link to="/ticketing" className="h-[280px] w-[350px] ">
        <div>
          <img
            className="w-[350px] h-[280px] object-cover rounded-md"
            src="../karina.jpg"
            alt="a"
          />
          <ul className="mx-5 mt-3">
            <li>NewJeans</li>
            <li>hello</li>
            <li>YYYY.MM.DD</li>
          </ul>
        </div>
      </Link>
      <Link to="/ticketing" className="h-[280px] w-[350px] ">
        <div>
          <img
            className="w-[350px] h-[280px] object-cover rounded-md"
            src="../bts.jpg"
            alt="a"
          />
          <ul className="mx-5 mt-3">
            <li>BTS</li>
            <li>hello</li>
            <li>YYYY.MM.DD</li>
          </ul>
        </div>
      </Link>
    </Slider>
  );
};

export default TicketBanner;
