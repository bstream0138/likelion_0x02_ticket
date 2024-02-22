import { useNavigate } from "react-router-dom";

const DevInfo = ({ loginFrom, dbConnection }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 opacity-75 flex flex-row justify-between ">
      __{loginFrom ? loginFrom : "X"}
    </div>
  );
};

export default DevInfo;
