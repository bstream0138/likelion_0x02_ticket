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
  }, [page]);

  return (
    <Slider {...settings} ref={slideRef}>
      {concert.map((v, i) => (
        <Link
          key={i}
          to={`/ticketing/${v.tokenId}`}
          className="h-[280px] w-[350px] "
        >
          <div className="bg-white rounded-md">
            <img
              className="w-[350px] h-[280px] object-cover rounded-t-md"
              src={`/${v.image}`}
              alt="a"
            />
            <ul className="mx-5 mt-1 ">
              <li className="text-3xl">{v.title}</li>
              <li>{v.content}</li>
              <li>{v.date}</li>
            </ul>
          </div>
        </Link>
      ))}
    </Slider>
  );
};

export default TicketBanner;
