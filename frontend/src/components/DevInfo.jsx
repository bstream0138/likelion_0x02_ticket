import { useNavigate } from "react-router-dom";

const DevInfo = ({loginFrom, dbConnection}) => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="fixed top-0 left-0 w-full bg-blue-100 opacity-75 flex flex-row justify-between items-center space-x-2">
            <div className="text-sm"> (dev) [user]: {loginFrom? loginFrom: 'X'} [db]: {dbConnection? 'L': 'X'} </div>
            <button className="text-sm bg-blue-500 py-2 px-4" onClick={handleLogin}>BTN</button>
        </div>
        
    );
  };
  
  export default DevInfo;
  