import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <Link to="/force" className="border-2 border-black px-2 rounded-md">
        Force-directed graph
      </Link>
      <Link to="/temporal" className="border-2 border-black px-2 rounded-md">
        Temporal force-directed graph
      </Link>
    </div>
  );
};

export default Main;
