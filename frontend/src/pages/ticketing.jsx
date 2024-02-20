import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Payment from "../components/Payment";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { CiCalendar, CiLocationOn, CiMicrophoneOn } from "react-icons/ci";

const Ticketing = () => {
  const { index } = useParams();

  const { userInfo, account, concert } = useOutletContext();
  // LoginPage에서 사용한 login 방법 확인
  const loginMethod = localStorage.getItem("loginMethod");
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);

  const [concertInfo, setConcertInfo] = useState(null);

  const [hoverBack, setHoverBack] = useState(false);
  const [hoverTicketing, setHoverTicketing] = useState(false);

  // for Kakao Login
  const handleGoHome = () => {
    navigate("/");
  };

  const toggleOpen = () => {
    if (!account) {
      alert("You need to login");
      navigate("/login");
    }
    setIsModal(!isModal);
  };

  useEffect(() => {
    const idx = parseInt(index, 10);

    if (!isNaN(idx) && concert[idx]) {
      setConcertInfo(concert[idx]);
    } else {
      navigate("/");
    }
  }, [index, concert, navigate]);

  return (
    <div className="w-[425px] h-[100vh]  mx-auto">
      <div>
        {loginMethod === "K" ? (
          <div>
            <li className="text-lg font-semibold">UserID: {userInfo.userID}</li>
            <li className="text-lg font-semibold">
              UserName: {userInfo.userName}
            </li>
          </div>
        ) : (
          <div>
            <h1 className="text-lg font-semibold">Metamask Account Info</h1>
            <p className="text-lg">
              <span>
                {account.substring(0, 7)}...
                {account.substring(account.length - 5)}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="bg-[#038BD5] flex items-center justify-center font-bold text-3xl py-4 header poppins">
        <button
          onClick={handleGoHome}
          onMouseEnter={() => setHoverBack(true)}
          onMouseLeave={() => setHoverBack(false)}
          className={
            hoverBack
              ? "ml-3 fixed content text-sm left-0 border-[2px]  border-black rounded-full py-[6px] px-2 pb-[7px] mt-[2px] "
              : "ml-3 fixed content text-sm left-0  border-[2px] border-b-[5px] border-black rounded-full py-[6px] px-2"
          }
        >
          <FaLongArrowAltLeft />
        </button>
        TICKET
      </div>

      {/*예매하기 버튼 화면 현재 concertInfo는 tokenId를 구별해서 홈화면에서 누른 이미지에 맞는 공연의 공연정보를 가져와야함 하지만 현재 3번만 가져오는 오류 */}
      {concertInfo ? (
        <div key={concertInfo.ID}>
          <div className="header">
            <img
              src="../ticket-head.png"
              alt="ticket"
              className="z-10 fixed w-[425px] content"
            />
            <ul className="w-[425px] overflow-hidden h-[200px] object-contain header h ">
              <img
                className=" opacity-60 blur-sm "
                src={concertInfo.IMAGE}
                alt=""
              />
            </ul>
            <div className="header">
              <img
                className="fixed -top-[120px] left-[30px] w-[150px] h-[208px] content rounded-md "
                src={concertInfo.IMAGE}
                alt=""
              />
              <div className="w-[153px] h-[209px] fixed bg-black -top-[124px] left-[32px] content -z-30 rounded-md"></div>
            </div>
          </div>
          <ul className=" pt-4 flex justify-end px-4 pr-[60px]">
            <button
              className={
                hoverTicketing
                  ? "flex items-center mt-[3px] justify-end border-2 border-black py-1 px-[10px] rounded-full text-3xl "
                  : "flex items-center justify-end border-2 border-b-[5px] border-black  py-1 px-[10px] rounded-full text-3xl "
              }
              onClick={toggleOpen}
              onMouseEnter={() => setHoverTicketing(true)}
              onMouseLeave={() => setHoverTicketing(false)}
            >
              Ticketing
            </button>
          </ul>
          <div className="mt-8 px-5">
            <ul className="text-3xl">{concertInfo.TITLE}</ul>
            <ul className="text-xs font-normal flex items-center gap-1 mt-3 ml-[1px]">
              <CiMicrophoneOn />
              {concertInfo.CONTENT}
            </ul>
            <ul className="text-sm mt-1 flex items-center gap-1">
              <CiLocationOn />
              장소
            </ul>
            <ul className="text-sm flex items-center gap-1">
              <CiCalendar />
              {concertInfo.DATE}
            </ul>
          </div>

          <div className="px-5 text-2xl font-bold mt-3">CASTING</div>

          {isModal && (
            <Payment toggleOpen={toggleOpen} concertInfo={concertInfo} />
          )}
        </div>
      ) : (
        <div>잠시만요</div>
      )}
    </div>
  );
};

export default Ticketing;
