//구매 내역에 대한 목록이름 컴포넌트 수정 필요
const Purchased = () => {
  return (
    <ul className="flex flex-col gap-2 mb-2 border-t-2 border-black py-[2px]">
      <ul className="flex items-center justify-between mt-4">
        <li className="ml-[52px]">{`< 공연 정보 >`}</li>
        <li className="w-1/3 mr-8">{`< 구매 시간 >`}</li>
      </ul>
    </ul>
  );
};

export default Purchased;

//구매시 구매목록에 출력
//민팅했을시에 환불불가.
