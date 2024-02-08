import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto z-10">
      <div className="flex items-center justify-center text-2xl bottom-0 sticky font-bold h-10 mx-3 pt-2">
        0X02
      </div>
      <div className=" h-[300px] mx-3 flex items-center">
        <Link to="/ticketing" className="h-[280px]  mx-2 w-[400px] ">
          <img
            className="w-[400px] h-[280px] object-cover"
            src="../golden_hour.jpg"
            alt="a"
          />
        </Link>
      </div>
      <ul className="mx-5 mt-3">
        <li>hi</li>
        <li>hello</li>
        <li>YYYY.MM.DD</li>
      </ul>
      <ul className="grid grid-cols-4 items-center mt-3 mx-5">
        <li>all</li>
        <li>ballad</li>
        <li>rock</li>
        <li>hiphop</li>
        <li>jazz</li>
        <li>dinner-show</li>
        <li>folk</li>
        <li>perform-in-korea</li>
        <li>festival</li>
        <li>fan</li>
        <li>indie</li>
        <li>talk/speach</li>
      </ul>
      <div className="mx-5 mt-3 text-3xl">(NEW)</div>
    </div>
  );
};

export default Home;
