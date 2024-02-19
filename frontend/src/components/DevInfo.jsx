import { useNavigate } from "react-router-dom";

const DevInfo = ({ loginFrom, dbConnection }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 opacity-75 flex flex-row justify-between ">
      <div className="text-sm">
        {" "}
        (u){loginFrom ? loginFrom : "X"}(d){dbConnection ? "L" : "X"}{" "}
      </div>
    </div>
  );
};

export default DevInfo;
