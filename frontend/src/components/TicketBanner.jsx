import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { CiCalendar, CiMicrophoneOn } from "react-icons/ci";

const TicketBanner = () => {
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const slideRef = useRef();

  //카로셀 세팅
  const settings = {
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 4000,
    slideToShow: 1,
    slideToScroll: 1,
    arrows: false,
  };

  const { concert } = useOutletContext();
  // console.log(concert);

  const onClickNext = () => {
    slideRef.current.slickNext();
  };

  const onClickPrev = () => {
    slideRef.current.slickPrev();
  };

  return (
    <div className="flex flex-col header w-[350px] h-[360px] bg-blue-100">
      <Slider {...settings} ref={slideRef}>
        {concert.map((v, index) => (
          <Link
            key={index}
            to={`/ticketing/${index}`}
            className="h-[280px] w-[350px] "
          >
            <div className="  bg-white hover:bg-[#b1b1b1] duration-150  border-black border-2">
              <img
                className="w-[350px] h-[280px] object-cover"
                src={v.IMAGE}
                alt="a"
              />
              <ul className="mx-4 h-[120px]">
                <li className="text-3xl mt-1">{v.TITLE}</li>
                <li className="flex items-center gap-1">
                  <CiMicrophoneOn />
                  {v.CONTENT}
                </li>
                <li className="flex items-center gap-1">
                  <CiCalendar />
                  {v.DATE}
                </li>
              </ul>
            </div>
          </Link>
        ))}
      </Slider>
      <div className="bg-black w-[355px] h-[411px] fixed top-[6px] left-[3px] content -z-20"></div>
      <div className="mt-4 self-center flex gap-3">
        <button
          onMouseEnter={() => setHoverPrev(true)}
          onMouseLeave={() => setHoverPrev(false)}
          onClick={onClickPrev}
          className={
            hoverPrev
              ? "border-[2px]  border-black rounded-full py-[6px] px-2 pb-[7px] mt-[2px] duration-100"
              : "border-[2px] border-b-[5px] border-black rounded-full py-[6px] px-2 duration-100"
          }
        >
          <FaLongArrowAltLeft />
        </button>

        <button
          onMouseEnter={() => setHoverNext(true)}
          onMouseLeave={() => setHoverNext(false)}
          onClick={onClickNext}
          className={
            hoverNext
              ? "border-[2px]  border-black rounded-full py-[6px] px-2 pb-[7px] mt-[2px] duration-100"
              : "border-[2px] border-b-[5px] border-black rounded-full py-[6px] px-2 duration-100"
          }
        >
          <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

export default TicketBanner;
