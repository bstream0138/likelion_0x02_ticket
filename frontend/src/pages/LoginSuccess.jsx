import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

import Web3 from "web3";
import PreEventAbi from "../abis/PreEventAbi.json";
import { PRE_EVENT_CONTRACT } from "../abis/contractAddress";
import { CreateAddress } from "../components/CreateAddress";

// App은 2가지 Login 방식 지원: (1) Kakao Login (2) Metamask Login
// Kakao login 성공한 경우 -> 가입 여부 확인 -> 신규 가입 시, 개인키 및 지갑 주소 생성 -> 정보 저장
// Metamask login 성공한 경우 -> 가입 여부 확인 -> 신규 가입 시, 정보 저장
// 회원 정보 처리 후, App에서 사용할 각종 context 정보 처리

const LoginSuccess = () => {
  const { setAccount, setWeb3, setPreEventContract } = useOutletContext();
  const [kakaoImage, setKakaoImage] = useState();
  const [kakaoId, setKakaoId] = useState();
  const [kakaoName, setKakaoName] = useState();

  const current_url = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(current_url.search);
    const loginFrom = queryParams.get("login_from");
    localStorage.setItem("loginFrom", loginFrom);

    const fetchUserInfo = async () => {
      if (loginFrom === "K") {
        // Kakao Login
        const userID = queryParams.get("userID");
        const userName = queryParams.get("userName");
        const userImage = queryParams.get("userImage");
        setKakaoName(userName);
        setKakaoId(userID);
        setKakaoImage(userImage);

        if (userID && userName) {
          CreateAddress(userID, userName)
            .then(({ privateKey, address }) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/store_kinfo`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  loginFrom: "K",
                  userID,
                  userName,
                  privateKey,
                  address,
                  userImage,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(privateKey);
                  console.log(address);
                  const account = address;
                  setAccount(account);
                  localStorage.setItem("customerID", data.ID);
                  localStorage.setItem("account", account);
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else if (loginFrom === "M") {
        // Metamask Login
        const account = queryParams.get("account");
        setAccount(account);
        localStorage.setItem("account", account);

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                loginFrom: "M",
                account: account,
              }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (data.ID) {
              localStorage.setItem("customerID", data.ID);
              console.log(
                "LoginPage.jsx/confirmSelection/customerID:",
                data.ID
              );
            }
          } else {
            console.error("[ERR] LoginPage.jsx/confirmSelection : response.ok");
          }
        } catch (error) {
          console.error("[ERR] LoginPage.jsx/confirmSelection: ", error);
        }

        navigate("/");
      }
    };

    fetchUserInfo();

    const web3 = new Web3(window.ethereum);
    setWeb3(web3);
    // console.log("LoginSuccess.jsx/useEffect/web3: ", web3);

    const preEventContract = new web3.eth.Contract(
      PreEventAbi,
      PRE_EVENT_CONTRACT
    );
    setPreEventContract(preEventContract);
    // console.log("LoginSuccess.jsx/useEffect/preEventContract: ", preEventContract);
  }, [current_url]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className=" min-w-screen min-h-screen  md:w-[450px] mt-20 mx-auto z-10 flex justify-start items-center flex-col">
      <p className="text-4xl border-2 px-2 py-2 border-black border-b-4 border-r-4 rounded-md">
        로그인 성공
      </p>
      <ul className="flex flex-col items-center justify-center mt-10 ">
        <img
          src={kakaoImage}
          alt="profileImage"
          className="w-20 rounded-full border-2 shadow-xl"
        />
        <li className="mt-2 text-xl">
          <span className="font-semibold">{kakaoName}</span> 님 환영합니다!
        </li>
      </ul>
    </div>
  );
};

export default LoginSuccess;
