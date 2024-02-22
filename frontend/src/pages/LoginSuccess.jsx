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
  const {
    account,
    setAccount,
    web3,
    setWeb3,
    preEventContract,
    setPreEventContract,
  } = useOutletContext();

  const current_url = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(current_url.search);
    const loginFrom = queryParams.get("login_from");
    localStorage.setItem("loginFrom", loginFrom);

    const fetchUserInfo = async () => {
      if (loginFrom === "K") {
        // Kakao Login
        const userID = queryParams.get("userID");
        const userName = queryParams.get("userName");

        if (userID && userName) {
          CreateAddress(userID, userName)
            .then(({ privateKey, address }) => {
              fetch("http://localhost:3001/store_kinfo", {
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
          const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              loginFrom: "M",
              account: account,
            }),
          });
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

  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto z-10 flex justify-center items-center">
      <p className="text-2xl">로그인 성공</p>
    </div>
  );
};

export default LoginSuccess;
