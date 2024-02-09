import TicketBanner from "../components/TicketBanner";

const Home = () => {
  return (
    <div className="w-[425px] min-h-screen bg-blue-200 mx-auto z-10">
      <div className="flex items-center justify-center text-2xl font-bold h-10 mx-3 pt-2">
        0X02
      </div>
      <div className="w-[350px] h-[280px] ml-[36.5px] rounded-md mt-6">
        <TicketBanner />
      </div>
      <ul className="grid grid-cols-4 items-center mt-24 mx-10 gap-2">
        <li>all</li>
        <li>ballad</li>
        <li>rock</li>
        <li>hiphop</li>
        <li>jazz</li>
        <li>folk</li>
        <li>festival</li>
        <li>indie</li>
      </ul>
      <div className="mx-10 mt-5 text-3xl">(NEW)</div>
    </div>
  );
};

export default Home;
