import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

import Account from "../components/Account";

const My = () => {
  const { account } = useOutletContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    //localStorage에서 item 삭제
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!account) {
      alert("You need to login");
      navigate("/login");
    }
  }, [account]);

  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto px-4">
      <ul className="">
        <button
          className="mt-4 bg-black text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </ul>
      <ul className="mt-2">
        <Account />
      </ul>
      <div className="mt-2">Purchased</div>
    </div>
  );
};

export default My;
