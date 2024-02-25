import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Payment from "../components/Payment";
import { CiCalendar, CiLocationOn, CiMicrophoneOn } from "react-icons/ci";

const Ticketing = () => {
  const { index } = useParams();

  const { account, concert } = useOutletContext();

  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);

  const [concertInfo, setConcertInfo] = useState(null);

  const [hoverTicketing, setHoverTicketing] = useState(false);

  //티켓 예매 버튼
  const toggleOpen = () => {
    if (!account) {
      alert("You need to login");
      navigate("/login");
    }
    setIsModal(!isModal);
  };

  //티켓 배너의 이미지와 예매 페이지 매칭
  useEffect(() => {
    const idx = parseInt(index, 10);

    if (!isNaN(idx) && concert[idx]) {
      setConcertInfo(concert[idx]);
    } else {
      navigate("/");
    }
  }, [index, concert, navigate]);

  return (
    <div className="min-h-screen min-w-screen md:w-[450px] mx-auto overflow-y-auto">
      {/*예매하기 버튼 화면 현재 concertInfo는 tokenId를 구별해서 홈화면에서 누른 이미지에 맞는 공연의 공연정보를 가져와야함 하지만 현재 3번만 가져오는 오류 */}
      {concertInfo ? (
        <div key={concertInfo.ID}>
          <div className="header">
            <ul className="min-w-screen h-[200px] overflow-hidden object-contain header">
              <img
                className="opacity-60 blur-sm"
                src={concertInfo.IMAGE}
                alt=""
              />
            </ul>
            <div className="header">
              <img
                className="fixed -top-[120px] left-[30px] w-[150px] h-[208px] content rounded-md object-cover"
                src={concertInfo.IMAGE}
                alt=""
              />
              <div className="w-[153px] h-[209px] fixed bg-black -top-[124px] left-[32px] content -z-30 rounded-md"></div>
            </div>
            <div className="flex justify-end  w-[340px] mx-auto ">
              <ul className=" pt-4 flex  ">
                <button
                  className={
                    hoverTicketing
                      ? "flex items-center mt-[3px] justify-end border-2 border-black py-1 px-[10px] rounded-full text-4xl duration-100"
                      : "flex items-center justify-end border-2 border-b-[5px] border-black  py-1 px-[10px] rounded-full text-4xl duration-100"
                  }
                  onClick={toggleOpen}
                  onMouseEnter={() => setHoverTicketing(true)}
                  onMouseLeave={() => setHoverTicketing(false)}
                >
                  Ticketing
                </button>
              </ul>
            </div>
          </div>

          <div className="mt-10 px-5 ml-3">
            <ul className="text-3xl border-black">{concertInfo.TITLE}</ul>
            <ul className="text-xl font-normal flex items-center gap-[1px] mt-3">
              <CiMicrophoneOn />
              {concertInfo.CONTENT}
            </ul>
            <ul className="text-sm flex items-center mt-2 ml-[1px] gap-1">
              <CiLocationOn />
              잠실종합운동장
            </ul>
            <ul className="text-sm flex items-center gap-1 mt-1 ml-[2px]">
              <CiCalendar />
              {concertInfo.DATE}
            </ul>
          </div>

          <div className="px-5 text-2xl font-bold mt-3 ml-3">CASTING</div>
          <ul className="w-[100px] h-[100px] object-contain ml-9 ">
            <img className="w-[100px]" src="../iucasting.png" alt="iu" />
          </ul>
          {isModal && (
            <Payment
              toggleOpen={toggleOpen}
              account={account}
              concertInfo={concertInfo}
            />
          )}
        </div>
      ) : (
        <div>잠시만요</div>
      )}
    </div>
  );
};

export default Ticketing;
