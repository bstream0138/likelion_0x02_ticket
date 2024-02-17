import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const TicketBanner = () => {
  const [page, setPage] = useState();
  const slideRef = useRef();

  //카로셀 세팅
  const settings = {
    infinite: true,
    speed: 700,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
  
  const { concert } = useOutletContext();
  
  const getCurrentPage = () =>
    setPage(slideRef.current.innerSlider.state.currentSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      getCurrentPage();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log(page);
    console.log(concert[page]);
  }, [page]);

  return (
    <Slider {...settings} ref={slideRef}>
      {concert.map((v) => (
        <Link
          key={v.ID}
          to={`/ticketing/${v.ID}`}
          className="h-[350px] w-[350px] "
        >
          <div className="bg-white rounded-md">
            <img
              className="w-[350px] h-[350px] object-cover rounded-t-md"
              src={v.IMAGE}
              alt={v.TITLE}
            />
            <ul className="mx-5 mt-1 ">
              <li className="text-3xl">{v.TITLE}</li>
              <li>{v.CONTENT}</li>
              <li>{v.DATE}</li>
            </ul>
          </div>
        </Link>
      ))}
    </Slider>
    
  );
};

export default TicketBanner;
