
const DevInfo = ({loginMethod}) => {
    
    return (
        <div className="w-[425px] bg-blue-300 mx-auto bottom-0 sticky h-[25px] z-10 ">
            <ul>
                Login Method: {loginMethod}
            </ul>
        </div>
    );
  };
  
  export default DevInfo;
  