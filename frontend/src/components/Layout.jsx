import { Outlet, useLocation } from "react-router-dom";
import MenuBar from "./MenuBar";
import { useEffect, useState } from "react";

const Layout = () => {
  const loginMethod = localStorage.getItem("loginMethod");
  const [account, setAccount] = useState("");
  const [userInfo, setUserInfo] = useState({
    userID: "",
    userName: "",
    userImage: "",
  });

  const current_url = useLocation();

  useEffect(() => {
    if (loginMethod === "K") {
      // Kakao Login
      const queryParams = new URLSearchParams(current_url.search);
      if (queryParams.get("userID")) {
        // backend에서 redirect된 상황이므로 값을 localStorage에 저장
        localStorage.setItem("userID", queryParams.get("userID"));
        localStorage.setItem("userName", queryParams.get("userName"));
        localStorage.setItem("userImage", queryParams.get("userImage"));
      }

      //localStorage에서 userID와 userName 가져오기
      const userID = localStorage.getItem("userID");
      const userName = localStorage.getItem("userName");
      const userImage = localStorage.getItem("userImage");
      console.log("userID: ", userID);
      console.log("userName: ", userName);
      console.log("userImage: ", userImage);
      setUserInfo({ userID, userName, userImage });
    } else if (loginMethod === "M") {
      // Metamask Login
      const account = localStorage.getItem("account");
      setAccount(account);
    }
  }, [current_url]);

  return (
    <div>
      <Outlet context={{ account, setAccount, userInfo }} />
      <MenuBar />
    </div>
  );
};

export default Layout;
