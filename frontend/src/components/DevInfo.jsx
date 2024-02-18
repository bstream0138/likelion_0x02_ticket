const DevInfo = ({ loginMethod }) => {
  return (
    <div className="w-[425px] left-1/4 -translate-x-1/ bottom-0 fixed top-0 h-[25px] z-10 ">
      <ul>Login Method: {loginMethod}</ul>
    </div>
  );
};

export default DevInfo;
