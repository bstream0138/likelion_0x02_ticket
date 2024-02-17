import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import PaymentPage from "../components/PaymentPage";

const Ticketing = () => {
  const { tokenId } = useParams();
  console.log("현재페이지 :", tokenId);
  const { userInfo, account, concert } = useOutletContext();
  // LoginPage에서 사용한 login 방법 확인
  const loginMethod = localStorage.getItem("loginMethod");
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [concertId, setConcertId] = useState(null);

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
    if (!tokenId) return;
    const concertInfo = concert.find((c) => c.ID.toString() === tokenId);
    setConcertId(concertInfo);
    console.log(concertInfo);
  }, [tokenId, concert]);

  return (
    <div className="w-[425px] min-h-screen  mx-auto">
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

      <div className="flex items-center justify-center font-bold text-2xl py-4 header">
        <button
          onClick={handleGoHome}
          className="fixed content text-xl left-0 bg-gray-500 text-white py-1 px-1 rounded shadow"
        >
          back
        </button>
        TICKET
      </div>
      {/*예매하기 버튼 화면 현재 concertId는 tokenId를 구별해서 홈화면에서 누른 이미지에 맞는 공연의 공연정보를 가져와야함 하지만 현재 3번만 가져오는 오류 */}
      {concertId ? (
        <div key={concertId.ID}>
          <div className="header">
            <ul className="w-[425px] overflow-hidden h-[200px] object-contain header ">
              <img
                className=" opacity-60 blur-sm"
                src={concertId.IMAGE}
                alt=""
              />
            </ul>
            <img
              className="fixed top-[62px] left-[30px] w-[150px] content rounded-md content"
              src={concertId.IMAGE}
              alt=""
            />
          </div>
          <ul className=" pt-4 flex justify-end px-4 pr-[60px]">
            <button
              className="border-black border rounded-md px-2 py-1 mt-[2px] font-bold text-3xl"
              onClick={toggleOpen}
            >
              예매하기
            </button>
          </ul>
          <div className="mt-8 px-5">
            <ul className="text-3xl ">{concertId.TITLE}</ul>
            <ul className="text-xs font-light">{concertId.CONTENT}</ul>
            <ul className="text-sm mt-1">장소</ul>
            <ul className="text-sm">{concertId.DATE}</ul>
          </div>

          <div className="px-5 text-2xl font-bold mt-3">CASTING</div>

          {isModal && (
            <PaymentPage toggleOpen={toggleOpen} concertId={concertId} />
          )}
        </div>
      ) : (
        <div>잠시만요</div>
      )}
    </div>
  );
};

export default Ticketing;
